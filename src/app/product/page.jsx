import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage({ searchParams }) {
  const category = searchParams.category || 'All';
  const isSale = searchParams.sale === 'true';

  const filteredProducts = products.filter((p) => {
    if (isSale) return p.stock <= 5; // "Sale" logic: low stock items
    if (category !== 'All') return p.category === category;
    return true;
  });

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900">
            {isSale ? 'Sale' : category === 'All' ? 'All Products' : category}
          </h1>
          <p className="text-gray-500 mt-2">
            {filteredProducts.length} item{filteredProducts.length !== 1 && 's'} found
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-20">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
}