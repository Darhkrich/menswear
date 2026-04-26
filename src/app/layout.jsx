import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/cartDrawer';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata = {
  title: "GENTLEMAN'S  Wear website| Modern Menswear",
  description: 'Premium boutique fashion for men.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="pt-20 min-h-screen">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-6 text-center text-gray-400 text-sm">
              © 2024 Gentleman's Boutique. All rights reserved.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}