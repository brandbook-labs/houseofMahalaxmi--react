import React, { useState, useRef } from 'react';
import { ShoppingCart, Heart, Star, Eye, ArrowRight, Camera, Palette, Globe, Printer, Layers } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const products = [
  {
    id: 1,
    name: 'Social Media Monthly - Heavy',
    category: 'Graphics',
    type: 'MONTHLY',
    price: 89000,
    oldPrice: 120000,
    rating: 5.0,
    reviews: 12,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799312c95d?w=800&q=80', 
    isOnSale: true,
  },
  {
    id: 2,
    name: 'Marriage Photography',
    category: 'Photography',
    type: 'EVENT',
    price: 30000,
    oldPrice: 45000,
    rating: 4.9,
    reviews: 48,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    isOnSale: true,
  },
  {
    id: 3,
    name: 'Dukan/Store Website',
    category: 'Website',
    type: 'DEV',
    price: 1000,
    oldPrice: 5000,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    isNew: true,
    isOnSale: true,
  },
  {
    id: 4,
    name: 'School/Business ID Cards',
    category: 'Print',
    type: 'PER UNIT',
    price: 15,
    rating: 4.8,
    reviews: 320,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80',
  },
  {
    id: 5,
    name: 'Store Product Shoot',
    category: 'Photography',
    type: 'PER PROD',
    price: 499,
    oldPrice: 1000,
    rating: 4.8,
    reviews: 24,
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80',
    isOnSale: true,
  },
  {
    id: 6,
    name: 'Social Media - Medium',
    category: 'Graphics',
    type: 'MONTHLY',
    price: 19999,
    oldPrice: 25000,
    rating: 4.6,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    isOnSale: true,
  },
  {
    id: 7,
    name: 'School/College Website',
    category: 'Website',
    type: 'DEV',
    price: 5000,
    oldPrice: 10000,
    rating: 5.0,
    reviews: 9,
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    isOnSale: true,
  },
  {
    id: 8,
    name: 'FLEX Prints',
    category: 'Print',
    type: 'FREE SIZE',
    price: 10,
    oldPrice: 15,
    rating: 4.5,
    reviews: 500,
    image: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=800&q=80',
    isOnSale: true,
  },
];

