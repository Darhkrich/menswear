'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { SlidersHorizontal, X } from 'lucide-react';

const allCategories = ['All', 'Shirts', 'Shoes', 'Knitwear', 'Outerwear', 'Accessories'];

// Extract unique sizes and colors from the dataset
const allSizes = [...new Set(products.flatMap((p) => p.sizes || []))].sort();
const allColors = [...new Set(products.flatMap((p) => p.colors || []))].sort();

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  // ----- Filter state -----
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 600 }); // max from data
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-asc', 'price-desc', 'rating', 'name'
  const [showFilters, setShowFilters] = useState(false); // mobile filter toggle

  // ----- Filtering logic -----
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Price range
    result = result.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );

    // Sizes (product has at least one selected size)
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes?.some((size) => selectedSizes.includes(size))
      );
    }

    // Colors (product has at least one selected color)
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors?.some((color) => selectedColors.includes(color))
      );
    }

    // Rating
    result = result.filter((p) => (p.rating || 0) >= minRating);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [
    selectedCategory,
    searchQuery,
    priceRange,
    selectedSizes,
    selectedColors,
    minRating,
    sortBy,
  ]);

  // ----- Toggle array helpers -----
  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceRange({ min: 0, max: 600 });
    setSelectedSizes([]);
    setSelectedColors([]);
    setMinRating(0);
    setSortBy('default');
  };

  // ----- Active filter count (for mobile toggle badge) -----
  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (minRating > 0 ? 1 : 0) +
    (priceRange.min > 0 || priceRange.max < 600 ? 1 : 0);

  // ---------- UI ----------
  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-gray-900">Shop</h1>
          <p className="text-gray-500 mt-2">Refine your perfect look</p>
        </div>

        {/* Top bar: Search + Category Pills + Mobile Filter Toggle */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          {/* Category Pills (scrollable if many) */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-sm font-medium rounded-full border transition ${
                  selectedCategory === cat
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search + Filter Button */}
          <div className="flex items-center gap-3 w-full md:w-auto order-1 md:order-2">
            <div className="relative flex-1 md:w-64">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-700"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden relative p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <SlidersHorizontal size={18} />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar (Desktop) / Collapsible (Mobile) */}
          <aside
            className={`${
              showFilters ? 'block' : 'hidden'
            } md:block w-full md:w-64 shrink-0`}
          >
            <div className="bg-gray-50 rounded-lg p-5 space-y-6 sticky top-28">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-amber-700 hover:underline"
                >
                  Clear all
                </button>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-sm font-medium mb-3">Price</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        min: Number(e.target.value) || 0,
                      }))
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                  />
                  <span className="text-gray-400">–</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: Number(e.target.value) || 600,
                      }))
                    }
                    className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm"
                  />
                </div>
              </div>

              {/* Size */}
              {allSizes.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-3">Size</h4>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1 text-xs border rounded-full transition ${
                          selectedSizes.includes(size)
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color */}
              {allColors.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-3">Color</h4>
                  <div className="flex flex-wrap gap-2">
                    {allColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => toggleColor(color)}
                        className={`px-3 py-1 text-xs border rounded-full transition ${
                          selectedColors.includes(color)
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Rating */}
              <div>
                <h4 className="text-sm font-medium mb-3">Minimum Rating</h4>
                <div className="flex items-center gap-2">
                  {[4, 3, 2, 1].map((star) => (
                    <button
                      key={star}
                      onClick={() => setMinRating(star === minRating ? 0 : star)}
                      className={`flex items-center gap-1 px-3 py-1 text-xs border rounded-full transition ${
                        minRating >= star
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-300'
                      }`}
                    >
                      {star}+ ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="text-sm font-medium mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                >
                  <option value="default">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 mb-6">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-20">
                No products match your filters. Try adjusting or{' '}
                <button onClick={clearAllFilters} className="text-amber-700 underline">
                  clear all filters
                </button>
                .
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}