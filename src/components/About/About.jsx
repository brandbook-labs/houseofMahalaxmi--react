import React, { useLayoutEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    client: "Porsche",
    title: "Taycan Configurator",
    category: "WebGL Experience",
    tags: ["3D Modeling", "React", "Commerce"],
    img: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "02",
    client: "Nike Lab",
    title: "Future of Air",
    category: "Campaign Site",
    tags: ["Motion", "Strategy", "Sound Design"],
    img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "03",
    client: "SpaceX",
    title: "Mission Control",
    category: "Dashboard UI",
    tags: ["Data Viz", "Real-time API", "UX"],
    img: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "04",
    client: "Sony Music",
    title: "Artist Portal",
    category: "Mobile App",
    tags: ["React Native", "Brand Identity"],
    img: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function CinematicReel() {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      itemsRef.current.forEach((item, index) => {
        if (!item) return;
        
        const imgContainer = item.querySelector('.img-container');
        const img = item.querySelector('img');
        const textContainer = item.querySelector('.text-container');

        // 1. Image Parallax (Image moves slower than scroll)
        gsap.fromTo(img, 
          { scale: 1.2, yPercent: -10 },
          { 
            scale: 1,
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom", // Start when item hits bottom of viewport
              end: "bottom top",   // End when item leaves top of viewport
              scrub: true,
            }
          }
        );

        // 2. Text Reveal Stagger
        gsap.fromTo(textContainer,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 75%", // Trigger when item is 75% down the screen
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // PT-32 ENSURES NAV BAR SAFETY
    <section ref={containerRef} className="relative bg-[#050505] text-white pt-32 pb-32 overflow-hidden selection:bg-indigo-500/30">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* HEADER */}
        <div className="mb-24 border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-end">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500">Selected Works</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                    Digital <span className="text-white/30">Excellence.</span>
                </h1>
            </div>
            <div className="hidden md:block text-right text-white/40 text-sm max-w-xs leading-relaxed">
                A curated selection of projects that define our standard of quality.
            </div>
        </div>

        {/* PROJECT LIST */}
        <div className="flex flex-col gap-24 md:gap-48">
            {projects.map((project, index) => {
                const isEven = index % 2 === 0;

                return (
                    <div 
                        key={project.id}
                        ref={el => itemsRef.current[index] = el}
                        className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? '' : 'md:flex-row-reverse'}`}
                    >
                        {/* 1. IMAGE SIDE */}
                        <div className="w-full md:w-3/5 group cursor-pointer">
                            <div className="img-container relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-lg">
                                <img 
                                    src={project.img} 
                                    alt={project.client} 
                                    className="w-full h-full object-cover will-change-transform"
                                />
                                {/* Overlay Interaction */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                                    <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out">
                                        <ArrowUpRight size={32} strokeWidth={1.5} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. TEXT SIDE */}
                        <div className="text-container w-full md:w-2/5 relative">
                            {/* Giant Number Background */}
                            <div className={`absolute -top-20 text-[180px] font-black leading-none text-white/[0.03] select-none pointer-events-none ${isEven ? '-left-12' : '-right-12'}`}>
                                {project.id}
                            </div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-indigo-400 uppercase tracking-widest">
                                        {project.category}
                                    </div>
                                    <div className="h-[1px] w-12 bg-white/10" />
                                </div>

                                <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight group cursor-pointer">
                                    <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out pb-1">
                                        {project.client}
                                    </span>
                                </h2>
                                <h3 className="text-xl md:text-2xl text-white/50 font-light mb-8">
                                    {project.title}
                                </h3>

                                <div className="flex flex-wrap gap-2 mb-10">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="text-xs text-white/40 font-mono">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <button className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
                                    View Case Study 
                                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-indigo-500 group-hover:border-indigo-500 transition-all duration-300">
                                        <ArrowRight size={14} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                    </div>
                                </button>
                            </div>
                        </div>

                    </div>
                );
            })}
        </div>
        
      </div>
    </section>
  );
}