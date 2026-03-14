import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Palette, Globe, Camera, Printer, 
  ArrowUpRight, CheckCircle2, Zap, Layout, 
  ArrowRight, Rocket, Box, TrendingUp, Package
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- 1. STRATEGIC BUNDLES (The "Stacks") ---
const BUNDLES = [
  {
    id: 'B01',
    title: 'The Launchpad Protocol',
    subtitle: 'For Startups',
    desc: 'Everything a new business needs to go live. Identity, Web, and Print.',
    includes: ['Brand Identity & Logo', 'High-Speed Landing Page', '100 Premium Visiting Cards'],
    price: '₹35,000',
    save: 'Save ₹5,000',
    icon: Rocket,
    color: 'text-blue-400',
    borderColor: 'group-hover:border-blue-400'
  },
  {
    id: 'B02',
    title: 'Dukan360 E-Com',
    subtitle: 'For Retailers',
    desc: 'Take your shop online. We build the store and shoot the products.',
    includes: ['E-Commerce Website', '20 Product Photoshoot', 'Social Launch Kit'],
    price: '₹39,999',
    save: 'Best Seller',
    icon: Box,
    color: 'text-[#D4E821]',
    borderColor: 'group-hover:border-[#D4E821]'
  },
  {
    id: 'B03',
    title: 'Growth Engine',
    subtitle: 'Monthly Retainer',
    desc: 'Dominance. Content creation and management in one subscription.',
    includes: ['15 Reels + Management', 'Monthly Photoshoot', 'Unlimited Graphic Assets'],
    price: '₹28,000/mo',
    save: 'High Value',
    icon: TrendingUp,
    color: 'text-purple-400',
    borderColor: 'group-hover:border-purple-400'
  }
];

// --- 2. INDIVIDUAL SERVICES (Core Capabilities) ---
const SERVICES = [
  {
    id: '01',
    title: 'Brand Identity',
    category: 'Graphics',
    desc: 'Logos, visual systems, and brand guidelines that separate you from the noise.',
    features: ['Logo Design', 'Typography', 'Social Kits', 'Brand Book'],
    icon: Palette,
    price: '₹15,000+',
  },
  {
    id: '02',
    title: 'Web Development',
    category: 'Digital',
    desc: 'High-performance websites built on React & Next.js. Fast, secure, and SEO-ready.',
    features: ['E-Commerce', 'Portals', 'Dashboards', 'Landing Pages'],
    icon: Globe,
    price: '₹25,000+',
  },
  {
    id: '03',
    title: 'Social Retainer',
    category: 'Marketing',
    desc: 'Complete social media management. We create, post, and manage your growth.',
    features: ['Daily Reels', 'Static Posts', 'Copywriting', 'Analytics'],
    icon: Zap,
    price: '₹20,000/mo',
  },
  {
    id: '04',
    title: 'Commercial Photo',
    category: 'Production',
    desc: 'Studio-grade product photography and on-location shoots for events.',
    features: ['Product Shoots', 'Event Coverage', 'Editing', 'Drone'],
    icon: Camera,
    price: '₹10,000+',
  },
  {
    id: '05',
    title: 'Large Format Print',
    category: 'Physical',
    desc: 'From flex hoardings to business cards. We design and deliver high-quality prints.',
    features: ['Hoardings', 'Visiting Cards', 'ID Cards', 'Brochures'],
    icon: Printer,
    price: 'Custom',
  },
  {
    id: '06',
    title: 'UI/UX Design',
    category: 'Product',
    desc: 'User interfaces for SaaS and Mobile Apps. Focus on usability and modern aesthetics.',
    features: ['Wireframing', 'Prototyping', 'App Design', 'Design Systems'],
    icon: Layout,
    price: '₹30,000+',
  }
];

// --- 3. WORKFLOW ---
const PROCESS = [
  { step: '01', title: 'Discovery', text: 'We analyze your market and define the core problem.' },
  { step: '02', title: 'Strategy', text: 'A roadmap is created to ensure we hit your KPIs.' },
  { step: '03', title: 'Execution', text: 'High-fidelity design and development sprints.' },
  { step: '04', title: 'Launch', text: 'Deployment, print delivery, and post-launch support.' },
];

