import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Flag, Target, Zap, TrendingUp, Crosshair } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MISSION_PILLARS = [
  {
    icon: Target,
    title: "Precision",
    text: "We don't guess. We strip away the noise to find the signal, targeting growth with surgical accuracy through data-driven insight."
  },
  {
    icon: Zap,
    title: "Velocity",
    text: "The digital landscape waits for no one. We build agile systems designed to adapt, scale, and dominate faster than the competition."
  },
  {
    icon: TrendingUp,
    title: "Legacy",
    text: "We don't just want you to win today. We build the digital infrastructure that secures your market position for the next decade."
  }
];

const VisionMission = () => {
  const containerRef = useRef(null);
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const bgTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Vision Text Reveal (Manifesto Style)
      const visionLines = visionRef.current.querySelectorAll('.vision-line');
      gsap.fromTo(visionLines,
        { y: "100%", rotateX: -10, opacity: 0 },
        { 
          y: "0%", 
          rotateX: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: visionRef.current,
            start: "top 75%",
          }
        }
      );

      // 2. Mission Header Reveal
      gsap.fromTo(".mission-header",
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 80%",
          }
        }
      );

      // 3. Mission Cards Stagger
      gsap.fromTo(".mission-card",
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.2, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".mission-grid",
            start: "top 85%",
          }
        }
      );

      // 4. Background Parallax
      gsap.to(bgTextRef.current, {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-[#080808] text-white py-24 lg:py-32 overflow-hidden selection:bg-[#34d0d0] selection:text-black">
      
      {/* --- BACKGROUND PARALLAX TEXT --- */}
      <div 
        ref={bgTextRef}
        className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 opacity-[0.03]"
      >
        <span className="text-[30vw] font-black leading-none uppercase tracking-tighter whitespace-nowrap">
          Impact
        </span>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        
        {/* ================= VISION SECTION (The "Why") ================= */}
        <div ref={visionRef} className="max-w-5xl mx-auto text-center mb-32 relative">
          
          {/* Tag */}
          <div className="flex justify-center mb-8">
            <span className="vision-line inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#34d0d0]/30 bg-[#34d0d0]/10 text-[#34d0d0] text-xs font-mono uppercase tracking-widest">
              <Eye size={14} /> The Vision
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[1.1] mb-8">
            <div className="overflow-hidden"><span className="vision-line block">We believe the</span></div>
            <div className="overflow-hidden"><span className="vision-line block">future belongs to</span></div>
            <div className="overflow-hidden"><span className="vision-line block text-transparent bg-clip-text bg-gradient-to-r from-white to-[#34d0d0]">the boldest.</span></div>
          </h2>

          {/* Subtext */}
          <div className="overflow-hidden">
            <p className="vision-line text-lg lg:text-2xl text-white/60 leading-relaxed max-w-3xl mx-auto">
              In a world of noise, we architect clarity. To create a digital landscape where ambitious brands don't just compete—they define the culture.
            </p>
          </div>
          
          {/* Decorative vertical line connecting Vision to Mission */}
          <div className="absolute left-1/2 -bottom-32 w-[1px] h-32 bg-gradient-to-b from-white/20 to-[#34d0d0]/50 hidden lg:block"></div>
        </div>


        {/* ================= MISSION SECTION (The "How") ================= */}
        <div ref={missionRef}>
          
          {/* Mission Header */}
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6 mission-header border-t border-white/10 pt-16">
             <div>
                <span className="text-[#34d0d0] font-mono text-sm uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Flag size={14} /> The Mission
                </span>
                <h3 className="text-3xl lg:text-5xl font-bold uppercase tracking-tight">
                    Engineered<br/>For Impact.
                </h3>
             </div>
             <p className="text-white/50 max-w-md text-right md:text-left">
                 Our daily pursuit is to bridge the gap between creative intuition and technical precision.
             </p>
          </div>

          {/* Mission Grid */}
          <div className="mission-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {MISSION_PILLARS.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index} 
                  className="mission-card group relative p-8 lg:p-10 rounded-2xl bg-white/[0.02] border border-white/10 overflow-hidden hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500"
                >
                  
                  {/* Hover Gradient Blob */}
                  <div className="absolute -right-20 -top-20 w-40 h-40 bg-[#34d0d0]/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                  {/* Icon */}
                  <div className="relative z-10 mb-8 inline-block p-4 rounded-xl bg-white/5 border border-white/10 text-white group-hover:text-[#34d0d0] group-hover:border-[#34d0d0]/50 transition-colors duration-300">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h4 className="relative z-10 text-xl font-bold uppercase tracking-wide mb-4">
                    {item.title}
                  </h4>
                  <p className="relative z-10 text-white/60 leading-relaxed text-sm lg:text-base">
                    {item.text}
                  </p>

                  {/* Corner Accent */}
                  <div className="absolute bottom-4 right-4 text-white/10 group-hover:text-[#34d0d0] transition-colors duration-500">
                     <Crosshair size={20} />
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default VisionMission;