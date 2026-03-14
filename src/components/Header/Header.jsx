import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Refs for Animation
  const mobileMenuRef = useRef(null);
  const mobileLinkRefs = useRef([]);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // Toggle Body Scroll
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileOpen]);

  // --- GSAP ANIMATIONS ---
  useGSAP(() => {
    if (isMobileOpen) {
      const tl = gsap.timeline();
      
      tl.to(mobileMenuRef.current, {
        x: '0%',
        duration: 0.5,
        ease: 'power3.out',
      })
      .fromTo(mobileLinkRefs.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
        "-=0.2"
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  }, [isMobileOpen]);

  useGSAP(() => {
    if (isSearchOpen) {
      gsap.fromTo(searchContainerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const addToRefs = (el) => {
    if (el && !mobileLinkRefs.current.includes(el)) {
      mobileLinkRefs.current.push(el);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-black text-white border-b border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* --- LOGO --- */}
          <div className="flex-shrink-0 flex items-center gap-2 z-50">
             <img 
               src="/Img/Mo_Graphics_Logo_White.png" 
               alt="Logo" 
               className="h-16 w-auto object-contain" 
             />
             <span className="font-bold text-xl tracking-tight hidden">MOGRAPHICS</span>
          </div>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="hover:text-[#D4E821] transition-colors font-medium">Home</a>
            <a href="/store" className="hover:text-[#D4E821] transition-colors font-medium">Store</a>
            <a href='/works' className="hover:text-[#D4E821] transition-colors font-medium">Works</a>
        
            
            <div 
              className="relative group h-20 flex items-center"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-[#D4E821] transition-colors font-medium focus:outline-none">
                Services <ChevronDown size={16} />
              </button>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 w-64 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl p-2 transition-all duration-200 origin-top ${isServicesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <div className="flex flex-col">
                  {[
                    { title: "Social Media Plans", sub: "Monthly Graphics & Heavy", href: "/services/social" },
                    { title: "Web Development", sub: "School & Store Sites", href: "/services/web" },
                    { title: "Photography", sub: "Events & Weddings", href: "/services/photo" },
                    { title: "Printing", sub: "Flex & Branding", href: "/services/print" }
                  ].map((item, idx) => (
                    <a key={idx} href={item.href} className="block px-4 py-3 rounded-md hover:bg-white/5 hover:text-[#D4E821] transition-colors group/item">
                      <span className="block text-sm font-semibold group-hover/item:translate-x-1 transition-transform">{item.title}</span>
                      <span className="block text-xs text-gray-400 mt-0.5">{item.sub}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* <a href="/contact" className="hover:text-[#D4E821] transition-colors font-medium">Contact</a> */}
          </div>

          {/* --- RIGHT ACTIONS --- */}
          <div className="flex items-center gap-6 z-50">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`transition-colors ${isSearchOpen ? 'text-[#D4E821]' : 'text-gray-300 hover:text-white'}`}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>

            <a href="/cart" className="relative text-gray-300 hover:text-white transition-colors group">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-[#D4E821] text-black text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                0
              </span>
            </a>
            
            {/* Mobile Menu Button - FIXED: Removed conditional hiding */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileOpen(true)}
                className="text-gray-300 hover:text-white p-2"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEARCH OVERLAY --- */}
      {isSearchOpen && (
        <div 
            ref={searchContainerRef}
            className="absolute top-20 left-0 w-full bg-black/95 border-b border-white/10 p-4 shadow-2xl z-40"
        >
            <div className="max-w-7xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Search for products, services..." 
                    className="w-full bg-[#121212] border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4E821] transition-colors"
                />
            </div>
        </div>
      )}

      {/* --- MOBILE FULL SCREEN MENU --- */}
      {/* FIXED: Changed z-40 to z-[60] to ensure it covers the Navbar */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-xl h-[100dvh] w-full transform translate-x-full md:hidden flex flex-col"
        style={{ willChange: 'transform' }}
      >
        <div className="h-20 flex items-center justify-end px-4 border-b border-white/10 bg-black/40">
           <button 
                onClick={() => setIsMobileOpen(false)}
                className="p-2 text-white hover:text-[#D4E821] transition-colors"
           >
               <X size={28} />
           </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <a ref={addToRefs} href="/" className="block text-4xl font-bold text-white hover:text-[#D4E821] transition-colors">Home</a>
              <a ref={addToRefs} href="/store" className="block text-4xl font-bold text-white hover:text-[#D4E821] transition-colors">Store</a>
              <a ref={addToRefs} href="/contact" className="block text-4xl font-bold text-white hover:text-[#D4E821] transition-colors">Contact</a>
            </div>

            <div className="border-t border-white/10 my-6 w-20"></div>

            <div className="space-y-3">
               <p ref={addToRefs} className="text-[#D4E821] font-mono text-sm uppercase tracking-widest mb-4">Our Services</p>
               
               {[
                 { name: "Social Media Plans", href: "/services/social-media" },
                 { name: "Web Development", href: "/services/web-dev" },
                 { name: "Photography", href: "/services/photography" },
                 { name: "Printing & Branding", href: "/services/print" },
               ].map((service, i) => (
                  <a 
                    key={i} 
                    ref={addToRefs} 
                    href={service.href} 
                    className="flex items-center justify-between text-xl text-gray-300 hover:text-white group py-2 border-b border-white/5"
                  >
                    {service.name}
                    <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#D4E821]" />
                  </a>
               ))}
            </div>
          </div>
        </div>
        
        <div className="p-6 bg-black/40 border-t border-white/10">
            <button className="w-full bg-[#D4E821] text-black font-bold py-4 rounded-lg hover:bg-white transition-colors">
                Book a Consultation
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;