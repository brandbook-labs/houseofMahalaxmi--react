import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ChevronDown, ArrowRight, Facebook, Instagram, MessageCircle, Lock } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const mobileMenuRef = useRef(null);
  const mobileLinkRefs = useRef([]);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);

  // WhatsApp Configuration (ଆପଣଙ୍କର ପ୍ରକୃତ ନମ୍ବର ଏଠାରେ ଦେବେ)
  const whatsappNumber = "919040556123"; 
  const whatsappMessage = encodeURIComponent("Hello House of Mahalaxmi! I'm interested in your collections. Could you please help me?");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== "") {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setIsSearchOpen(false); 
        setSearchQuery(""); 
    }
  };

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileOpen]);

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
    <>
      {/* ───────────── TOP SUB-HEADER ───────────── */}
      <div className="bg-[#800020] text-white py-2 px-4 sm:px-6 lg:px-8 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Left: Social Icons */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline opacity-90">Connect with us:</span>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors" aria-label="Facebook">
                <Facebook size={14} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors" aria-label="Instagram">
                <Instagram size={14} />
              </a>
              {/* WhatsApp ଲିଙ୍କ୍ ପ୍ରି-ଫିଲ୍ଡ ମେସେଜ୍ ସହ */}
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-gray-300 transition-colors" aria-label="WhatsApp">
                <MessageCircle size={14} />
              </a>
            </div>
          </div>

          {/* Right: Admin Login Menu */}
          <div className="flex items-center">
            <button 
                onClick={() => navigate('/admin/login')}
                className="flex items-center gap-1.5 opacity-90 cursor-pointer hover:opacity-100 hover:text-white transition-opacity focus:outline-none"
            >
                <Lock size={12} />
                <span className="uppercase text-[10px] sm:text-xs">Admin Login</span>
            </button>
          </div>
          
        </div>
      </div>

      {/* ───────────── MAIN NAVBAR ───────────── */}
      <nav className="sticky top-0 z-50 w-full bg-white text-gray-900 border-b border-gray-200 font-sans shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 z-50 group">
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-gray-500 font-medium leading-none mb-1 ml-0.5">
                    House of
                  </span>
                  <span className="text-xl sm:text-2xl font-serif font-bold tracking-wide text-gray-900 leading-none">
                    MAHALAXMI<span className="text-[#800020]">.</span>
                  </span>
                </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-[#800020] transition-colors font-medium">Home</Link>
              <Link to="/department/women" className="hover:text-[#800020] transition-colors font-medium">Women</Link>
              <Link to="/department/men" className="hover:text-[#800020] transition-colors font-medium">Men</Link>
              <Link to="/department/kids" className="hover:text-[#800020] transition-colors font-medium">Kids</Link>
          
              {/* Collections Dropdown */}
              <div 
                className="relative group h-20 flex items-center"
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                <button className="flex items-center gap-1 hover:text-[#800020] transition-colors font-medium focus:outline-none">
                  Collections <ChevronDown size={16} />
                </button>

                <div className={`absolute top-full left-1/2 -translate-x-1/2 w-72 bg-white border border-gray-100 rounded-lg shadow-xl p-2 transition-all duration-200 origin-top ${isServicesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                  <div className="flex flex-col">
                    {[
                      { title: "Festive Wear", sub: "Sarees, Lehengas & Sets", href: "/collections/festive-wears" },
                      { title: "Wedding Collection", sub: "Bridal & Groom Elegance", href: "/collections/wedding-collections" },
                      { title: "Everyday Casuals", sub: "Comfortable & Stylish", href: "/collections/everyday-casuals" },
                      { title: "Accessories", sub: "Jewelry, Bags & Footwear", href: "/collections/accessories" }
                    ].map((item, idx) => (
                      <Link key={idx} to={item.href} className="block px-4 py-3 rounded-md hover:bg-gray-50 hover:text-[#800020] transition-colors group/item">
                        <span className="block text-sm font-semibold group-hover/item:translate-x-1 transition-transform">{item.title}</span>
                        <span className="block text-xs text-gray-500 mt-0.5">{item.sub}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6 z-50">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`transition-colors ${isSearchOpen ? 'text-[#800020]' : 'text-gray-700 hover:text-black'}`}
              >
                {isSearchOpen ? <X size={22} /> : <Search size={22} />}
              </button>

              <Link to="/cart" className="relative text-gray-700 hover:text-black transition-colors group">
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#800020] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              <div className="md:hidden flex items-center">
                <button onClick={() => setIsMobileOpen(true)} className="text-gray-700 hover:text-black p-2">
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
              className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 p-6 shadow-xl z-40"
          >
              <div className="max-w-4xl mx-auto relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                  <input 
                      ref={searchInputRef}
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearchSubmit}
                      placeholder="Search for sarees, dresses, kurtas... (Press Enter to search)" 
                      className="w-full bg-gray-50 border border-gray-300 rounded-full py-4 pl-14 pr-6 text-gray-900 text-lg placeholder-gray-400 focus:outline-none focus:border-[#800020] focus:ring-1 focus:ring-[#800020] transition-colors"
                  />
                  {searchQuery && (
                     <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900">
                        <X size={20} />
                     </button>
                  )}
              </div>
          </div>
        )}

        {/* --- MOBILE FULL SCREEN MENU --- */}
        <div 
          ref={mobileMenuRef}
          className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl h-[100dvh] w-full transform translate-x-full md:hidden flex flex-col"
          style={{ willChange: 'transform' }}
        >
          {/* ... (Mobile Menu UI) ... */}
          {/* ଆପଣଙ୍କ ପୁରୁଣା ମୋବାଇଲ୍ ମେନୁ କୋଡ୍ ଏଠାରେ ରହିବ */}
          <div className="h-20 flex items-center justify-end px-4 border-b border-gray-200 bg-white/50">
             <button onClick={() => setIsMobileOpen(false)} className="p-2 text-gray-900 hover:text-[#800020] transition-colors">
                 <X size={28} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <a ref={addToRefs} href="/" className="block text-4xl font-bold text-gray-900 hover:text-[#800020] transition-colors">Home</a>
                <a ref={addToRefs} href="/department/women" className="block text-4xl font-bold text-gray-900 hover:text-[#800020] transition-colors">Women</a>
                <a ref={addToRefs} href="/department/men" className="block text-4xl font-bold text-gray-900 hover:text-[#800020] transition-colors">Men</a>
              </div>

              <div className="border-t border-gray-200 my-6 w-20"></div>

              <div className="space-y-3">
                 <p ref={addToRefs} className="text-[#800020] font-mono text-sm uppercase tracking-widest mb-4">Shop By Collection</p>
                 {[
                   { name: "Festive Wear", href: "/collections/festive-wears" },
                   { name: "Wedding Collection", href: "/collections/wedding-collections" },
                   { name: "Everyday Casuals", href: "/collections/everyday-casuals" },
                   { name: "Accessories", href: "/collections/accessories" },
                 ].map((service, i) => (
                    <Link 
                      key={i} 
                      ref={addToRefs} 
                      to={service.href} 
                      className="flex items-center justify-between text-xl text-gray-600 hover:text-gray-900 group py-2 border-b border-gray-100"
                    >
                      {service.name}
                      <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#800020]" />
                    </Link>
                 ))}
              </div>
            </div>
          </div>
          
          <div className="p-6 bg-white border-t border-gray-200">
              <button 
                  onClick={() => navigate('/department/women')}
                  className="w-full bg-gray-900 text-white font-bold py-4 rounded-lg hover:bg-[#800020] transition-colors shadow-md"
              >
                  View All Products
              </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;