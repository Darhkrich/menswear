'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CreditCard, Smartphone } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'momo'

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    momoProvider: 'MTN',
    momoPhone: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setSubmitting(true);
    setTimeout(() => {
      const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;
      localStorage.setItem('lastOrder', JSON.stringify({ number: orderNumber, items: cart, total: cartTotal }));
      clearCart();
      router.push(`/success?order=${orderNumber}`);
    }, 1500);
  };

  const shippingCost = cartTotal >= 200 ? 0 : 15;
  const orderTotal = cartTotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Your bag is empty</h1>
        <Link href="/products" className="text-amber-700 underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold mb-12">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Order Summary – always first in mobile (order-1) */}
          <div className="order-1">
            <h2 className="text-xl font-semibold mb-6">Order Summary ({cartCount} items)</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 border-b pb-4">
                  <div className="w-16 h-20 bg-gray-100 rounded overflow-hidden relative flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500">Size: {item.size} | Color: {item.color}</p>
                    <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                    <p className="text-sm font-semibold">GH₵{(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>GH₵{cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shippingCost === 0 ? 'Free' : `GH₵${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total</span>
                <span>GH₵{orderTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Form – order-2 */}
          <form onSubmit={handlePlaceOrder} className="order-2">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input type="text" name="firstName" required value={form.firstName} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input type="text" name="lastName" required value={form.lastName} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input type="text" name="address" required value={form.address} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input type="text" name="city" required value={form.city} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">ZIP Code</label>
                  <input type="text" name="zip" required value={form.zip} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-3 text-sm" />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition ${
                    paymentMethod === 'card' ? 'border-black bg-gray-50' : 'border-gray-200'
                  }`}
                >
                  <CreditCard size={20} />
                  <span className="font-medium">Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('momo')}
                  className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition ${
                    paymentMethod === 'momo' ? 'border-black bg-gray-50' : 'border-gray-200'
                  }`}
                >
                  <Smartphone size={20} />
                  <span className="font-medium">Mobile Money</span>
                </button>
              </div>

              {/* Card Fields */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-md">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      placeholder="4242 4242 4242 4242"
                      value={form.cardNumber}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-3 text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        name="cardExpiry"
                        required
                        placeholder="04/28"
                        value={form.cardExpiry}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-3 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVC</label>
                      <input
                        type="text"
                        name="cardCvc"
                        required
                        placeholder="123"
                        value={form.cardCvc}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-3 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Money Fields */}
              {paymentMethod === 'momo' && (
                <div className="space-y-4 bg-gray-50 p-4 rounded-md">
                  <div>
                    <label className="block text-sm font-medium mb-1">Provider</label>
                    <select
                      name="momoProvider"
                      value={form.momoProvider}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-3 text-sm bg-white"
                    >
                      <option value="MTN">MTN Mobile Money</option>
                      <option value="Airtel">Airtel Money</option>
                      <option value="Vodafone">Vodafone Cash</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      name="momoPhone"
                      required
                      placeholder="e.g. 233 24 123 4567"
                      value={form.momoPhone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-3 text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-black text-white py-4 mt-6 text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition disabled:opacity-70"
            >
              {submitting ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}