import React, { useState, useRef, useEffect, useMemo } from "react";

// --- UTILS ---
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const script = document.createElement("script");
    script.src = src; script.async = true;
    script.onload = resolve; script.onerror = reject;
    document.body.appendChild(script);
  });
};

const Icons = {
  Alert: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
  ),
  Check: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Activity: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  ),
  ArrowRight: ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
  )
};

// --- PARTICLE BACKGROUND CANVAS ---
const ParticleField = ({ mode }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Color depends on mode
      const color = mode === 'analyze' ? '239, 68, 68' : '34, 197, 94'; // Red vs Green
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if(p.x > width) p.x = 0;
        if(p.x < 0) p.x = width;
        if(p.y > height) p.y = 0;
        if(p.y < 0) p.y = height;

        ctx.fillStyle = `rgba(${color}, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mode]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

const HeroCTA = () => {
  const [gsapLoaded, setGsapLoaded] = useState(false);
  const [mode, setMode] = useState('analyze'); // 'analyze' (Bad) | 'resolve' (Good)
  
  // Refs
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const bigTextRef = useRef(null);
  const cursorRef = useRef(null);

  // 1. Load GSAP
  useEffect(() => {
    Promise.all([
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"),
      loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js")
    ]).then(() => setTimeout(() => setGsapLoaded(true), 100));
  }, []);

  // 2. Interaction & Animation Logic
  useEffect(() => {
    if (!gsapLoaded || !window.gsap) return;
    const gsap = window.gsap;

    const ctx = gsap.context(() => {
      
      // Initial Reveal
      gsap.from(".hero-element", {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power4.out"
      });

      // Mouse Parallax (The "3D Feel")
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5);
        const y = (clientY / window.innerHeight - 0.5);

        // Card tilts heavily
        gsap.to(cardRef.current, {
          rotationY: x * 15,
          rotationX: -y * 15,
          x: x * 20,
          y: y * 20,
          duration: 0.8
        });

        // Text moves opposite (Depth)
        gsap.to(bigTextRef.current, {
          x: -x * 60,
          y: -y * 60,
          duration: 1
        });

        // Custom Cursor
        gsap.to(cursorRef.current, {
          x: clientX,
          y: clientY,
          duration: 0.15,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, [gsapLoaded]);

  // 3. Handle The "Shift"
  const toggleMode = () => {
    if (!window.gsap) return;
    const nextMode = mode === 'analyze' ? 'resolve' : 'analyze';
    setMode(nextMode);

    // Animate the Transition
    const tl = window.gsap.timeline();
    
    // Flash effect
    tl.to(".flash-overlay", { opacity: 1, duration: 0.1, ease: "power1.in" })
      .to(".flash-overlay", { opacity: 0, duration: 0.8, ease: "power2.out" });

    // Animate Text Colors
    if (nextMode === 'resolve') {
        window.gsap.to(".theme-text", { color: "#4ade80", duration: 0.5 }); // Green
        window.gsap.to(".theme-border", { borderColor: "#4ade80", duration: 0.5 });
        window.gsap.to(".theme-bg", { backgroundColor: "#4ade80", duration: 0.5 });
    } else {
        window.gsap.to(".theme-text", { color: "#ef4444", duration: 0.5 }); // Red
        window.gsap.to(".theme-border", { borderColor: "#ef4444", duration: 0.5 });
        window.gsap.to(".theme-bg", { backgroundColor: "#ef4444", duration: 0.5 });
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] bg-[#050505] text-white overflow-hidden flex items-center justify-center perspective-[2000px] cursor-none"
    >
      {/* --- CUSTOM CURSOR --- */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 mix-blend-difference">
         <div className={`w-full h-full rounded-full border-2 transition-all duration-300 ${mode === 'analyze' ? 'border-red-500 scale-100' : 'border-green-400 scale-75'}`} />
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full`} />
      </div>

      {/* --- DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
         <ParticleField mode={mode} />
         {/* Flash Overlay for transition */}
         <div className="flash-overlay absolute inset-0 bg-white pointer-events-none opacity-0 mix-blend-overlay z-50" />
         
         {/* Vignette & Scanlines */}
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_90%)]" />
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] pointer-events-none z-10 opacity-20" />
      </div>

      {/* --- LAYER 1: GIANT TYPOGRAPHY (PARALLAX) --- */}
      <div 
        ref={bigTextRef} 
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none select-none opacity-20"
      >
         <h1 className="text-[25vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent transition-all duration-1000"
             style={{ 
               filter: mode === 'analyze' ? 'blur(2px)' : 'blur(0px)',
               transform: mode === 'analyze' ? 'scale(1)' : 'scale(1.05)'
             }}
         >
            {mode === 'analyze' ? 'CRISIS' : 'SOLVED'}
         </h1>
      </div>

      {/* --- LAYER 2: THE "MONOLITH" (INTERACTIVE CARD) --- */}
      <div className="relative z-20 perspective-1000">
         <div 
           ref={cardRef}
           className="
             relative w-[90vw] max-w-4xl h-[60vh] md:h-[500px]
             bg-black/40 backdrop-blur-2xl
             border border-white/10
             rounded-[2rem]
             shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)]
             flex flex-col md:flex-row
             overflow-hidden
             hero-element
             transition-all duration-700
           "
           style={{
             boxShadow: mode === 'analyze' 
               ? '0 0 80px -20px rgba(239, 68, 68, 0.2)' 
               : '0 0 80px -20px rgba(74, 222, 128, 0.2)'
           }}
         >
            {/* --- LEFT: DATA VISUALIZER --- */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5 relative">
               
               {/* Header Status */}
               <div className="flex justify-between items-start">
                  <div className="space-y-1">
                     <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">System Status</div>
                     <div className={`theme-text text-2xl font-bold font-mono transition-colors duration-500 ${mode === 'analyze' ? 'text-red-500' : 'text-green-400'}`}>
                        {mode === 'analyze' ? 'CRITICAL_LOAD' : 'OPTIMIZED'}
                     </div>
                  </div>
                  <Icons.Activity className={`w-6 h-6 theme-text transition-colors duration-500 ${mode === 'analyze' ? 'text-red-500' : 'text-green-400'}`} />
               </div>

               {/* Center Graphic */}
               <div className="flex-1 flex items-center justify-center relative my-6">
                  {/* The Ring */}
                  <div className={`w-40 h-40 rounded-full border-2 border-dashed transition-all duration-1000 flex items-center justify-center relative theme-border ${mode === 'analyze' ? 'border-red-500/50 animate-[spin_10s_linear_infinite]' : 'border-green-400/50 rotate-180'}`}>
                     <div className={`absolute inset-0 rounded-full opacity-20 theme-bg blur-2xl transition-colors duration-500 ${mode === 'analyze' ? 'bg-red-500' : 'bg-green-400'}`} />
                     
                     <div className="text-center z-10">
                        <div className="text-4xl font-bold text-white tabular-nums">
                           {mode === 'analyze' ? '84%' : '0%'}
                        </div>
                        <div className="text-[10px] uppercase text-slate-400 tracking-wider">Carbon Waste</div>
                     </div>
                  </div>
               </div>

               {/* Footer Data */}
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <div className="text-[10px] text-slate-500 uppercase">Grid Draw</div>
                     <div className="text-white font-mono">420 MW</div>
                  </div>
                  <div>
                     <div className="text-[10px] text-slate-500 uppercase">Efficiency</div>
                     <div className={`font-mono transition-colors duration-500 theme-text ${mode === 'analyze' ? 'text-red-500' : 'text-green-400'}`}>
                        {mode === 'analyze' ? 'Low' : 'High'}
                     </div>
                  </div>
               </div>
            </div>

            {/* --- RIGHT: CONTROLS --- */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-white/[0.02]">
               
               <h2 className="text-3xl font-bold mb-4 leading-tight">
                  {mode === 'analyze' ? 'Detecting Inefficiencies.' : 'Protocol Resolved.'}
               </h2>
               <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                  {mode === 'analyze' 
                    ? 'Your infrastructure is bleeding energy. tekneofy AI has identified 12 critical optimization points.'
                    : 'Systems are running at peak efficiency. Carbon footprint minimized. Net zero trajectory locked.'}
               </p>

               {/* THE BIG SWITCH */}
               <div 
                 onClick={toggleMode}
                 className="group cursor-pointer relative w-full h-16 bg-slate-900 rounded-full border border-white/10 flex items-center p-1 overflow-hidden transition-all duration-300 hover:border-white/30"
               >
                  <div className="absolute inset-0 flex justify-between items-center px-6 text-xs font-bold uppercase tracking-widest pointer-events-none">
                     <span className="text-red-500/50">Analyze</span>
                     <span className="text-green-500/50">Resolve</span>
                  </div>

                  {/* The Slider Knob */}
                  <div 
                    className={`
                      relative z-10 w-[50%] h-full rounded-full shadow-lg flex items-center justify-center gap-2 transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275)
                      ${mode === 'analyze' 
                        ? 'translate-x-0 bg-gradient-to-r from-slate-800 to-slate-700 text-red-400 border border-red-500/30' 
                        : 'translate-x-[100%] bg-gradient-to-r from-green-600 to-emerald-500 text-white border border-green-400/30'
                      }
                    `}
                  >
                     {mode === 'analyze' ? <Icons.Alert className="w-4 h-4" /> : <Icons.Check className="w-4 h-4" />}
                     <span className="text-sm font-bold uppercase">{mode === 'analyze' ? 'Initiate' : 'Deployed'}</span>
                  </div>
               </div>

               {/* Secondary Action */}
               <div className={`mt-8 transition-opacity duration-500 ${mode === 'analyze' ? 'opacity-50 pointer-events-none blur-sm' : 'opacity-100'}`}>
                  <button className="flex items-center gap-3 text-white hover:text-green-400 transition-colors group">
                     <span className="text-sm font-medium">View Full Report</span>
                     <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
               </div>

            </div>
         </div>

         {/* Reflective Floor */}
         <div 
           className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[90%] h-20 bg-gradient-to-b from-white/10 to-transparent blur-xl opacity-30 pointer-events-none transition-colors duration-500 theme-bg"
           style={{ backgroundColor: mode === 'analyze' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(74, 222, 128, 0.1)' }} 
         />
      </div>

    </section>
  );
};

export default HeroCTA;