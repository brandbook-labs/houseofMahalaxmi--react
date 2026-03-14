import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code, PenTool, Cpu, Link as LinkIcon } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PARTNERS = [
  {
    name: "Brandbook Studio",
    role: "Tech & Design Partner",
    description: "The creative engine behind our digital infrastructure. Brandbook Studio bridges the gap between complex engineering and emotive design, powering our most ambitious platforms.",
    tags: ["UI/UX Design", "Full-Stack Dev", "Motion Graphics"],
    year: "SINCE 2023",
    link: "https://brandbook.studio", // Placeholder link
    status: "Active Alliance"
  }
];

const PartnersSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Reveal Animation
      gsap.fromTo(".partner-reveal",
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic Button Effect (Reused for consistency)
  const handleMagnetMove = (e) => {
    const el = e.currentTarget;
    const bound = el.getBoundingClientRect();
    const x = e.clientX - bound.left - bound.width / 2;
    const y = e.clientY - bound.top - bound.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.6, ease: "power3.out" });
  };

  const handleMagnetLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <section ref={containerRef} className="bg-[#080808] text-white py-24 lg:py-32 px-6 border-t border-white/10 selection:bg-[#34d0d0] selection:text-black">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- HEADER --- */}
        <div className="mb-20 flex flex-col lg:flex-row justify-between lg:items-end gap-6 partner-reveal">
          <div>
            <div className="flex items-center gap-3 mb-4 text-[#34d0d0]">
               <LinkIcon size={16} />
               <span className="font-mono text-sm uppercase tracking-widest">Our Ecosystem</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold uppercase tracking-tight">
              Strategic<br/>Alliances.
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-lg leading-relaxed">
            We collaborate with world-class specialists to deliver comprehensive solutions. Great work happens together.
          </p>
        </div>

        {/* --- PARTNER LIST --- */}
        <div className="flex flex-col gap-6">
          {PARTNERS.map((partner, index) => (
            <div 
              key={index} 
              className="partner-reveal group relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 lg:p-12 overflow-hidden hover:bg-white/[0.05] transition-colors duration-500"
            >
              
              {/* Background Glow Effect */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#34d0d0]/10 rounded-full blur-[80px] group-hover:bg-[#34d0d0]/20 transition-all duration-700"></div>

              <div className="relative z-10 flex flex-col lg:flex-row gap-12 justify-between">
                
                {/* Left: Info */}
                <div className="flex-1">
                  
                  {/* Meta Strip */}
                  <div className="flex items-center gap-4 mb-6 font-mono text-xs uppercase tracking-wider text-white/50">
                    <span className="flex items-center gap-2 text-[#34d0d0]">
                        <div className="w-2 h-2 rounded-full bg-[#34d0d0] animate-pulse"></div>
                        {partner.status}
                    </span>
                    <span className="w-[1px] h-3 bg-white/20"></span>
                    <span>{partner.year}</span>
                  </div>

                  {/* Title & Role */}
                  <h3 className="text-3xl lg:text-5xl font-bold uppercase tracking-tight mb-2 text-white group-hover:text-white transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-lg text-[#34d0d0] font-medium mb-8 flex items-center gap-2">
                    {partner.role}
                  </p>

                  {/* Description */}
                  <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-10">
                    {partner.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-3">
                    {partner.tags.map(tag => (
                       <span key={tag} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm uppercase tracking-wider text-white/80 hover:border-[#34d0d0]/50 transition-colors">
                         {tag}
                       </span>
                    ))}
                  </div>

                </div>

                {/* Right: Action Area */}
                <div className="flex flex-col justify-between items-start lg:items-end gap-8">
                   
                   {/* Decorative Icons */}
                   <div className="hidden lg:flex gap-4 text-white/20">
                      <Code size={32} strokeWidth={1.5} />
                      <PenTool size={32} strokeWidth={1.5} />
                      <Cpu size={32} strokeWidth={1.5} />
                   </div>

                   {/* Magnetic Button */}
                   <a 
                     href={partner.link}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-black hover:bg-[#34d0d0] hover:text-black hover:border-[#34d0d0] transition-all duration-300 group/btn"
                     onMouseMove={handleMagnetMove}
                     onMouseLeave={handleMagnetLeave}
                   >
                     <span className="uppercase font-bold tracking-wider text-sm">Visit Partner</span>
                     <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                   </a>

                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PartnersSection;