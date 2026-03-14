 import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  ShoppingCart, Heart, Share2, ShieldCheck, 
  FileCode, Layers, Info, Check, Star 
} from 'lucide-react';

// --- MOCK PRODUCT DATA (Example: 3D Pack) ---
const product = {
  id: "ASSET-001",
  title: "Glassmorphism 3D Pack",
  subtitle: "Premium 3D Objects for Blender & Figma",
  price: 49.00,
  description: "Elevate your UI designs with this comprehensive pack of 40+ abstract 3D glass shapes. Rendered in 4K resolution with varied materials including frosted glass, holographic foil, and matte plastic. Compatible with all major design tools.",
  features: [
    "40+ High-Res 3D Objects",
    "4K Resolution (4096x4096)",
    "Alpha Channel (Transparent Background)",
    "Blender Source Files Included",
    "Figma Drag & Drop Compatible"
  ],
  specs: [
    { label: "Format", value: ".BLEND, .OBJ, .PNG" },
    { label: "Size", value: "2.4 GB" },
    { label: "License", value: "Commercial" },
    { label: "Version", value: "v2.0" }
  ],
  images: [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop"
  ]
};

export default function ProductDetails() {
  const [activeTab, setActiveTab] = useState('details');
  const [activeImage, setActiveImage] = useState(0);
  const mainImageRef = useRef(null);

  // Image Transition Animation
  useEffect(() => {
    if (mainImageRef.current) {
      gsap.fromTo(mainImageRef.current,
        { opacity: 0.8, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeImage]);

  return (
    <div className="bg-[#050505] text-white min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* === LEFT: GALLERY (Sticky) === */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Main Image Viewport */}
          <div className="relative w-full aspect-square md:aspect-[16/10] bg-[#111] rounded-none border border-white/10 overflow-hidden group">
             <img 
               ref={mainImageRef}
               src={product.images[activeImage]} 
               alt="Product View" 
               className="w-full h-full object-cover"
             />
             
             {/* Overlay UI */}
             <div className="absolute top-4 left-4">
                <span className="bg-[#D4E821] text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                   Best Seller
                </span>
             </div>
             
             {/* Zoom Hint */}
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                 <div className="bg-black/50 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                    <span className="text-[10px] uppercase tracking-widest">Click to Expand</span>
                 </div>
             </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-4 gap-4">
             {product.images.map((img, i) => (
                <div 
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square cursor-pointer border transition-all duration-200 overflow-hidden
                    ${activeImage === i ? 'border-[#D4E821] opacity-100' : 'border-white/10 opacity-50 hover:opacity-100'}
                  `}
                >
                   <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </div>
             ))}
          </div>
        </div>

        {/* === RIGHT: DETAILS & BUY BOX === */}
        <div className="lg:col-span-5 relative">
           <div className="lg:sticky lg:top-32 flex flex-col gap-8">
              
              {/* Header */}
              <div>
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-gray-400 font-mono text-[10px] uppercase tracking-widest">
                       <span>{product.id}</span>
                       <span>///</span>
                       <span>3D Assets</span>
                    </div>
                    <div className="flex gap-4">
                       <button className="text-gray-500 hover:text-white transition-colors"><Share2 size={18} /></button>
                       <button className="text-gray-500 hover:text-[#D4E821] transition-colors"><Heart size={18} /></button>
                    </div>
                 </div>
                 
                 <h1 className="text-4xl md:text-5xl font-black uppercase leading-[0.9] mb-2">
                    {product.title}
                 </h1>
                 <p className="text-gray-400 text-sm">
                    {product.subtitle}
                 </p>
              </div>

              {/* Price & Rating */}
              <div className="flex items-end justify-between border-b border-white/10 pb-6">
                 <div>
                    <span className="text-3xl font-bold text-[#D4E821]">${product.price}</span>
                    <span className="text-xs text-gray-500 ml-2">USD</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="flex text-[#D4E821]">
                       {[1,2,3,4,5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono underline cursor-pointer">42 Reviews</span>
                 </div>
              </div>

              {/* Tech Specs Grid */}
              <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
                 {product.specs.map((spec, i) => (
                    <div key={i} className="bg-[#0a0a0a] p-3 flex flex-col">
                       <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">{spec.label}</span>
                       <span className="text-sm font-mono text-white">{spec.value}</span>
                    </div>
                 ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                 <button className="flex-1 bg-[#D4E821] text-black h-14 font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2">
                    <ShoppingCart size={18} /> Add to Cart
                 </button>
                 <button className="flex-1 border border-white/20 text-white h-14 font-bold uppercase tracking-wider hover:bg-white/10 transition-colors">
                    Buy Now
                 </button>
              </div>

              {/* Info Tabs */}
              <div className="mt-4">
                 <div className="flex border-b border-white/10 mb-6">
                    {['details', 'license', 'support'].map(tab => (
                       <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`pb-3 pr-6 text-xs font-bold uppercase tracking-widest transition-colors
                             ${activeTab === tab ? 'text-[#D4E821] border-b border-[#D4E821]' : 'text-gray-600 hover:text-white'}
                          `}
                       >
                          {tab}
                       </button>
                    ))}
                 </div>

                 {/* Tab Content */}
                 <div className="min-h-[150px]">
                    {activeTab === 'details' && (
                       <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <p className="text-gray-400 text-sm leading-relaxed mb-6">
                             {product.description}
                          </p>
                          <ul className="space-y-2">
                             {product.features.map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                   <Check size={14} className="text-[#D4E821]" /> {feat}
                                </li>
                             ))}
                          </ul>
                       </div>
                    )}
                    {activeTab === 'license' && (
                       <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                          <div className="flex items-start gap-3 text-sm text-gray-400 mb-4">
                             <ShieldCheck size={20} className="text-[#D4E821] shrink-0" />
                             <p>This license allows for <strong className="text-white">Commercial Use</strong>. You can use this asset in personal and commercial projects, client work, and broadcast.</p>
                          </div>
                          <p className="text-xs text-gray-600 pl-8">x Redistribution or resale of source files is strictly prohibited.</p>
                       </div>
                    )}
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
}