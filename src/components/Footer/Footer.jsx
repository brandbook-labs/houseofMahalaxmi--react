import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUp, Instagram, Twitter, Linkedin, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [time, setTime] = useState("");
  const marqueeRef = useRef(null);

  // Live Time (Bhubaneswar)
  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' 
      }));
    };
    const t = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(t);
  }, []);

  // Infinite Scroll Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 20,
        ease: "linear",
      });
    });
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-white border-t border-white/10 font-sans overflow-hidden">
      
      {/* === 1. MARQUEE BORDER === */}
      <div className="relative border-b border-white/10 py-3 md:py-4 overflow-hidden bg-[#0a0a0a]">
        <div className="flex whitespace-nowrap" ref={marqueeRef}>
           {[...Array(10)].map((_, i) => (
             <div key={i} className="flex items-center gap-4 md:gap-8 mx-2 md:mx-4">
                <span className="text-[9px] md:text-xs font-mono font-bold uppercase tracking-widest text-[#D4E821]">
                   /// SYSTEM_ONLINE
                </span>
                <span className="text-[9px] md:text-xs font-mono font-bold uppercase tracking-widest text-gray-600">
                   CREATIVE_INFRASTRUCTURE
                </span>
             </div>
           ))}
        </div>
      </div>

      {/* === 2. MAIN GRID (Bento Layout on Mobile) === */}
      {/* CHANGED: grid-cols-2 on mobile allows side-by-side links */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-12">
         
         {/* Branding - Spans 2 columns on Mobile for visibility */}
         <div className="col-span-2 md:col-span-1">
            <img src="./src/assets/png/TekNeoFyLogo.png" alt="MoGraphics" className="h-5 md:h-6 w-auto mb-4 md:mb-6 opacity-80" />
            <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider leading-relaxed max-w-xs">
               Odisha's Digital Forge.<br/>
               Assets & Agency.
            </p>
         </div>

         {/* Navigation - Left side on Mobile */}
         <div className="flex flex-col gap-3 col-span-1">
            <h4 className="font-mono text-[10px] text-[#D4E821] uppercase tracking-widest mb-1 md:mb-2">Index</h4>
            <a href="/shop" className="text-sm text-gray-400 hover:text-white transition-colors w-fit py-1">Asset Store</a>
            <a href="/services" className="text-sm text-gray-400 hover:text-white transition-colors w-fit py-1">Agency Services</a>
            <a href="/work" className="text-sm text-gray-400 hover:text-white transition-colors w-fit py-1">Portfolio</a>
         </div>

         {/* Socials - Right side on Mobile */}
         <div className="flex flex-col gap-3 col-span-1">
            <h4 className="font-mono text-[10px] text-[#D4E821] uppercase tracking-widest mb-1 md:mb-2">Network</h4>
            {[
               { name: 'Instagram', icon: Instagram },
               { name: 'LinkedIn', icon: Linkedin },
               { name: 'Twitter', icon: Twitter }
            ].map(social => (
               <a key={social.name} href="#" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group w-fit py-1">
                  <social.icon size={14} /> 
                  <span>{social.name}</span>
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
               </a>
            ))}
         </div>

         {/* Contact - Spans 2 columns on Mobile to prevent text wrapping */}
         <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
            <h4 className="font-mono text-[10px] text-[#D4E821] uppercase tracking-widest mb-1 md:mb-2">Comms</h4>
            <a href="mailto:hello@mographics.store" className="text-sm font-bold text-white hover:text-[#D4E821] transition-colors w-fit py-1">
               hello@mographics.store
            </a>
            <a href="tel:+919692664009" className="text-sm text-gray-400 hover:text-white transition-colors w-fit py-1">
               +91 96926 64009
            </a>
            <div className="mt-2 md:mt-4 flex gap-6">
               <a href="/privacy" className="text-[10px] text-gray-600 hover:text-gray-400 uppercase py-2">Privacy</a>
               <a href="/terms" className="text-[10px] text-gray-600 hover:text-gray-400 uppercase py-2">Terms</a>
            </div>
         </div>

      </div>

      {/* === 3. BOTTOM BAR === */}
      <div className="border-t border-white/10 bg-[#020202]">
         <div className="max-w-7xl mx-auto px-6 py-6 md:py-0 md:h-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
            
            <div className="flex items-center gap-3">
               <span className="w-1.5 h-1.5 bg-[#D4E821] rounded-full animate-pulse"></span>
               <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  Bhubaneswar: {time} IST
               </span>
            </div>

            <button 
               onClick={scrollToTop}
               className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest hover:text-[#D4E821] transition-colors group self-start md:self-auto"
            >
               Return to Top <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform" />
            </button>

         </div>
      </div>

    </footer>
  );
}