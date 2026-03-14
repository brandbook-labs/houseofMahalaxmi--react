import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Manifesto = () => {
  const wrapperRef = useRef(null);
  const btnRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. PARALLAX SLIDING LINES
      const leftSliders = gsap.utils.toArray('.left-slide');
      leftSliders.forEach(el => {
        gsap.fromTo(el, 
          { x: -50 }, 
          { 
            x: 50, 
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      });

      const rightSliders = gsap.utils.toArray('.right-slide');
      rightSliders.forEach(el => {
        gsap.fromTo(el, 
          { x: 50 }, 
          { 
            x: -50, 
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );
      });

      // 2. TEXT HIGHLIGHTING
      const targets = gsap.utils.toArray('.highlight-target');
      targets.forEach(el => {
        gsap.fromTo(el,
          { color: "#ffffff", textShadow: "none" },
          { 
            color: "#D4E821",
            textShadow: "0 0 30px rgba(212, 232, 33, 0.4)",
            scrollTrigger: {
              trigger: el,
              start: "top 60%",
              end: "bottom 40%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });

      // 3. CENTER LINE GROWTH
      gsap.fromTo(".center-line", 
        { height: 0 },
        { 
          height: "100%", 
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 0
          }
        }
      );

      // 4. BUTTON REVEAL
      gsap.fromTo(btnRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, 
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: btnRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={wrapperRef} 
      className="relative w-full py-[15vh] overflow-hidden font-sans text-white bg-black border-b border-white/10"
    >
      
      {/* Center Line */}
      <div className="center-line absolute top-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-[#D4E821] to-transparent -translate-x-1/2 z-0 opacity-30"></div>

      {/* Content Stream */}
      <div className="flex flex-col gap-[8vh] relative z-10">
        
        {/* BLOCK 1: THE PROBLEM */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="left-slide flex items-baseline gap-4 md:gap-8 whitespace-nowrap will-change-transform">
            <span className="font-mono text-xs md:text-base text-[#D4E821] -translate-y-[1vw]">01 // VISION</span>
            <h2 className="text-[12vw] md:text-[8vw] leading-[0.9] font-black -tracking-[0.04em] uppercase">
              GENERIC
            </h2>
          </div>
          <div className="right-slide flex items-baseline gap-4 md:gap-8 whitespace-nowrap will-change-transform">
            <h2 className="text-[12vw] md:text-[8vw] leading-[0.9] font-black -tracking-[0.04em] uppercase [-webkit-text-stroke:1px_#fff] text-transparent opacity-50">
              DESIGN IS <span className="highlight-target [-webkit-text-stroke:0] opacity-100">DEAD</span>.
            </h2>
          </div>
        </div>

        {/* BLOCK 2: THE SOLUTION */}
        <div className="flex flex-col items-center justify-center w-full">
          <div className="left-slide flex items-baseline gap-4 md:gap-8 whitespace-nowrap will-change-transform">
            <h2 className="text-[12vw] md:text-[8vw] leading-[0.9] font-black -tracking-[0.04em] uppercase">
              WE <span className="highlight-target">WEAPONIZE</span>
            </h2>
          </div>
          <div className="right-slide flex items-baseline gap-4 md:gap-8 whitespace-nowrap will-change-transform">
             <h2 className="text-[12vw] md:text-[8vw] leading-[0.9] font-black -tracking-[0.04em] uppercase text-[#D4E821]">
               CREATIVITY.
             </h2>
          </div>
        </div>

      </div>

      {/* FOOTER ACTION */}
      <div className="mt-[15vh] flex flex-col items-center gap-8 relative z-20">
        <div className="w-[1px] h-[60px] bg-[#D4E821]"></div>
        
        <div ref={btnRef} className="relative group">
            <a 
              href="/contact" 
              className="relative inline-flex items-center gap-4 px-10 py-5 bg-[#D4E821] text-black font-bold text-xl uppercase tracking-wider overflow-hidden hover:scale-105 transition-transform duration-300 clip-path-slant"
              style={{ clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)" }}
            >
              <span>Let's Talk</span>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
              
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-white/40 -translate-x-full group-hover:animate-[shine_0.8s_ease-in-out]" />
            </a>
            
            {/* Glow backing */}
            <div className="absolute -inset-2 bg-[#D4E821] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10"></div>
        </div>

        <div className="text-[10px] tracking-[0.3em] text-gray-500 font-mono uppercase mt-4">MoGraphics Store</div>
      </div>

      <style jsx>{`
        @keyframes shine {
          100% { transform: translateX(100%); }
        }
      `}</style>

    </section>
  );
};

export default Manifesto;