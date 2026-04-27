"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const router = useRouter();
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();

  if (!isCartOpen) return null;

  const shippingThreshold = 200;
  const freeShippingLeft = shippingThreshold - cartTotal;

  const handleCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slideIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-serif font-bold flex items-center gap-2">
            <ShoppingBag size={20} /> Shopping Bag ({cartCount})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <ShoppingBag size={64} className="mb-4 text-gray-300" />
              <p className="text-lg font-medium">Your bag is empty</p>
              <p className="text-sm mt-1">Add some items to get started.</p>
              <Link
                href="/product"
                className="mt-6 inline-block bg-black text-white px-6 py-2 text-sm uppercase tracking-wider font-semibold hover:bg-gray-800 transition"
                onClick={() => setIsCartOpen(false)}
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex gap-4 bg-gray-50 p-3 rounded-md"
              >
                <div className="w-20 h-24 bg-gray-200 relative rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                  {item.stock !== undefined && item.stock <= 5 && (
                    <span className="absolute top-0 left-0 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br">
                      Low
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{item.name}</h3>
                  {item.color && item.color !== 'Default' && (
                    <p className="text-xs text-gray-500 mt-0.5 capitalize">
                      Color: {item.color}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">Size: {item.size}</p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, -1)}
                        disabled={item.qty <= 1}
                        className="p-1 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 text-sm font-medium min-w-[30px] text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.color, 1)}
                        disabled={item.qty >= (item.stock || 999)}
                        className="p-1 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold block">GH₵{(item.price * item.qty).toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="text-xs text-red-500 hover:text-red-700 underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t bg-white space-y-4">
            {freeShippingLeft > 0 ? (
              <div className="bg-gray-50 p-3 rounded text-sm">
                <p className="text-gray-600">
                  Spend <span className="font-semibold text-black">GH₵{freeShippingLeft.toFixed(2)}</span> more for free shipping!
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-black h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((cartTotal / shippingThreshold) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 p-3 rounded text-sm text-green-800 font-medium">
                🎉 You qualify for free shipping!
              </div>
            )}
            <div className="flex justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span>GH₵{cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition disabled:opacity-50"
            >
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full border border-gray-300 text-gray-700 py-3 text-sm uppercase tracking-wide font-medium hover:bg-gray-50 transition"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}