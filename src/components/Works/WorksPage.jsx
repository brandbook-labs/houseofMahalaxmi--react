import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  X, Play, Maximize2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import WorksHeader from './WorksHeader';

// --- DATA ---
// Note: 'aspect' is removed because the Masonry layout adapts to natural height
const WORK_ITEMS = [
  {
    id: 1,
    type: 'video',
    src: "https://res.cloudinary.com/demo/video/upload/w_900,h_900,c_fill,q_auto,vc_auto/dog.mp4", 
  },
  {
    id: 2,
    type: 'image',
    src: "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=1200&q=95",
  },
  {
    id: 3,
    type: 'image',
    src: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=95",
  },
  {
    id: 4,
    type: 'video',
    src: "https://res.cloudinary.com/demo/video/upload/w_900,h_600,c_fill,q_auto,vc_auto/handshake.mp4",
  },
  {
    id: 5,
    type: 'image',
    src: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=95",
  },
  {
    id: 6,
    type: 'image',
    src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&q=95",
  },
  {
    id: 7,
    type: 'video',
    src: "https://res.cloudinary.com/demo/video/upload/w_600,h_900,c_fill,q_auto,vc_auto/elephants.mp4",
  },
  {
    id: 8,
    type: 'image',
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=95",
  },
  {
    id: 9,
    type: 'image',
    src: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&q=95",
  },
  {
    id: 10,
    type: 'image',
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=95",
  },
  {
    id: 11,
    type: 'video',
    src: "https://res.cloudinary.com/demo/video/upload/w_900,h_900,c_fill,q_auto,vc_auto/cat.mp4",
  }
];

export default function ImmersivePortfolio() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const itemsRef = useRef([]);
  const containerRef = useRef(null);

  // --- ANIMATION ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".masonry-item", {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.2
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // --- LIGHTBOX CONTROLS ---
  const nextSlide = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % WORK_ITEMS.length);
  };
  const prevSlide = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + WORK_ITEMS.length) % WORK_ITEMS.length);
  };

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden pb-20">
      
      {/* --- HEADER --- */}
      {/* <div className="p-6 md:p-10 pb-2">
         <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Visual <span className="text-[#D4E821]">Index</span>
         </h1>
      </div> */}
      <WorksHeader />

      {/* === MASONRY LAYOUT ENGINE === 
         - 'columns-2': Creates 2 vertical columns on mobile (No gaps)
         - 'md:columns-3': 3 columns on tablet
         - 'lg:columns-4': 4 columns on desktop
         - 'gap-4': Horizontal space between columns
         - 'space-y-4': Vertical space between items in a column
      */}
      <div ref={containerRef} className="px-4 md:px-10 pb-20">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          
          {WORK_ITEMS.map((item, index) => (
            <div 
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="masonry-item relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer group bg-[#111] mb-4"
            >
              {/* CONTENT */}
              {item.type === 'video' ? (
                <div className="relative w-full">
                    <video 
                      src={item.src} 
                      autoPlay loop muted playsInline 
                      className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur rounded-full flex items-center justify-center">
                        <Play fill="white" size={12} className="text-white ml-0.5" />
                    </div>
                </div>
              ) : (
                <img 
                  src={item.src} 
                  alt="Work" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              )}
              
              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
              
              <div className="absolute bottom-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <Maximize2 size={20} className="drop-shadow-lg" />
              </div>

            </div>
          ))}

        </div>
      </div>

      {/* === LIGHTBOX (FULL SCREEN) === */}
      {lightboxIndex !== null && (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center animate-in fade-in zoom-in duration-300"
            onClick={() => setLightboxIndex(null)}
        >
            {/* Controls */}
            <button className="absolute top-6 right-6 z-50 p-2 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all">
                <X size={24} />
            </button>
            <button onClick={prevSlide} className="absolute left-4 md:left-10 z-50 p-4 text-white hover:bg-white/10 rounded-full">
                <ChevronLeft size={32} />
            </button>
            <button onClick={nextSlide} className="absolute right-4 md:right-10 z-50 p-4 text-white hover:bg-white/10 rounded-full">
                <ChevronRight size={32} />
            </button>

            {/* Media Display */}
            <div className="w-full h-full p-4 md:p-12 flex items-center justify-center pointer-events-none">
                <div className="relative max-w-full max-h-full pointer-events-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
                    {WORK_ITEMS[lightboxIndex].type === 'video' ? (
                        <video 
                            src={WORK_ITEMS[lightboxIndex].src} 
                            autoPlay loop playsInline controls
                            className="max-h-[85vh] max-w-full rounded-lg bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        />
                    ) : (
                        <img 
                            src={WORK_ITEMS[lightboxIndex].src} 
                            alt="Full Screen" 
                            className="max-h-[85vh] max-w-full rounded-lg object-contain bg-black shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                        />
                    )}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-gray-500 font-mono text-xs">
                        {lightboxIndex + 1} / {WORK_ITEMS.length}
                    </div>
                </div>
            </div>
        </div>
      )}

    </div>
  );
}