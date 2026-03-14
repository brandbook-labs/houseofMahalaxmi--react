import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ShoppingBag, Star, Zap, MapPin } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const btnRef = useRef(null);
  const [location, setLocation] = useState('Odisha'); // Default location

  // --- 1. DYNAMIC LOCATION FETCH ---
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.city && data.region_code === 'OR') {
          setLocation(data.city);
        }
      })
      .catch(err => console.log('Location default to Odisha'));
  }, []);

  // --- 2. MOUSE TILT EFFECT ---
  const handleCardMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; 
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleCardLeave = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5 });
  };

  // --- 3. MAGNETIC BUTTON ---
  const handleBtnMove = (e) => {
    if (window.innerWidth < 640) return; 
    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.3 });
  };

  const handleBtnLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.3 });
  };

  // --- 4. ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(".reveal-text", 
        { y: "100%" },
        { y: "0%", duration: 1.5, stagger: 0.1 }
      )
      .fromTo(".fade-in",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1 },
        "-=1.0"
      )
      .fromTo(cardRef.current,
        { opacity: 0, rotateY: -30, x: 100 },
        { opacity: 1, rotateY: 0, x: 0, duration: 1.5 },
        "-=1.2"
      );

      gsap.to(".floating-blob", {
        y: "20%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // SEO Keywords for Marquee
  const keywords = ["Wedding Photography", "Flex Printing", "3D Assets", "Video Editing", "Graphic Design", "Brand Identity", "Cinematography", "Web Development"];

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[90vh] bg-[#050505] text-white font-sans overflow-hidden flex items-center selection:bg-[#D4E821] selection:text-black"
    >
      
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"></div>
      <div className="floating-blob absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#D4E821] rounded-full mix-blend-screen opacity-[0.06] blur-[80px] sm:blur-[120px] pointer-events-none"></div>
      <div className="floating-blob absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500 rounded-full mix-blend-screen opacity-[0.05] blur-[80px] sm:blur-[120px] pointer-events-none" style={{ animationDelay: '-4s' }}></div>

      <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 items-center pb-20 lg:pb-0">
        
        {/* === LEFT: CONTENT === */}
        <div className="flex flex-col justify-center max-w-xl w-full">
          
          {/* Location Badge */}
          <div className="fade-in mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 w-fit hover:bg-white/10 transition-colors cursor-default">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4E821] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4E821]"></span>
              </span>
             <span className="text-xs text-gray-300 font-medium tracking-wide flex items-center gap-1">
                <MapPin size={12} className="text-[#D4E821]" />
                Serving {location}
             </span>
          </div>

          {/* SEO OPTIMIZED H1 */}
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1] mb-6 overflow-hidden">
            <div className="overflow-hidden"><span className="reveal-text block">Capture Life,</span></div>
            <div className="overflow-hidden">
              <span className="reveal-text block text-transparent bg-clip-text bg-gradient-to-r from-[#D4E821] to-white/60">
                Print Dreams.
              </span>
            </div>
          </h1>

          <p className="fade-in text-lg text-gray-400 mb-10 leading-relaxed max-w-md">
            Odisha's premium destination for <strong>Wedding Photography</strong>, <strong>Cinematography</strong>, and High-Quality <strong>Flex Printing</strong>. Based in Bhubaneswar, Bhadrak and creating everywhere.
          </p>

          {/* Buttons */}
          <div className="fade-in flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
            <div 
                ref={btnRef}
                onMouseMove={handleBtnMove}
                onMouseLeave={handleBtnLeave}
                className="relative group w-full sm:w-auto"
            >
                <a href="/shop" className="relative flex justify-center items-center gap-2 overflow-hidden rounded-lg bg-[#D4E821] px-8 py-4 text-black font-bold transition-transform active:scale-95 w-full sm:w-auto">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                  <ShoppingBag size={20} />
                  <span>Order Print</span>
                </a>
            </div>

            <a href="/services" className="group flex justify-center items-center gap-2 px-6 py-4 text-white font-medium hover:text-[#D4E821] transition-colors border border-white/10 sm:border-transparent rounded-lg sm:rounded-none w-full sm:w-auto">
              <span>View Portfolio</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="fade-in mt-12 pt-8 border-t border-white/10 flex items-center gap-8">
             <div>
                <p className="text-2xl font-bold text-white">500+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Weddings</p>
             </div>
             <div className="w-px h-8 bg-white/10"></div>
             <div>
                <p className="text-2xl font-bold text-white">4.9/5</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Google Rating</p>
             </div>
          </div>

        </div>

        {/* === RIGHT: 3D CARD === */}
        <div className="relative hidden lg:flex justify-end perspective-[2000px]">
           <div 
             className="relative z-10 perspective-[2000px]"
             onMouseMove={handleCardMove}
             onMouseLeave={handleCardLeave}
           >
              <div 
                ref={cardRef}
                className="relative w-[400px] aspect-[4/5] rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl overflow-hidden group [transform-style:preserve-3d]"
              >
                 <div className="absolute inset-0 z-0">
                    <img 
                       src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" 
                       alt="Mo Graphics Work" 
                       className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-500 scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
                 </div>

                 {/* Floating Elements (Fixed Z-Index Translation) */}
                 <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10 [transform:translateZ(20px)]">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-lg">
                        <Zap size={20} className="text-[#D4E821]" />
                    </div>
                    <div className="bg-[#D4E821] text-black text-xs font-bold px-3 py-1.5 rounded-full">LIVE</div>
                 </div>

                 <div className="absolute bottom-0 left-0 w-full p-8 z-20 [transform:translateZ(40px)]">
                    <h3 className="text-3xl font-bold text-white mb-2 leading-tight">Mo Graphics <br/>Studio</h3>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex -space-x-2">
                             {[1,2,3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-gray-800 bg-cover" style={{backgroundImage: `url(https://i.pravatar.cc/100?img=${i+10})`}}></div>
                             ))}
                        </div>
                        <div className="flex items-center gap-1 text-[#D4E821]">
                             <Star size={16} fill="currentColor" />
                             <span className="font-bold">4.9</span>
                        </div>
                    </div>
                 </div>
              </div>
              <div className="absolute top-4 -right-4 w-full h-full rounded-2xl border border-white/5 bg-white/5 -z-10"></div>
           </div>
        </div>

      </div>
      
      {/* --- CSS MARQUEE (FIXED) --- */}
      <div className="absolute bottom-0 w-full border-t border-white/5 bg-black/50 backdrop-blur-sm py-4 overflow-hidden flex z-20">
          <div className="flex gap-16 whitespace-nowrap min-w-full px-8 opacity-40 grayscale" 
               style={{ animation: 'marquee 30s linear infinite' }}>
               
               {/* Set 1 */}
               {keywords.map((word, i) => (
                  <span key={i} className="text-lg font-bold font-mono">{word}</span>
               ))}
               {/* Set 2 */}
               {keywords.map((word, i) => (
                  <span key={`dup-${i}`} className="text-lg font-bold font-mono">{word}</span>
               ))}
          </div>
      </div>

      {/* INJECTED STYLES FOR MARQUEE */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}