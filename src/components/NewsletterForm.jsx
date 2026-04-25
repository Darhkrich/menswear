'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Placeholder: you can integrate with an API like Mailchimp later
      console.log('Subscribed:', email);
      setSubmitted(true);
      setEmail('');
    }
  };

  if (submitted) {
    return (
      <div className="text-white text-center">
        <p className="text-2xl font-serif font-bold mb-2">Thank You!</p>
        <p className="text-gray-300">You’re now on the list.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-amber-700"
      />
      <button
        type="submit"
        className="bg-amber-700 hover:bg-amber-600 text-white px-8 py-3 text-sm uppercase tracking-widest font-bold transition"
      >
        Subscribe
      </button>
    </form>
  );
}