export default function ServicesPage() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(".hero-anim", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );

      // Bundles Animation
      gsap.fromTo(".bundle-card", 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out", delay: 0.4 }
      );

      // Services Animation
      gsap.fromTo(".service-card", 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.6 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-white font-sans pt-24 pb-20 overflow-hidden">
      
      {/* === HERO SECTION === */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="hero-anim">
            <span className="text-[#D4E821] font-mono text-xs uppercase tracking-widest mb-4 block">
                /// Service_Architecture
            </span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none mb-6">
                Full-Stack <br/>
                <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>Solutions.</span>
            </h1>
            <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
                Whether you need a single asset or a complete digital ecosystem, 
                we have the infrastructure to deliver.
            </p>
        </div>
      </div>

      {/* === SECTION 1: STRATEGIC BUNDLES (The "Stacks") === */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
         <div className="flex items-end justify-between mb-8 hero-anim">
            <h2 className="text-2xl font-bold uppercase flex items-center gap-3">
               <Package className="text-[#D4E821]" /> Strategic Stacks
            </h2>
            <span className="text-xs font-mono text-gray-500 hidden md:block">Curated for maximum impact</span>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUNDLES.map((bundle) => (
               <div 
                 key={bundle.id} 
                 className={`bundle-card group relative p-8 rounded-2xl border border-white/10 bg-[#0a0a0a] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${bundle.borderColor}`}
               >
                  {/* Badge */}
                  <div className="absolute top-0 right-0 bg-[#1a1a1a] px-3 py-1 rounded-bl-xl border-l border-b border-white/10">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${bundle.color}`}>
                          {bundle.save}
                      </span>
                  </div>

                  {/* Header */}
                  <div className="mb-6">
                     <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 ${bundle.color}`}>
                        <bundle.icon size={24} />
                     </div>
                     <span className="text-xs font-mono text-gray-500 uppercase">{bundle.subtitle}</span>
                     <h3 className="text-2xl font-bold uppercase mb-2">{bundle.title}</h3>
                     <p className="text-sm text-gray-400 leading-relaxed min-h-[40px]">{bundle.desc}</p>
                  </div>

                  {/* Includes List */}
                  <div className="space-y-3 mb-8 border-t border-white/10 pt-6">
                      {bundle.includes.map((inc, i) => (
                          <div key={i} className="flex items-start gap-3">
                              <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${bundle.color}`} />
                              <span className="text-sm font-bold text-gray-300">{inc}</span>
                          </div>
                      ))}
                  </div>

                  {/* Price & CTA */}
                  <div className="mt-auto">
                      <div className="flex justify-between items-end mb-4">
                          <span className="text-xs text-gray-500 uppercase font-bold">Bundle Price</span>
                          <span className={`text-xl font-mono font-bold ${bundle.color}`}>{bundle.price}</span>
                      </div>
                      <Link 
                        to="/contact" 
                        className="w-full py-4 bg-white/5 hover:bg-white text-white hover:text-black font-bold uppercase text-sm rounded-lg flex items-center justify-center gap-2 transition-all"
                      >
                         Select Stack <ArrowUpRight size={16} />
                      </Link>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* === SECTION 2: CORE CAPABILITIES (The Grid) === */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
         <div className="flex items-end justify-between mb-8 hero-anim">
            <h2 className="text-2xl font-bold uppercase flex items-center gap-3">
               <Layout className="text-[#D4E821]" /> Core Capabilities
            </h2>
            <span className="text-xs font-mono text-gray-500 hidden md:block">A la carte services</span>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
               <div 
                 key={service.id} 
                 className="service-card group relative p-8 rounded-2xl border border-white/10 bg-[#0a0a0a] transition-all duration-300 hover:border-[#D4E821] hover:-translate-y-1 flex flex-col h-full"
               >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                     <div className="p-3 rounded-lg bg-white/5 text-gray-300 group-hover:text-[#D4E821] transition-colors">
                        <service.icon size={24} strokeWidth={1.5} />
                     </div>
                     <span className="font-mono text-xs font-bold opacity-40">
                        {service.id}
                     </span>
                  </div>

                  {/* Content */}
                  <div className="mb-6 flex-grow">
                     <h3 className="text-xl font-bold uppercase mb-2 leading-none">{service.title}</h3>
                     <p className="text-sm text-gray-400 leading-relaxed">
                        {service.desc}
                     </p>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                     {service.features.map(feat => (
                        <span key={feat} className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-white/5 text-gray-500">
                           {feat}
                        </span>
                     ))}
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-end mt-auto pt-6 border-t border-white/5">
                      <div>
                         <span className="block text-[10px] uppercase font-bold opacity-50">Starting at</span>
                         <span className="font-mono font-bold text-base text-[#D4E821]">{service.price}</span>
                      </div>
                      <Link 
                        to="/contact" 
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D4E821] hover:text-black flex items-center justify-center transition-all group-hover:rotate-45"
                      >
                         <ArrowUpRight size={16} />
                      </Link>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* === SECTION 3: WORKFLOW === */}
      <div className="bg-[#0a0a0a] border-y border-white/10 py-24">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
               <div className="hero-anim">
                  <span className="text-[#D4E821] font-mono text-xs uppercase tracking-widest mb-2 block">/// Workflow</span>
                  <h2 className="text-4xl md:text-5xl font-black uppercase">How We <span className="text-gray-600">Execute</span></h2>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               {PROCESS.map((proc) => (
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