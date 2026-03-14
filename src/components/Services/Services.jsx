import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Palette, Globe, Camera, Printer, 
  ArrowUpRight, CheckCircle2, Zap, Layout, 
  ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- DATA ---
const SERVICES = [
  {
    id: '01',
    title: 'Brand Identity',
    category: 'Graphics',
    desc: 'Logos, visual systems, and brand guidelines that separate you from the noise.',
    features: ['Logo Design', 'Typography', 'Social Kits', 'Brand Book'],
    icon: Palette,
    price: '₹15,000+',
    highlight: false
  },
  {
    id: '02',
    title: 'Web Development',
    category: 'Digital',
    desc: 'High-performance websites built on React & Next.js. Fast, secure, and SEO-ready.',
    features: ['E-Commerce', 'Portals', 'Dashboards', 'Landing Pages'],
    icon: Globe,
    price: '₹25,000+',
    highlight: false
  },
  {
    id: '03',
    title: 'Social Retainer',
    category: 'Marketing',
    desc: 'Complete social media management. We create, post, and manage your growth.',
    features: ['Daily Reels', 'Static Posts', 'Copywriting', 'Analytics'],
    icon: Zap,
    price: '₹20,000/mo',
    highlight: true 
  },
  {
    id: '04',
    title: 'Commercial Photo',
    category: 'Production',
    desc: 'Studio-grade product photography and on-location shoots for events.',
    features: ['Product Shoots', 'Event Coverage', 'Editing', 'Drone'],
    icon: Camera,
    price: '₹10,000+',
    highlight: false
  },
  {
    id: '05',
    title: 'Large Format Print',
    category: 'Physical',
    desc: 'From flex hoardings to business cards. We design and deliver high-quality prints.',
    features: ['Hoardings', 'Visiting Cards', 'ID Cards', 'Brochures'],
    icon: Printer,
    price: 'Custom',
    highlight: false
  },
  {
    id: '06',
    title: 'UI/UX Design',
    category: 'Product',
    desc: 'User interfaces for SaaS and Mobile Apps. Focus on usability and modern aesthetics.',
    features: ['Wireframing', 'Prototyping', 'App Design', 'Design Systems'],
    icon: Layout,
    price: '₹30,000+',
    highlight: false
  }
];

const PROCESS = [
  { step: '01', title: 'Discovery', text: 'We analyze your market and define the core problem.' },
  { step: '02', title: 'Strategy', text: 'A roadmap is created to ensure we hit your KPIs.' },
  { step: '03', title: 'Execution', text: 'High-fidelity design and development sprints.' },
  { step: '04', title: 'Launch', text: 'Deployment, print delivery, and post-launch support.' },
];

export default function ServicesPage() {
  const containerRef = useRef(null);

  // useLayoutEffect prevents the "Flash of Unstyled Content" (FOUC)
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Fade Up
      gsap.fromTo(".hero-anim", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      // 2. Cards Fade Up
      gsap.fromTo(".service-card", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.2 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white font-sans pt-24 pb-20 overflow-hidden">
      
      {/* === HERO SECTION === */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="hero-anim">
            <span className="text-[#D4E821] font-mono text-xs uppercase tracking-widest mb-4 block">
                /// Capabilities_Index
            </span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-6">
                Digital <br/>
                <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>Infrastructure.</span>
            </h1>
            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
                We bridge the gap between digital products and physical branding. 
                A full-stack creative agency for modern businesses.
            </p>
        </div>
      </div>

      {/* === SERVICES GRID === */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
               <div 
                 key={service.id} 
                 className={`service-card group relative p-8 rounded-2xl border transition-all duration-300 flex flex-col h-full
                    ${service.highlight 
                       ? 'bg-[#D4E821] border-[#D4E821] text-black hover:-translate-y-2 shadow-[0_0_30px_rgba(212,232,33,0.3)]' 
                       : 'bg-[#0a0a0a] border-white/10 hover:border-[#D4E821] text-white hover:-translate-y-2 hover:shadow-2xl'}
                 `}
               >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                     <div className={`p-3 rounded-lg ${service.highlight ? 'bg-black/10' : 'bg-white/5'}`}>
                        <service.icon size={24} strokeWidth={1.5} />
                     </div>
                     <span className={`font-mono text-xs font-bold opacity-60`}>
                        {service.id}
                     </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="mb-8 flex-grow">
                     <h3 className="text-2xl font-bold uppercase mb-3 leading-none tracking-tight">{service.title}</h3>
                     <p className={`text-sm leading-relaxed ${service.highlight ? 'text-black/80' : 'text-gray-400'}`}>
                        {service.desc}
                     </p>
                  </div>

                  {/* Features (FIXED: No opacity flicker) */}
                  <div className={`space-y-2 mb-8 border-t pt-4 ${service.highlight ? 'border-black/10' : 'border-white/10'}`}>
                     {service.features.map(feat => (
                        <div key={feat} className={`flex items-center gap-2 text-xs font-mono uppercase transition-colors
                            ${service.highlight ? 'text-black/70 group-hover:text-black' : 'text-gray-500 group-hover:text-white'}
                        `}>
                           <CheckCircle2 size={12} strokeWidth={3} className={service.highlight ? 'text-black' : 'text-[#D4E821]'} />
                           <span>{feat}</span>
                        </div>
                     ))}
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-end mt-auto">
                      <div>
                         <span className="block text-[10px] uppercase font-bold opacity-60">Starting at</span>
                         <span className="font-mono font-bold text-lg">{service.price}</span>
                      </div>
                      <Link 
                        to="/contact" 
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45
                            ${service.highlight ? 'bg-black text-[#D4E821]' : 'bg-white text-black'}
                        `}
                      >
                         <ArrowUpRight size={20} />
                      </Link>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* === PROCESS SECTION === */}
      <div className="bg-[#0a0a0a] border-y border-white/10 py-24">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div className="hero-anim">
                  <span className="text-[#D4E821] font-mono text-xs uppercase tracking-widest mb-2 block">/// Workflow</span>
                  <h2 className="text-4xl md:text-5xl font-black uppercase">How We <span className="text-gray-600">Execute</span></h2>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {PROCESS.map((proc, i) => (
                  <div key={proc.step} className="service-card relative pt-6 border-t border-white/20 hover:border-[#D4E821] transition-colors group">
                     <span className="absolute -top-3 left-0 bg-[#0a0a0a] pr-4 text-gray-600 group-hover:text-[#D4E821] font-mono text-sm font-bold transition-colors">
                        {proc.step}
                     </span>
                     <h3 className="text-xl font-bold uppercase mb-3 text-white">{proc.title}</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">{proc.text}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* === CTA SECTION === */}
      <div className="max-w-7xl mx-auto px-6 py-32 text-center hero-anim">
         <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">
            Ready to <span className="text-[#D4E821]">Upgrade?</span>
         </h2>
         <p className="text-gray-400 max-w-lg mx-auto mb-10 text-lg">
            Stop waiting. Whether it's a new logo or a full-scale web platform, 
            we are ready to deploy.
         </p>
         <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
               to="/contact" 
               className="px-8 py-4 bg-[#D4E821] text-black font-bold uppercase rounded hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
               Start a Project <ArrowRight size={18} />
            </Link>
            <Link 
               to="/shop" 
               className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase rounded hover:bg-white/5 transition-colors"
            >
               Browse Assets
            </Link>
         </div>
      </div>

    </div>
  );
}