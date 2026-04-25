"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

// Simple inline star rating display
function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-1 mt-1">
      <div className="flex text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-3 h-3 ${star <= Math.round(rating) ? 'fill-current' : 'fill-transparent'}`}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
      <span className="text-xs text-gray-500">({count})</span>
    </div>
  );
}

// Badge logic
function StockBadge({ stock }) {
  if (stock === 0) {
    return (
      <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-sm">
        Sold Out
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="absolute top-2 left-2 z-10 bg-amber-600 text-white text-xs font-semibold px-2 py-0.5 rounded-sm">
        Low Stock
      </span>
    );
  }
  return null;
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Determine default variant (first size and color)
  const defaultSize = product.sizes?.[0] || 'One Size';
  const defaultColor = product.colors?.[0] || 'Default';

  const handleQuickAdd = (e) => {
    e.preventDefault(); // prevent link navigation when clicking button
    if (product.stock === undefined || product.stock > 0) {
      addToCart(product, defaultSize, defaultColor);
    }
  };

  return (
    <div className="group relative">
      <div className="aspect-[3/4] w-full overflow-hidden rounded-sm bg-gray-200 relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        {/* Stock badge */}
        <StockBadge stock={product.stock} />

        {/* Hover Quick-Add Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleQuickAdd}
            disabled={product.stock === 0}
            className={`w-full py-3 text-sm font-semibold uppercase tracking-wide transition-colors ${
              product.stock === 0
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {product.stock === 0 ? 'Sold Out' : 'Quick Add'}
          </button>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm text-gray-700 font-medium">
            <Link href={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{product.category}</p>
          <StarRating rating={product.rating} count={product.reviews} />
        </div>
        <p className="text-sm font-medium text-gray-900 whitespace-nowrap">
          ${product.price}
        </p>
      </div>
    </div>
  );
}