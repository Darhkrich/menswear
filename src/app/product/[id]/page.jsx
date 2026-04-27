'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Check, Truck, RefreshCw } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [addedMessage, setAddedMessage] = useState(false);

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-serif font-bold">Product not found</h1>
        <Link href="/product" className="text-amber-700 underline mt-4 inline-block">
          Back to shop
        </Link>
      </div>
    );
  }

  const inStock = product.stock > 0;
  const lowStock = product.stock <= 5 && product.stock > 0;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addToCart(product, selectedSize, selectedColor);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Link href="/product" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black mb-8">
          <ArrowLeft size={16} /> Back to shop
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image Gallery (simulated with single image) */}
          <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {!inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-lg font-bold bg-red-600 px-4 py-2 rounded">Sold Out</span>
              </div>
            )}
            {lowStock && (
              <span className="absolute top-4 left-4 bg-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">{product.name}</h1>
            <p className="text-xl text-gray-900 mt-4">GH₵{product.price}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= Math.round(product.rating) ? 'fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-gray-600 mt-6 leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-sm border rounded-md transition ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-700 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-sm border rounded-md transition ${
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-700 hover:border-black'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="mt-8 space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={!inStock || !selectedSize || !selectedColor}
                className={`w-full py-4 text-sm uppercase tracking-widest font-bold transition ${
                  inStock
                    ? 'bg-black text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                } disabled:cursor-not-allowed`}
              >
                {!inStock ? 'Sold Out' : 'Add to Bag'}
              </button>

              {addedMessage && (
                <div className="flex items-center gap-2 text-green-700 text-sm">
                  <Check size={16} /> Added to your shopping bag!
                </div>
              )}

              {!inStock && (
                <p className="text-sm text-red-600">This item is currently out of stock.</p>
              )}
            </div>

            {/* Extra info */}
            <div className="border-t mt-8 pt-6 grid grid-cols-1 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Truck size={18} />
                <span>Free shipping on orders over GH₵200</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw size={18} />
                <span>30‑day returns, no questions asked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}