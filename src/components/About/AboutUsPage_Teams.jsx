import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LEADERS = [
  {
    name: "Alex Morgan",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Sarah Jenkins",
    role: "Chief Creative Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "David Chen",
    role: "Head of Strategy",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Elena Rodriguez",
    role: "Technical Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
    linkedin: "#",
    twitter: "#"
  }
];

const LeadershipTeam = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Title Animation
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          }
        }
      );

      // 2. Cards Stagger Animation
      gsap.fromTo(".leader-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-[#080808] text-white py-24 lg:py-32 px-6 border-t border-white/10 selection:bg-[#D4E821] selection:text-black">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- SECTION HEADER --- */}
        <div ref={titleRef} className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <span className="text-[#D4E821] font-mono text-sm uppercase tracking-widest mb-4 block">• Leadership</span>
            <h2 className="text-4xl lg:text-6xl font-bold uppercase tracking-tight leading-none">
              Meet The<br/>Visionaries
            </h2>
          </div>
          <p className="text-white/60 max-w-md text-lg leading-relaxed text-right md:text-left">
            The minds behind the magic. A diverse team of experts united by a passion for digital excellence.
          </p>
        </div>

        {/* --- GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {LEADERS.map((leader, index) => (
            <div key={index} className="leader-card group relative cursor-pointer">
              
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-[#111] mb-6">
                
                {/* Image */}
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  className="w-full h-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />

                {/* Overlay (Gradient on Hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Social Links (Slide Up Reveal) */}
                <div className="absolute bottom-0 left-0 w-full p-6 flex items-center gap-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                   <a href={leader.linkedin} className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#D4E821] transition-colors">
                      <Linkedin size={18} />
                   </a>
                   <a href={leader.twitter} className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center hover:bg-[#D4E821] transition-colors">
                      <Twitter size={18} />
                   </a>
                </div>
              </div>

              {/* Text Info */}
              <div className="flex justify-between items-start border-b border-white/10 pb-4 group-hover:border-white/40 transition-colors duration-500">
                <div>
                  <h3 className="text-xl font-bold uppercase tracking-wide mb-1 group-hover:text-[#D4E821] transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-white/50 font-mono text-xs uppercase tracking-wider">
                    {leader.role}
                  </p>
                </div>
                
                {/* Arrow Icon */}
                <div className="text-white/30 group-hover:text-[#D4E821] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300">
                  <ArrowUpRight size={20} />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LeadershipTeam;