import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- PARTNER DATA ---
const PARTNERS = [
  // 1. STRATEGIC PARTNER (The Anchor) - Full Width on Mobile & Desktop
  { 
    id: "01", 
    name: "Brandbook Studio", 
    category: "Strategic Partner", 
    desc: "Collaborative branding & UI/UX architecture.",
    logoImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80", 
    // FIXED: col-span-2 ensures full width on mobile
    width: "col-span-2 md:col-span-2", 
    highlight: true
  },
  
  // 2. EDUCATION - Full Width Mobile (for readability), 1/3 Desktop
  { 
    id: "02", 
    name: "MoSchool", 
    category: "Ed-Tech / Govt", 
    desc: "Digital learning initiatives & web platforms.",
    logoImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    width: "col-span-2 md:col-span-1",
    highlight: false
  },

  // 3. POLITICAL (Grouped) - Side-by-side on Mobile
  { 
    id: "03", 
    name: "BJP Odisha", 
    category: "Campaign", // Shortened for mobile
    desc: "Election graphics & digital management.",
    logoImage: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&q=80",
    // FIXED: col-span-1 puts them side-by-side on mobile
    width: "col-span-1 md:col-span-1",
    highlight: false
  },
  { 
    id: "04", 
    name: "BJD Odisha", 
    category: "Campaign",
    desc: "Social media visual strategy.",
    logoImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    width: "col-span-1 md:col-span-1",
    highlight: false
  },
  { 
    id: "05", 
    name: "AAP Odisha", 
    category: "Campaign",
    desc: "Outreach branding & print media.",
    logoImage: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80",
    width: "col-span-1 md:col-span-1",
    highlight: false
  },

  // 4. PRODUCTION PARTNERS
  { 
    id: "06", 
    name: "Niladri Graphics", 
    category: "Print",
    desc: "High-volume offset printing partner.",
    logoImage: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=80",
    width: "col-span-1 md:col-span-1",
    highlight: false
  },
  { 
    id: "07", 
    name: "Ekram Arts", 
    category: "Creative Arts", 
    desc: "Custom signage & environmental design.",
    logoImage: "https://images.unsplash.com/photo-1569172131967-8390b0b163b6?w=800&q=80",
    width: "col-span-2 md:col-span-2", 
    highlight: false
  }
];

export default function PartnerGrid() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.fromTo(cardsRef.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 bg-[#050505] text-white border-b border-white/10 overflow-hidden">
      
      {/* Background Grid Texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(to right, #444 1px, transparent 1px), linear-gradient(to bottom, #444 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-4 md:gap-6">
            <div>
                <span className="text-[#D4E821] font-mono text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-4 block">
                    Network Access
                </span>
                {/* FIXED: Smaller text on mobile to prevent wrapping issues */}
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-[0.9]">
                    Trusted <span className="text-gray-600">Collaborators</span>
                </h2>
            </div>
            <div className="max-w-xs text-left md:text-right hidden md:block">
                <p className="text-gray-400 text-sm leading-relaxed font-mono">
                    From state-level campaigns to creative studios, we power the brands that move Odisha.
                </p>
            </div>
        </div>

        {/* --- BENTO GRID LAYOUT --- */}
        {/* FIXED: grid-cols-2 on mobile allows side-by-side cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            
            {PARTNERS.map((partner, index) => (
                <div 
                    key={partner.id}
                    ref={el => cardsRef.current[index] = el}
                    // FIXED: Reduced height (h-[200px]) on mobile for compactness
                    className={`group relative bg-[#0a0a0a] border border-white/10 h-[200px] md:h-[240px] overflow-hidden transition-all duration-500 hover:border-[#D4E821] ${partner.width}`}
                >
                    {/* === BACKGROUND LOGO TEXTURE === */}
                    <div className="absolute inset-0 z-0 text-white pointer-events-none overflow-hidden">
                        <div className="absolute inset-0 bg-[#0a0a0a] opacity-90 z-10"></div>
                        <img 
                            src={partner.logoImage} 
                            alt={`${partner.name} texture`}
                            className="w-full h-full object-cover grayscale opacity-20 mix-blend-screen group-hover:scale-110 transition-transform duration-[2s] ease-out"
                        />
                    </div>

                    {/* === CARD CONTENT === */}
                    {/* FIXED: Reduced padding (p-4) on mobile */}
                    <div className="relative z-10 p-4 md:p-6 flex flex-col justify-between h-full">
                        
                        {/* Top Row */}
                        <div className="flex justify-between items-start">
                            <div className={`p-1.5 md:p-2 rounded-lg border border-white/10 backdrop-blur-md ${partner.highlight ? 'bg-[#D4E821]/80 text-black' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
                                <Layers size={16} className="md:w-[18px] md:h-[18px]" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/30 group-hover:text-[#D4E821] transition-colors">
                                {partner.id}
                            </span>
                        </div>

                        {/* Middle: Arrow */}
                        <div className="absolute top-4 right-4 md:top-6 md:right-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                             <ArrowUpRight size={18} className="text-[#D4E821]" />
                        </div>

                        {/* Bottom: Text Content */}
                        <div>
                            <div className="text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-[#D4E821]/70 mb-1 md:mb-2 truncate">
                                {partner.category}
                            </div>
                            {/* FIXED: Responsive text size for title */}
                            <h3 className={`text-lg md:text-2xl font-bold uppercase leading-none mb-2 md:mb-3 ${partner.highlight ? 'text-white' : 'text-gray-200 group-hover:text-white'}`}>
                                {partner.name}
                            </h3>
                            {/* FIXED: Hidden description on mobile side-by-side cards to reduce clutter, visible on full width */}
                            <p className={`text-xs text-gray-400 leading-relaxed max-w-[95%] group-hover:text-gray-300 ${partner.width.includes('col-span-1') ? 'hidden md:block' : 'block'}`}>
                                {partner.desc}
                            </p>
                        </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/10 group-hover:border-[#D4E821] transition-colors z-20"></div>
                </div>
            ))}

        </div>

        {/* --- BOTTOM STATS BAR --- */}
        <div className="mt-8 md:mt-12 pt-6 border-t border-white/10 flex justify-between items-center text-[9px] md:text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            <span>Clients: 50+</span>
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#D4E821] animate-pulse"></span>
                <span>Operational</span>
            </div>
        </div>

      </div>
    </section>
  );
}