const PopularProducts = () => {
  const containerRef = useRef(null);

  // --- GSAP ANIMATION ---
  useGSAP(() => {
    // 1. Animate Header Text on Load
    gsap.from(".header-reveal", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out"
    });

    // 2. Batch Animate Cards on Scroll
    // .batch() is perfect for grids. It groups elements that enter the viewport
    // at the same time and staggers them, but handles scrolling smoothly.
    ScrollTrigger.batch(".product-card", {
      onEnter: (elements) => {
        gsap.fromTo(elements, 
          { y: 60, opacity: 0, scale: 0.95 }, 
          { 
            y: 0, 
            opacity: 1, 
            scale: 1, 
            duration: 0.8, 
            stagger: 0.15, 
            ease: "power3.out",
            overwrite: true 
          }
        );
      },
      // Optional: Logic if you want them to fade out when scrolling up
      // onLeave: elements => gsap.to(elements, { opacity: 0, y: -50 }),
      // onEnterBack: elements => gsap.to(elements, { opacity: 1, y: 0, stagger: 0.1 }),
      start: "top 90%", // Start animation when card top is 90% down the viewport
      once: true // Animation happens only once
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#050505] py-12 md:py-24 text-white border-b border-white/10 min-h-screen">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* --- HEADER --- */}
        <div className="mb-8 md:mb-12 flex flex-col items-start md:items-end justify-between gap-4 md:flex-row border-b border-white/10 pb-6">
          <div className="flex-1 overflow-hidden">
            <span className="header-reveal text-[#D4E821] font-mono text-[10px] md:text-xs uppercase tracking-widest mb-2 block">
                Service Catalog
            </span>
            <h2 className="header-reveal text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">
                Our <span className="text-gray-600">Services</span>
            </h2>
          </div>
          
          <button className="header-reveal group hidden md:flex items-center gap-2 rounded-none border border-white/20 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all hover:bg-[#D4E821] hover:text-black hover:border-[#D4E821]">
            View All Services
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-2 gap-3 md:gap-8 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <button className="header-reveal mt-8 w-full md:hidden flex items-center justify-center gap-2 rounded border border-white/20 px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all active:bg-[#D4E821] active:text-black">
            View Full Catalog
            <ArrowRight size={16} />
        </button>

      </div>
    </section>
  );
};

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getCategoryIcon = (cat) => {
    if (cat === 'Photography') return <Camera size={10} className="md:w-3 md:h-3" />;
    if (cat === 'Graphics') return <Palette size={10} className="md:w-3 md:h-3" />;
    if (cat === 'Website') return <Globe size={10} className="md:w-3 md:h-3" />;
    if (cat === 'Print') return <Printer size={10} className="md:w-3 md:h-3" />;
    return <Layers size={10} className="md:w-3 md:h-3" />;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    // Added 'product-card' class for GSAP targeting
    // Added 'opacity-0' initially so they don't flash before animation starts
    <div 
      className="product-card opacity-0 group relative flex flex-col bg-[#0a0a0a] border border-white/10 transition-colors duration-300 md:hover:border-[#D4E821] md:hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#1a1a1a] border-b border-white/10">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-110 opacity-90 md:opacity-80 md:group-hover:opacity-100 md:grayscale md:group-hover:grayscale-0"
        />
        
        {/* Top Badges */}
        <div className="absolute left-0 top-0 flex flex-col gap-1 p-2 md:p-3 w-full pointer-events-none">
            <div className="flex flex-col gap-1 items-start">
                {product.isNew && (
                    <span className="bg-[#D4E821] px-1.5 py-0.5 md:px-2 md:py-1 text-[8px] md:text-[10px] font-bold text-black uppercase tracking-wider shadow-lg">
                    NEW
                    </span>
                )}
                {product.isOnSale && (
                    <span className="bg-white px-1.5 py-0.5 md:px-2 md:py-1 text-[8px] md:text-[10px] font-bold text-black uppercase tracking-wider shadow-lg">
                    OFFER
                    </span>
                )}
            </div>
        </div>
        
        {/* Service Type Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur border border-white/20 px-1.5 py-0.5 md:px-2 md:py-1 text-[8px] md:text-[10px] font-mono text-[#D4E821] uppercase tracking-widest">
            {product.type}
        </div>

        {/* Desktop Hover Actions */}
        <div className={`hidden md:flex absolute bottom-4 left-0 right-0 justify-center gap-2 transition-all duration-300 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <ActionButton icon={<ShoppingCart size={16} />} label="Book Now" highlight />
          <ActionButton icon={<Heart size={16} />} label="Save" />
          <ActionButton icon={<Eye size={16} />} label="Details" />
        </div>

        {/* Mobile Action Button */}
        <button className="md:hidden absolute bottom-2 left-2 h-8 w-8 bg-[#D4E821] text-black flex items-center justify-center rounded-sm shadow-lg active:scale-95 transition-transform">
             <ShoppingCart size={14} fill="black" />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-3 md:p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-1.5 mb-1.5 text-gray-500">
            {getCategoryIcon(product.category)}
            <p className="text-[8px] md:text-[10px] font-mono uppercase tracking-widest truncate">{product.category}</p>
        </div>
        
        <h3 className="mb-2 text-xs md:text-lg font-bold text-white md:group-hover:text-[#D4E821] transition-colors leading-tight line-clamp-2 min-h-[2.5em]">
          {product.name}
        </h3>

        <div className="mt-auto pt-2 md:pt-4 border-t border-white/10 flex flex-wrap items-end justify-between gap-1">
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
                <span className="text-sm md:text-xl font-bold text-white leading-none">{formatPrice(product.price)}</span>
                {product.oldPrice && (
                    <span className="text-[10px] md:text-xs text-gray-600 line-through font-mono">
                    {formatPrice(product.oldPrice)}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-1">
                <Star size={10} className="fill-[#D4E821] text-[#D4E821] md:w-3 md:h-3" />
                <span className="text-[10px] md:text-xs text-gray-400 font-mono">{product.rating}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label, highlight }) => (
  <button 
    className={`flex h-9 w-9 items-center justify-center border transition-all duration-200
      ${highlight 
        ? 'bg-[#D4E821] border-[#D4E821] text-black hover:bg-white hover:border-white' 
        : 'bg-black/90 border-white/20 text-white hover:border-[#D4E821] hover:text-[#D4E821] backdrop-blur-sm'
      }`}
    title={label}
  >
    {icon}
  </button>
);

export default PopularProducts;