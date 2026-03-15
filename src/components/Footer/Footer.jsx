import React, { useEffect, useState } from 'react';
import { ArrowUp, Instagram, Facebook, Twitter, ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [time, setTime] = useState("");

  // Live Time (India)
  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' 
      }));
    };
    const t = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(t);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // E-commerce marquee messages
  const marqueeMessages = [
    "FREE SHIPPING ACROSS INDIA",
    "100% AUTHENTIC HANDLOOM",
    "NEW FESTIVE COLLECTION",
    "SECURE CHECKOUT",
    "EASY RETURNS"
  ];

  return (
    <footer className="bg-white text-gray-900 border-t border-gray-200 font-sans overflow-hidden">
      
      {/* === 1. MARQUEE BORDER === */}
      <div className="relative border-b border-gray-200 py-3 overflow-hidden bg-gray-50">
        <div className="flex whitespace-nowrap opacity-80" style={{ animation: 'marquee 30s linear infinite' }}>
           {/* Render multiple times for infinite scroll effect */}
           {[...Array(4)].map((_, i) => (
             <div key={i} className="flex items-center">
                {marqueeMessages.map((msg, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="text-xs font-medium tracking-widest uppercase text-gray-600 px-6">
                      {msg}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#800020]/40"></span>
                  </div>
                ))}
             </div>
           ))}
        </div>
      </div>

      {/* === 2. MAIN GRID === */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-2 md:grid-cols-12 gap-x-4 gap-y-10 md:gap-8">
         
         {/* Branding - Spans wider on larger screens */}
         <div className="col-span-2 md:col-span-4 flex flex-col justify-start">
            <a href="/" className="flex flex-col justify-center mb-6 w-fit">
               <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-gray-500 font-medium leading-none mb-1 ml-0.5">
                 House of
               </span>
               <span className="text-2xl sm:text-3xl font-serif font-bold tracking-wide text-gray-900 leading-none">
                 MAHALAXMI<span className="text-[#800020]">.</span>
               </span>
            </a>
            <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
               Discover timeless elegance woven into every thread. Premium silk sarees, lehengas, and ethnic fashion for the modern woman.
            </p>
         </div>

         {/* Shop Links */}
         <div className="flex flex-col gap-4 col-span-1 md:col-span-2 md:col-start-6">
            <h4 className="font-serif text-lg font-bold text-gray-900">Shop</h4>
            <Link href="/collections/festive-wears" className="text-sm text-gray-600 hover:text-[#800020] transition-colors w-fit">Festive Wear</Link>
            <Link href="/collections/wedding-collections" className="text-sm text-gray-600 hover:text-[#800020] transition-colors w-fit">Wedding Collection</Link>
            <Link href="/collections/everyday-casuals" className="text-sm text-gray-600 hover:text-[#800020] transition-colors w-fit">Everyday Casuals</Link>
            <Link to="/collections/accessories" className="text-sm text-gray-600 hover:text-[#800020] transition-colors w-fit">Accessories</Link>
         </div>

         {/* Support Links */}
         <div className="flex flex-col gap-4 col-span-1 md:col-span-2">
            <h4 className="font-serif text-lg font-bold text-gray-900">Support</h4>
            <a href="/contact-us" className="text-sm text-gray-600 hover:text-[#800020] transition-colors w-fit">Contact Us</a>
            <a href="/faq" className="text-sm text-gray-600 hover:text-[#800020] transition-colors w-fit">FAQs</a>
            <a href="/shipping" className="text-sm text-gray-600 hover:text-[#800020] transition-colors w-fit">Shipping Policy</a>
            <a href="/returns" className="text-sm text-gray-600 hover:text-[#800020] transition-colors w-fit">Returns & Exchanges</a>
         </div>

         {/* Contact & Socials */}
         <div className="flex flex-col gap-4 col-span-2 md:col-span-3">
            <h4 className="font-serif text-lg font-bold text-gray-900">Get in Touch</h4>
            
            <a href="mailto:support@houseofmahalaxmi.com" className="text-sm text-gray-600 hover:text-[#800020] transition-colors w-fit">
               support@houseofmahalaxmi.com
            </a>
            <a href="tel:+919876543210" className="text-sm text-gray-600 hover:text-[#800020] transition-colors w-fit mb-2">
               +91 98765 43210
            </a>

            {/* Social Icons */}
            <div className="flex gap-4 mt-2">
               <a href="#" className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#800020] hover:text-white hover:border-[#800020] transition-all">
                  <Instagram size={18} />
               </a>
               <a href="#" className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#800020] hover:text-white hover:border-[#800020] transition-all">
                  <Facebook size={18} />
               </a>
               <a href="#" className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#800020] hover:text-white hover:border-[#800020] transition-all">
                  <Twitter size={18} />
               </a>
            </div>
         </div>

      </div>

      {/* === 3. BOTTOM BAR === */}
      <div className="border-t border-gray-200 bg-gray-50">
         <div className="max-w-7xl mx-auto px-6 py-6 md:py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Live Time / Location */}
            <div className="flex items-center gap-2 text-gray-500">
               <MapPin size={14} className="text-[#800020]" />
               <span className="text-xs font-medium tracking-wide">
                 India | {time}
               </span>
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-500 text-center">
               &copy; {new Date().getFullYear()} House of Mahalaxmi. All rights reserved.
            </div>

            {/* Back to Top */}
            <button 
               onClick={scrollToTop}
               className="flex items-center gap-1.5 text-xs font-bold text-gray-600 uppercase tracking-widest hover:text-[#800020] transition-colors group"
            >
               Top <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>

         </div>
      </div>

      {/* Inline CSS for Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
}