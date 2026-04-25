"use client";
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('boutique-cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }, []);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('boutique-cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Add a product to the cart; respects stock limit
  const addToCart = useCallback((product, size, color) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === size && item.color === color
      );

      if (existingIndex > -1) {
        // Increase quantity, but don't exceed stock
        const currentQty = prev[existingIndex].qty;
        const maxQty = product.stock || 999;
        if (currentQty >= maxQty) return prev; // already at max
        const newCart = [...prev];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          qty: currentQty + 1,
        };
        return newCart;
      }

      // New item, ensure we don't exceed stock (though first add qty = 1 is safe)
      const stockAvailable = product.stock || 999;
      if (stockAvailable < 1) return prev;
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          image: product.image,
          size,
          color,
          qty: 1,
          stock: product.stock, // store for reference
        },
      ];
    });

  }, []);

  // Remove item completely
  const removeFromCart = useCallback((id, size, color) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size && item.color === color))
    );
  }, []);

  // Update quantity of an item (delta: 1 to increase, -1 to decrease)
  // Decrease below 1 removes the item; increase respects stock
  const updateQuantity = useCallback((id, size, color, delta) => {
    setCart((prev) => {
      const index = prev.findIndex(
        (item) => item.id === id && item.size === size && item.color === color
      );
      if (index === -1) return prev;

      const item = prev[index];
      const newQty = item.qty + delta;

      // If newQty would be 0 or less, remove the item
      if (newQty <= 0) {
        return prev.filter(
          (item) => !(item.id === id && item.size === size && item.color === color)
        );
      }

      // Respect stock limit
      const maxQty = item.stock || 999;
      if (newQty > maxQty) return prev;

      const newCart = [...prev];
      newCart[index] = { ...item, qty: newQty };
      return newCart;
    });
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Toggle cart drawer open/close
  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  // Derived values
  const cartTotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};