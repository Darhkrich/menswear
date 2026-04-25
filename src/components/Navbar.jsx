"use client";
import Link from 'next/link';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/product' },
    { name: 'About', href: '/about' },
    { name: 'Editorial', href: '/editorial' },
  ];

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-serif font-bold tracking-tighter text-gray-900">
            SHOPNAME<span className="text-amber-700">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-black transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            <Link href="/account" className="hidden md:block text-gray-600 hover:text-black">
              <User size={22} />
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-gray-600 hover:text-black"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-600 hover:text-black"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-3 text-base font-medium text-gray-800 hover:text-amber-700"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t pt-3 mt-3">
              <Link
                href="/account"
                className="flex items-center gap-3 py-3 text-base font-medium text-gray-800 hover:text-amber-700"
                onClick={() => setIsOpen(false)}
              >
                <User size={20} /> My Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}