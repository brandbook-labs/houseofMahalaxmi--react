import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Share2, Monitor, Camera, Printer } from 'lucide-react';

// --- DATA ---
const services = [
  {
    id: '01',
    category: 'RETAINER',
    title: 'Social Media Plans',
    description: 'Dominate the feed. From consistent posting to high-volume visual campaigns, we keep your brand top-of-mind algorithmically.',
    tags: ['Monthly Graphics', 'Strategy', 'Reels'],
    icon: Share2,
    img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '02',
    category: 'DEVELOPMENT',
    title: 'Web Development',
    description: 'Robust digital infrastructure. We build "Dukan" e-commerce stores for retailers and comprehensive portals for Schools & Colleges.',
    tags: ['E-Commerce', 'Portals', 'React/Next.js'],
    icon: Monitor,
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '03',
    category: 'PRODUCTION',
    title: 'Pro Photography',
    description: 'High-fidelity reality. Studio-grade Product Photography for your store and coverage for large-scale Weddings & Corporate Events.',
    tags: ['Product', 'Events', 'Retouching'],
    icon: Camera,
    img: 'https://images.unsplash.com/photo-1554048612-387768052bf7?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '04',
    category: 'PHYSICAL',
    title: 'Print & Branding',
    description: 'Bridging digital & physical. High-impact Flex Prints for outdoor ads and secure, professional ID Card systems.',
    tags: ['Flex', 'ID Systems', 'Merch'],
    icon: Printer,
    img: 'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function ServicesInteractive() {
  const [activeService, setActiveService] = useState(0);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  // Helper to safely render the active icon
  const ActiveIcon = services[activeService].icon;

  // Animation when active service changes (Desktop Only)
  useEffect(() => {
    // Only run GSAP context if we are likely on desktop (visual check) 
    // or simply let it run as it targets refs that only exist in the desktop block
    const ctx = gsap.context(() => {
      // 1. Image Slide/Fade Effect
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
            { scale: 1.1, filter: "blur(10px)" },
            { scale: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out", overwrite: true }
        );
      }
      // 2. Flash Overlay Effect
      if (overlayRef.current) {
        gsap.fromTo(overlayRef.current,
            { opacity: 0.2 },
            { opacity: 0, duration: 0.4, ease: "power2.out", overwrite: true }
        );
      }
      // 3. Text Content Fade Up
      if (contentRef.current) {
         gsap.fromTo(contentRef.current.children, 
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out", overwrite: true }
         );
      }
    });
    return () => ctx.revert();
  }, [activeService]);

  return (
    // Reduced padding on mobile (py-12 vs py-24)
    <section className="relative bg-[#050505] text-white py-12 lg:py-24 border-b border-white/10">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* === HEADER (Responsive Text Sizes) === */}
        <div className="mb-8 lg:mb-16">
            <span className="text-[#D4E821] font-mono text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-4 block">
                /// Service_Menu
            </span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight leading-none">
                Our <span className="text-gray-600">Expertise</span>
            </h2>
        </div>

        {/* ========================================= */}
        {/* === MOBILE LAYOUT (Grid of Cards) === */}
        {/* ========================================= */}
        <div className="lg:hidden flex flex-col gap-6">
            {services.map((service) => {
                const Icon = service.icon;
                return (
                    <div key={service.id} className="bg-[#111] border border-white/10 rounded-xl overflow-hidden group">
                        {/* Image Area - Always Visible */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <img 
                                src={service.img} 
                                alt={service.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Category Badge */}
                            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded border border-white/10">
                                <span className="text-[#D4E821] font-mono text-[10px] uppercase tracking-widest">
                                    {service.category}
                                </span>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-bold uppercase leading-tight">{service.title}</h3>
                                <Icon size={20} className="text-[#D4E821]" />
                            </div>
                            
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                {service.description}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {service.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-bold uppercase bg-white/5 text-gray-300 px-2 py-1 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>


        {/* ================================================= */}
        {/* === DESKTOP LAYOUT (Split List + Sticky) === */}
        {/* ================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-24 items-start">
            
            {/* LEFT COLUMN: LIST */}
            <div className="col-span-7 flex flex-col justify-center z-10">
                <div className="flex flex-col">
                    {services.map((service, index) => (
                    <div 
                        key={service.id}
                        onMouseEnter={() => setActiveService(index)}
                        onClick={() => setActiveService(index)}
                        className={`group relative py-12 border-t border-white/10 cursor-pointer transition-all duration-300 ${index === services.length - 1 ? 'border-b' : ''}`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <span className={`font-mono text-xs transition-colors duration-300 ${activeService === index ? 'text-[#D4E821]' : 'text-gray-600'}`}>
                                        {service.id}
                                    </span>
                                    <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border transition-colors duration-300 ${activeService === index ? 'border-[#D4E821] text-[#D4E821]' : 'border-white/10 text-gray-500'}`}>
                                        {service.category}
                                    </span>
                                </div>
                                <h3 className={`text-4xl font-bold uppercase transition-all duration-300 ${activeService === index ? 'text-white translate-x-4' : 'text-gray-400 group-hover:text-white'}`}>
                                    {service.title}
                                </h3>
                            </div>
                            <div className={`transition-transform duration-300 ${activeService === index ? 'rotate-45 text-[#D4E821]' : 'text-gray-600'}`}>
                                <ArrowUpRight size={32} />
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* RIGHT COLUMN: STICKY PREVIEW */}
            <div className="col-span-5 sticky top-32 h-[600px]">
                <div className="w-full h-full">
                    <div className="relative w-full h-full rounded-none overflow-hidden border border-white/20 bg-[#111]">
                        <img 
                            ref={imageRef}
                            src={services[activeService].img} 
                            alt="Service Preview" 
                            className="w-full h-full object-cover opacity-60" 
                        />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                        <div ref={overlayRef} className="absolute inset-0 bg-[#D4E821] mix-blend-multiply pointer-events-none"></div>

                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/90 to-transparent">
                            <div ref={contentRef}>
                                <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-4">
                                    <div>
                                        <p className="text-[#D4E821] font-mono text-xs mb-1">/// SYSTEM_PREVIEW</p>
                                        <h4 className="text-3xl font-bold uppercase leading-none">{services[activeService].title}</h4>
                                    </div>
                                    <ActiveIcon size={32} className="text-[#D4E821]" />
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-xs">
                                    {services[activeService].description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {services[activeService].tags.map(tag => (
                                        <span key={tag} className="text-[10px] uppercase font-bold border border-white/20 text-gray-300 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#D4E821]"></div>
                        <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#D4E821]"></div>
                    </div>
                    <div className="absolute -inset-4 bg-[#D4E821] rounded-full blur-[100px] opacity-10 z-[-1]"></div>
                </div>
            </div>

        </div>

      </div>
    </section>
  );
}