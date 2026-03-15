import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MahalaxmiHero = () => {
  return (
    <section 
      className="relative h-screen min-h-[600px] w-full bg-cover bg-center font-sans flex items-center justify-center" 
      style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/hindu-goddess-durga-generated-by-ai_674037-445.jpg?uid=R169025813&ga=GA1.1.744688816.1759506239&semt=ais_hybrid&w=740&q=80')" }}
    >
      {/* --- BACKGROUND OVERLAY: DARK RED GRADIENT --- */}
      {/* Blends from dark at the top (for navbar readability) into your maroon brand color */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#37000E]/60 to-[#800020]/90 z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center mt-12 md:mt-16">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
          </span>
          Auspicious Festive Collection
        </div>
        
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-6 max-w-4xl drop-shadow-md">
          Timeless Elegance, <br className="hidden sm:block" />
          <span className="text-[#D4AF37]">Woven for You.</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl leading-relaxed drop-shadow">
          Discover House of Mahalaxmi's exclusive range of handcrafted silk sarees, bridal lehengas, and premium ethnic wear designed for every celebration.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link 
            to="/#shop-department" 
            className="flex items-center justify-center gap-2 bg-[#D4AF37] text-gray-900 px-8 py-4 rounded-md font-bold uppercase tracking-wider hover:bg-white transition-colors w-full sm:w-auto shadow-xl"
          >
            <ShoppingBag size={20} />
            Shop Now
          </Link>
          <Link 
            to="/#shop-collection"
            className="flex items-center justify-center gap-2 bg-transparent text-white border-2 border-white/70 px-8 py-4 rounded-md font-bold uppercase tracking-wider hover:border-white hover:bg-white/10 transition-colors w-full sm:w-auto backdrop-blur-sm"
          >
            View Collections
            <ArrowRight size={20} />
          </Link>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-16 pt-8 border-t border-white/20 flex flex-wrap items-center justify-center gap-8 md:gap-16 w-full max-w-2xl">
          <div className="text-center">
            <p className="text-3xl font-serif font-bold text-[#D4AF37]">10k+</p>
            <p className="text-xs text-gray-200 uppercase tracking-widest mt-1">Happy Customers</p>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/20"></div>
          <div className="text-center">
            <p className="text-3xl font-serif font-bold text-[#D4AF37]">100%</p>
            <p className="text-xs text-gray-200 uppercase tracking-widest mt-1">Authentic Silk</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MahalaxmiHero;