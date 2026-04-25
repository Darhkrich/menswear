'use client';
import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight } from 'lucide-react';

// Inner component that uses useSearchParams
function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderNumber = searchParams.get('order') || 'N/A';

  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('lastOrder');
    if (saved) {
      setOrderDetails(JSON.parse(saved));
    } else {
      // If accessed directly without an order, redirect to home
      router.replace('/');
    }
  }, [router]);

  if (!orderDetails) {
    return (
      <div className="pt-32 text-center text-gray-500">Loading order details...</div>
    );
  }

  const { items, total } = orderDetails;

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <CheckCircle size={64} className="mx-auto text-green-600 mb-6" />
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-2">
          Your order <span className="font-semibold text-black">{orderNumber}</span> has been placed.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          A confirmation email will be sent to your email address shortly.
        </p>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-lg p-6 text-left mb-8">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden relative flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium truncate">{item.name}</p>
                  <p className="text-gray-500 text-xs">Size: {item.size} | Color: {item.color} | Qty: {item.qty}</p>
                  <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition"
        >
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

// Wrapper with Suspense boundary
export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 text-center text-gray-500">Loading order details...</div>
    }>
      <SuccessContent />
    </Suspense>
  );
}