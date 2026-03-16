import React, { useRef } from 'react';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const MahalaxmiHero = () => {
  const containerRef = useRef(null);
  const petalsRef = useRef([]);
  const diyasRef = useRef([]);

  useGSAP(() => {
    // 1. Initial Content Reveal Animation
    const tl = gsap.timeline();
    tl.from('.hero-element', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.1
    });

    // 2. Falling Flowers (Lotus Petals) Animation
    petalsRef.current.forEach((petal) => {
      if (!petal) return;
      gsap.set(petal, {
        x: `random(0, ${window.innerWidth})`,
        y: -50,
        rotation: 'random(0, 360)',
        scale: 'random(0.5, 1.2)',
        opacity: 'random(0.4, 0.9)'
      });

      gsap.to(petal, {
        y: window.innerHeight + 50,
        x: '+=random(-150, 150)',
        rotation: '+=random(180, 360)',
        duration: 'random(5, 12)',
        repeat: -1,
        ease: 'none',
        delay: 'random(0, 5)'
      });
    });

    // 3. Realistic Blinking/Flickering Diyas
    diyasRef.current.forEach((diya) => {
      if (!diya) return;
      const flame = diya.querySelector('.flame-glow');
      
      // Fast, randomized flicker to mimic real fire
      gsap.to(flame, {
        opacity: "random(0.4, 1)",
        scale: "random(0.9, 1.4)",
        duration: "random(0.1, 0.3)", // Much faster duration for a flicker
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut'
      });
    });

  }, { scope: containerRef });

  // Generate arrays for our decorative elements
  const petals = Array.from({ length: 30 }); // Slightly increased petals
  
  // Added more diyas and adjusted their positions to spread across the bottom
  const diyas = [
    { left: '4%', bottom: '15%' },
    { right: '4%', bottom: '15%' },
    { left: '16%', bottom: '8%' },
    { right: '16%', bottom: '8%' },
    { left: '28%', bottom: '3%' },
    { right: '28%', bottom: '3%' },
    { left: '42%', bottom: '1%' },
    { right: '42%', bottom: '1%' },
  ];

  return (
    <section 
      ref={containerRef}
      // Changed to min-h-screen with vertical padding so content never gets cut off
      className="relative min-h-[70vh] w-full overflow-hidden font-sans flex items-center justify-center bg-[#2A0008] py-16" 
    >
      {/* --- BACKGROUND IMAGE --- */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{ backgroundImage: "url('https://img.freepik.com/premium-photo/hindu-goddess-durga-generated-by-ai_674037-445.jpg?uid=R169025813&ga=GA1.1.744688816.1759506239&semt=ais_hybrid&w=740&q=80')" }}
      />

      {/* --- DIVINE OVERLAY GRADIENTS --- */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#4A0010]/70 to-[#800020]/95 z-0"></div>
      
      {/* Golden divine glow behind text */}
      <div className="absolute inset-0 flex justify-center items-center z-0 opacity-40 mix-blend-overlay">
        <div className="w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37] to-transparent rounded-full blur-[120px]"></div>
      </div>

      {/* --- FALLING PETALS --- */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {petals.map((_, i) => (
          <div 
            key={i}
            ref={el => petalsRef.current[i] = el}
            className="absolute top-0 left-0 text-[#FFB6C1] drop-shadow-md text-xl"
            style={{ textShadow: '0px 0px 5px rgba(255, 182, 193, 0.5)' }}
          >
            🌺
          </div>
        ))}
      </div>

      {/* --- BLINKING DIYAS --- */}
      {diyas.map((pos, i) => (
        <div 
          key={`diya-${i}`}
          ref={el => diyasRef.current[i] = el}
          className="absolute z-20 pointer-events-none flex flex-col items-center"
          style={pos}
        >
          {/* The Flame */}
          <div className="relative w-4 h-6 mb-[-8px] z-10 flex justify-center">
            <div className="absolute bottom-0 w-3 h-5 bg-yellow-400 rounded-b-full rounded-t-[100%] shadow-[0_0_15px_#FACC15]"></div>
            <div className="flame-glow absolute bottom-0 w-6 h-10 bg-orange-500 rounded-full blur-[10px] opacity-80 mix-blend-screen"></div>
          </div>
          {/* The Diya Base */}
          <div className="w-12 h-5 bg-gradient-to-b from-[#b87333] to-[#8b4513] rounded-b-full border-t-2 border-[#D4AF37] shadow-[0_5px_15px_rgba(0,0,0,0.5)]"></div>
        </div>
      ))}

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center mt-8">
        
        {/* Eyebrow Badge */}
        <div className="hero-element inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/30 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-sm font-semibold shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <Sparkles size={16} className="animate-pulse" />
          Auspicious Festive Collection
        </div>
        
        {/* Main Heading */}
        <h1 className="hero-element text-4xl sm:text-6xl md:text-7xl lg:text-6xl font-serif font-bold text-white mb-2 max-w-4xl">
          Timeless Elegance, <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF3CA] to-[#D4AF37] drop-shadow-lg">
            Woven for You.
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="hero-element text-md text-gray-200 mb-10 max-w-2xl leading-relaxed drop-shadow-md font-medium">
          Discover House of Mahalaxmi's exclusive range of handcrafted silk sarees, bridal lehengas, and premium ethnic wear designed to invoke prosperity in every celebration.
        </p>
        
        {/* Call to Action Buttons */}
        <div className="hero-element flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
          <Link 
            to="/#shop-department" 
            className="group relative overflow-hidden flex items-center justify-center gap-2 bg-gradient-to-r from-[#D4AF37] to-[#B58500] text-black px-8 py-4 rounded-md font-bold uppercase tracking-wider transition-all duration-300 w-full sm:w-auto shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.7)] hover:scale-105 border-2 border-[#D4AF37]/60"
          >
            <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            <ShoppingBag size={20} />
            Shop Now
          </Link>
          <Link 
            to="/#shop-collection"
            className="group flex items-center justify-center gap-2 bg-transparent text-white border-2 border-[#D4AF37]/60 px-8 py-4 rounded-md font-bold uppercase tracking-wider hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm hover:scale-105"
          >
            View Collections
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Trust Indicators - Adjusted margin so they stay visible */}
        <div className="hero-element mt-12 pt-8 border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-center gap-12 md:gap-24 w-full max-w-3xl">
          <div className="text-center group cursor-default">
            <p className="text-4xl font-serif font-bold text-[#D4AF37] group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">10k+</p>
            <p className="text-xs text-[#E5E7EB] uppercase tracking-[0.2em] mt-2 font-medium">Happy Customers</p>
          </div>
          <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent"></div>
          <div className="text-center group cursor-default">
            <p className="text-4xl font-serif font-bold text-[#D4AF37] group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">100%</p>
            <p className="text-xs text-[#E5E7EB] uppercase tracking-[0.2em] mt-2 font-medium">Authentic Silk</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MahalaxmiHero;