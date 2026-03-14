import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';

export default function WorksHeader({ projectCount = 0 }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Label Reveal
      gsap.from(".header-label", { y: 20, opacity: 0, duration: 0.6, delay: 0.1 });
      
      // 2. Title Stagger
      gsap.from(".header-title-line", { 
        y: 100, 
        skewY: 5,
        opacity: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power3.out",
        delay: 0.2
      });

      // 3. CTA Reveal
      gsap.from(".header-cta", { x: 20, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.4 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full px-6 md:px-10 pt-12 pb-12 md:pb-20 border-b border-white/5 bg-[#050505]">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        
        {/* --- LEFT: TITLE AREA --- */}
        <div>
          {/* Industrial Meta Label */}
          <div className="header-label flex items-center gap-3 mb-6">
            <span className="w-2 h-2 bg-[#D4E821] rounded-full animate-pulse"></span>
            <span className="text-[#D4E821] font-mono text-xs uppercase tracking-[0.2em]">
              Our Latest Works
            </span>
            <span className="text-gray-600 font-mono text-xs uppercase">
              ({projectCount} Items)
            </span>
          </div>

          {/* Big Typography */}
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white overflow-hidden">
            <div className="overflow-hidden">
              <span className="header-title-line block">Visual</span>
            </div>
            <div className="overflow-hidden">
              <span className="header-title-line block text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>
                Index.
              </span>
            </div>
          </h1>
        </div>

        {/* --- RIGHT: SHOP ACTION --- */}
        <div className="header-cta w-full md:w-auto">
            <p className="text-gray-500 text-xs font-mono uppercase mb-4 max-w-[200px] hidden md:block">
                Like what you see? Purchase the assets used in these projects.
            </p>
            
            <Link 
                to="/shop" 
                className="group relative inline-flex items-center gap-4 bg-[#1a1a1a] hover:bg-[#D4E821] border border-white/10 hover:border-[#D4E821] px-8 py-6 rounded-xl transition-all duration-300 w-full md:w-auto justify-between md:justify-start overflow-hidden"
            >
                <div className="flex flex-col items-start z-10">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest group-hover:text-black/60 transition-colors">
                        Available Now
                    </span>
                    <span className="text-xl font-black text-white uppercase tracking-tight group-hover:text-black transition-colors flex items-center gap-2">
                        Visit Shop <ShoppingBag size={18} />
                    </span>
                </div>

                {/* Animated Arrow Icon */}
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-black group-hover:text-[#D4E821] transition-all z-10 group-hover:rotate-45">
                    <ArrowRight size={20} />
                </div>

                {/* Hover Fill Effect */}
                <div className="absolute inset-0 bg-[#D4E821] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </Link>
        </div>

      </div>
    </div>
  );
}