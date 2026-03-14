import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// FIX: Added Clock to imports so it is available immediately
import { ArrowDown, Award, Users, Layers, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Placeholder video URL
const VIDEO_URL = "https://cdn.coverr.co/videos/coverr-abstract-digital-waves-4866/1080p.mp4";

// FIX: Now that Clock is imported above, this array works perfectly
const STATS = [
  { label: "Years Experience", value: 12, suffix: "+", icon: Clock },
  { label: "Projects Shipped", value: 450, suffix: "+", icon: Layers },
  { label: "Global Awards", value: 36, suffix: "", icon: Award },
];

const AboutUsHero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Entrance Animation (Staggered Text)
      const splitHeadline = textRef.current.querySelectorAll('.headline-line');
      const introText = textRef.current.querySelector('.intro-text');
      const accentTag = textRef.current.querySelector('.accent-tag');

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(accentTag, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.5 })
        .fromTo(splitHeadline, 
          { y: "100%", opacity: 0, rotateX: -20 }, 
          { y: "0%", opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15 }, 
          "-=0.4"
        )
        .fromTo(introText, 
          { opacity: 0, y: 30 }, 
          { opacity: 0.7, y: 0, duration: 1 }, 
          "-=0.8"
        );

      // 2. Stats Count-Up Animation
      const statNumbers = statsRef.current.querySelectorAll('.stat-number');
      gsap.from(statNumbers, {
        textContent: 0,
        duration: 2,
        ease: "power2.out",
        snap: { textContent: 1 },
        stagger: 0.2,
        scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
        }
      });
      
      gsap.fromTo(statsRef.current.querySelectorAll('.stat-item'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, scrollTrigger: { trigger: statsRef.current, start: "top 90%" } }
      );


      // 3. Background Parallax
      gsap.to(videoRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] lg:min-h-screen flex items-center bg-[#080808] text-white overflow-hidden pt-20 selection:bg-[#34d0d0] selection:text-black">
      
      {/* --- BACKGROUND VIDEO --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-[#080808]/50 z-10"></div>
        <div className="absolute inset-0 bg-black/40 z-5"></div>
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-[120%] object-cover -translate-y-[10%]"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 flex flex-col justify-end h-full pb-20 lg:pb-32">
        
        <div ref={textRef} className="max-w-4xl">
          {/* Accent Tag */}
          <div className="accent-tag overflow-hidden mb-6">
             <p className="text-[#34d0d0] font-mono uppercase tracking-[0.2em] text-sm flex items-center gap-3">
               <span className="w-8 h-[1px] bg-[#34d0d0]"></span>
               Who We Are
             </p>
          </div>
          
          {/* Oversized Headline */}
          <h1 className="text-[10vw] lg:text-[7rem] font-bold leading-[0.9] tracking-tighter uppercase mb-8">
            <div className="overflow-hidden"><span className="headline-line block">The Architects</span></div>
            <div className="overflow-hidden"><span className="headline-line block">Of Digital</span></div>
            <div className="overflow-hidden"><span className="headline-line block text-transparent bg-clip-text bg-gradient-to-r from-white to-[#34d0d0]">Tomorrow.</span></div>
          </h1>

          {/* Intro Text */}
          <p className="intro-text text-xl lg:text-2xl text-white/70 leading-relaxed max-w-2xl mb-16">
            We are a collective of strategists, designers, and engineers building brands that define the future culture of the web.
          </p>
        </div>

        {/* --- STATS STRIP --- */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 border-t border-white/10 pt-12 max-w-3xl">
            {STATS.map((stat, index) => {
                const Icon = stat.icon;
                return (
                    <div key={index} className="stat-item flex items-start gap-4">
                        <div className="text-[#34d0d0] mt-1 hidden lg:block">
                            <Icon size={24} />
                        </div>
                        <div>
                            <div className="flex items-baseline font-bold text-4xl lg:text-5xl tracking-tight">
                                <span className="stat-number">{stat.value}</span>
                                <span className="text-[#34d0d0]">{stat.suffix}</span>
                            </div>
                            <p className="text-white/50 text-sm uppercase tracking-wider mt-2 font-mono">{stat.label}</p>
                        </div>
                    </div>
                )
            })}
        </div>

      </div>
        
       {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/50">
        <ArrowDown size={24} />
      </div>

    </section>
  );
};

export default AboutUsHero;