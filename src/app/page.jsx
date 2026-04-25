import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Truck, RefreshCw } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import NewsletterForm from '@/components/NewsletterForm';
import { products } from '@/data/products';

// Handpicked featured products (IDs from the enriched data)
const featuredIds = [1, 2, 3, 4, 7, 9, 14, 17];
const featuredProducts = products.filter((p) => featuredIds.includes(p.id));

// Category data for browsing tiles
const categories = [
  {
    name: 'Shirts',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600',
    href: '/products?category=Shirts',
  },
  {
    name: 'Shoes',
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&q=80&w=600',
    href: '/products?category=Shoes',
  },
  {
    name: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600',
    href: '/products?category=Knitwear',
  },
  {
    name: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600',
    href: '/products?category=Outerwear',
  },
  {
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1589756823695-278d9237dac6?auto=format&fit=crop&q=80&w=600',
    href: '/products?category=Accessories',
  },
];

const testimonials = [
  {
    text: "Impeccable quality and timeless style. My go‑to for all formal and smart‑casual needs.",
    name: "James D.",
    role: "Verified Buyer",
  },
  {
    text: "The cashmere sweater I ordered exceeded expectations. Luxurious feel and perfect fit.",
    name: "Marcus L.",
    role: "Verified Buyer",
  },
  {
    text: "Fast delivery and the leather loafers are just as pictured. Highly recommended.",
    name: "Oliver T.",
    role: "Verified Buyer",
  },
];

const brandFeatures = [
  {
    icon: <Truck size={24} />,
    title: 'Free Shipping',
    desc: 'On all orders over $200',
  },
  {
    icon: <Shield size={24} />,
    title: 'Secure Checkout',
    desc: 'SSL encrypted & PCI compliant',
  },
  {
    icon: <RefreshCw size={24} />,
    title: 'Easy Returns',
    desc: '30-day no‑questions policy',
  },
];

export default function Home() {
  return (
    <div>
      {/* ===== Hero Section ===== */}
      <section className="relative h-[85vh] bg-gray-900 flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=2000"
          alt="Hero Background"
          fill
          sizes="100vw"
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <span className="text-white/80 uppercase tracking-[0.2em] text-sm font-medium mb-4 block animate-fade-in-up">
            Spring / Summer 2024
          </span>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-bold mb-8 leading-tight animate-fade-in-up delay-100">
            Define Your <br /> Signature Style
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/product"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-gray-100 transition animate-fade-in-up delay-200"
            >
              Shop Collection <ArrowRight size={18} />
            </Link>
            <Link
              href="#categories"
              className="inline-flex items-center gap-2 bg-transparent border border-white text-white px-8 py-4 text-sm uppercase tracking-widest font-bold hover:bg-white/10 transition animate-fade-in-up delay-200"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Brand Features Bar ===== */}
      <section className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {brandFeatures.map((f, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-amber-500">{f.icon}</span>
              <h4 className="text-sm font-semibold uppercase tracking-wide">{f.title}</h4>
              <p className="text-xs text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Category Tiles ===== */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900">Shop by Category</h2>
          <p className="mt-2 text-gray-500">Discover the perfect piece for every occasion.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative h-64 overflow-hidden rounded-sm bg-gray-200"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-6">
                <h3 className="text-xl font-serif font-bold text-white">{cat.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== Featured Collection ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gray-50 rounded-t-3xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Curated Essentials</h2>
            <p className="mt-2 text-gray-500">Handpicked items for the modern gentleman.</p>
          </div>
          <Link
            href="/product"
            className="hidden md:flex items-center text-sm font-medium text-amber-700 hover:text-amber-800"
          >
            View all products <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ===== Editorial / Brand Story ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-gray-200">
            <Image
              src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=800"
              alt="Craftsmanship"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-amber-700 uppercase tracking-widest text-sm font-semibold">
              Our Philosophy
            </span>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mt-4 mb-6">
              Crafted for the Journey
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Gentleman’s was founded on the belief that style is personal and enduring. We source
              the finest materials—from Italian suede to Scottish cashmere—and work with artisans
              who share our obsession with detail. Every stitch, seam, and silhouette is considered,
              resulting in pieces that feel as good as they look, season after season.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border-b-2 border-amber-700 text-amber-700 font-medium pb-1 hover:text-amber-800 hover:border-amber-800 transition"
            >
              Read our story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded shadow-sm">
                <p className="text-gray-600 italic leading-relaxed mb-4">“{t.text}”</p>
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Newsletter ===== */}
      <section className="bg-black text-white py-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Join the Club</h2>
          <p className="text-gray-300 mb-8">
            Subscribe for exclusive early access to new arrivals, curated edits, and members‑only offers.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}