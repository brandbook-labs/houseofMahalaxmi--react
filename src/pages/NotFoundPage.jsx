import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, ShoppingBag } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] bg-gray-50 flex flex-col items-center justify-center px-4 md:px-6 font-sans text-center">
      
      {/* Icon ଡିଜାଇନ୍ */}
      <div className="w-24 h-24 bg-[#800020]/10 text-[#800020] rounded-full flex items-center justify-center mb-8 shadow-sm">
        <Search size={40} />
      </div>

      {/* 404 Heading */}
      <h1 className="text-6xl md:text-8xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-800 mb-4">
        Page Not Found
      </h2>

      {/* Message */}
      <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed">
        Oops! It seems we can't find the page you're looking for. It might have been moved, deleted, or perhaps the URL is incorrect.
      </p>

      {/* ଆକ୍ସନ୍ ବଟନ୍ ଗୁଡିକ */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
        <Link
          to="/"
          className="flex-1 bg-[#800020] text-white font-bold uppercase py-4 rounded-md flex items-center justify-center gap-2 hover:bg-[#600018] transition-colors shadow-md shadow-[#800020]/20"
        >
          <Home size={18} />
          Back to Home
        </Link>

        <Link
          // [NEW] ଲିଙ୍କ୍ କୁ ବଦଳାଇ '/#shop-department' କରନ୍ତୁ
          to="/#shop-department"
          className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold uppercase py-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ShoppingBag size={18} />
          Continue Shopping
        </Link>
      </div>

    </div>
  );
}