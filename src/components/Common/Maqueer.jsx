import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const MarqueeSection = () => {
  // --- REFS ---
  const topWrap = useRef(null);
  const bottomWrap = useRef(null);
  
  // Store tweens to adjust timeScale (speed) dynamically
  const topTween = useRef(null);
  const bottomTween = useRef(null);
  
  // Physics State (Mutable ref to prevent re-renders)
  const physics = useRef({
    scrollVelocity: 0,
    lastScrollTop: 0,
    rafId: null,
    isHoveringTop: false,
    isHoveringBottom: false
  });

  // --- CONFIGURATION ---
  const config = {
    baseSpeed: 50,      // Base pixels per second
    skewStrength: 0.15, // How much it tilts when scrolling
    friction: 0.92      // How fast the "whip" effect decays
  };

  // UPDATED ITEMS FOR MOGRAPHICS STORE
  const items = [
    "3D ASSETS", "UI KITS", "ELECTION MGMT", 
    "WEB DEV", "FLEX PRINTING", "BRANDING", 
    "SOCIAL MEDIA", "VECTOR PACKS"
  ];

  // --- ANIMATION & PHYSICS ENGINE ---
  useEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. SETUP INFINITE MARQUEE LOOP
      const setupTicker = (wrapper, tweenRef, direction) => {
        if (!wrapper) return;
        
        // Find the inner content wrapper
        const content = wrapper.querySelector('.content-inner');
        if (!content) return;

        // Calculate the distance to animate (width of one set of items)
        const distance = content.offsetWidth;
        
        // Create the infinite loop
        tweenRef.current = gsap.fromTo(
          wrapper,
          { x: direction === "left" ? 0 : -distance },
          {
            x: direction === "left" ? -distance : 0,
            duration: distance / config.baseSpeed,
            ease: "none",
            repeat: -1
          }
        );
      };

      // Initialize both rails
      setupTicker(topWrap.current, topTween, "left");
      setupTicker(bottomWrap.current, bottomTween, "right");

    });

    // 2. PHYSICS LOOP (Runs every frame)
    const updatePhysics = () => {
      // A. Decay Velocity (Friction)
      physics.current.scrollVelocity *= config.friction;
      
      // B. Calculate Skew based on velocity
      const vel = physics.current.scrollVelocity;
      // Clamp skew to prevent visual breakage (+/- 15 deg)
      const currentSkew = Math.max(Math.min(vel * config.skewStrength, 15), -15);

      // Apply Skew to wrappers
      if (topWrap.current && bottomWrap.current) {
        gsap.set([topWrap.current, bottomWrap.current], { 
          skewX: currentSkew,
          force3D: true 
        });
      }

      // C. Adjust Speed (Whip Effect)
      // 1 + (velocity * 0.05) makes it speed up when scrolling
      const velocityScale = 1 + (Math.abs(vel) * 0.05);
      
      if (topTween.current && !physics.current.isHoveringTop) {
        topTween.current.timeScale(velocityScale);
      }
      if (bottomTween.current && !physics.current.isHoveringBottom) {
        // Bottom moves naturally slightly faster
        bottomTween.current.timeScale(velocityScale * 1.1);
      }

      physics.current.rafId = requestAnimationFrame(updatePhysics);
    };

    // 3. SCROLL LISTENER
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      const delta = st - physics.current.lastScrollTop;
      physics.current.lastScrollTop = st;
      physics.current.scrollVelocity += delta;
    };

    window.addEventListener("scroll", handleScroll);
    updatePhysics(); // Start Loop

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (physics.current.rafId) cancelAnimationFrame(physics.current.rafId);
      ctx.revert();
    };
  }, []);

  // --- INTERACTION HANDLERS ---
  const handleHover = (isTop, isEnter) => {
    if (isTop) {
      physics.current.isHoveringTop = isEnter;
      if (topTween.current) gsap.to(topTween.current, { timeScale: isEnter ? 0.1 : 1, duration: 0.5 });
    } else {
      physics.current.isHoveringBottom = isEnter;
      if (bottomTween.current) gsap.to(bottomTween.current, { timeScale: isEnter ? 0.1 : 1, duration: 0.5 });
    }
  };

  // Helper to render items multiple times for the loop
  const renderItems = (styleClass) => (
    <>
      {/* Repeater: Render 4x to ensure it covers wide screens before looping */}
      {[...items, ...items, ...items, ...items].map((item, i) => (
        <span key={i} className={`
          relative inline-flex items-center px-4 md:px-8 
          font-sans text-[clamp(3rem,8vw,8rem)] font-black uppercase leading-none transition-all duration-300 cursor-default
          ${styleClass}
        `}>
          {item}
          <span className="font-mono text-[0.4em] text-[#D4E821] ml-4 md:ml-8 opacity-80 align-middle font-normal">///</span>
        </span>
      ))}
    </>
  );

  return (
    <section className="relative flex flex-col gap-16 md:gap-24 py-[12vh] overflow-hidden bg-[#050505] text-white font-sans border-b border-white/10">
      
      {/* --- TOP RAIL (OUTLINE STYLE) --- */}
      <div 
        className="relative w-full py-6 -rotate-2 origin-center transition-colors hover:bg-white/[0.02]"
        onMouseEnter={() => handleHover(true, true)}
        onMouseLeave={() => handleHover(true, false)}
      >
        {/* Rail Line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 z-0"></div>

        {/* Track Container */}
        <div ref={topWrap} className="flex whitespace-nowrap relative z-10 will-change-transform">
          {/* Inner Content (Measured for loop) */}
          <div className="content-inner flex items-center">
            {renderItems(`
              text-transparent 
              [-webkit-text-stroke:1px_rgba(255,255,255,0.3)] 
              hover:[-webkit-text-stroke:1px_#D4E821] 
              hover:text-[#D4E821]/10
              hover:opacity-100 
              hover:drop-shadow-[0_0_20px_rgba(212,232,33,0.3)]
            `)}
          </div>
        </div>
      </div>

      {/* --- BOTTOM RAIL (SOLID/CHROME STYLE) --- */}
      <div 
        className="relative w-full py-6 -rotate-2 origin-center transition-colors hover:bg-white/[0.02]"
        onMouseEnter={() => handleHover(false, true)}
        onMouseLeave={() => handleHover(false, false)}
      >
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 z-0"></div>

        <div ref={bottomWrap} className="flex whitespace-nowrap relative z-10 will-change-transform">
          <div className="content-inner flex items-center">
            {renderItems(`
              text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600
              hover:text-[#D4E821] hover:bg-none 
              hover:drop-shadow-[0_0_30px_rgba(212,232,33,0.5)] 
              hover:scale-[1.02]
            `)}
          </div>
        </div>
      </div>

    </section>
  );
};

export default MarqueeSection;