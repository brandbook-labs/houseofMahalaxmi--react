import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Added two more items to make the carousel spin beautifully
const departments = [
  {
    id: 'women',
    title: "Women's Fashion",
    image: "https://img.freepik.com/free-photo/portrait-young-woman-wearing-tradition-sari-garment_52683-90226.jpg?uid=R169025813&ga=GA1.1.744688816.1759506239&semt=ais_hybrid&w=740&q=80",
    link: "/department/women",
    subtitle: "Elegance in every thread"
  },
  {
    id: 'men',
    title: "Men's Ethnic",
    image: "https://img.freepik.com/premium-photo/two-indian-men-wears-ethnic-traditional-cloths-male-fashion-models-with-sherwani-kurta-pyjama-sitting-posing-wing-chair-sofa-against-brown-grunge-background-selective-focus_466689-45467.jpg?",
    link: "/department/men",
    subtitle: "Regal and refined"
  },
  {
    id: 'kids',
    title: "Kids' Wear",
    image: "https://img.freepik.com/free-photo/happy-cute-baby-girl-fashionable-yellow-baby-clothes-posing-studio-blue-background_114579-92593.jpg?uid=R169025813&ga=GA1.1.744688816.1759506239&semt=ais_hybrid&w=740&q=80",
    link: "/department/kids",
    subtitle: "Joyful traditional styles"
  },
  {
    id: 'bridal',
    title: "Bridal Couture",
    image: "https://img.freepik.com/free-photo/beautiful-indian-bride-traditional-sari_23-2149731174.jpg?uid=R169025813&ga=GA1.1.744688816.1759506239&semt=ais_hybrid&w=740&q=80",
    link: "/type/bridal",
    subtitle: "For your auspicious day"
  },
  {
    id: 'jewellery',
    title: "Temple Jewellery",
    image: "https://img.freepik.com/free-photo/luxury-gold-jewelry-macro-shot_1150-5471.jpg?uid=R169025813&ga=GA1.1.744688816.1759506239&semt=ais_hybrid&w=740&q=80",
    link: "/type/jewellery",
    subtitle: "Divine craftsmanship"
  }
];

const ShopByDepartment = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRef = useRef(null);

  const handleNext = () => {
    setActiveIdx((prev) => (prev === departments.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? departments.length - 1 : prev - 1));
  };

  useGSAP(() => {
    // 1. Animate the dynamic blurred background image
    gsap.to(bgRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        bgRef.current.style.backgroundImage = `url(${departments[activeIdx].image})`;
        gsap.to(bgRef.current, { opacity: 0.15, duration: 0.6, ease: 'power2.inOut' });
      }
    });

    // 2. Animate the Cards (Coverflow Effect)
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      // Calculate relative position with wrapping logic
      let offset = index - activeIdx;
      if (offset < -2) offset += departments.length;
      if (offset > 2) offset -= departments.length;

      const isCenter = offset === 0;
      const isVisible = Math.abs(offset) <= 1; // Only show center and immediate neighbors

      gsap.to(card, {
        x: `${offset * 110}%`,
        scale: isCenter ? 1 : 0.75,
        opacity: isCenter ? 1 : (isVisible ? 0.4 : 0),
        zIndex: isCenter ? 20 : 10,
        rotateY: isCenter ? 0 : offset * -15,
        filter: isCenter ? 'blur(0px)' : 'blur(4px)',
        duration: 0.8,
        ease: 'power3.out'
      });

      // Animate the text and overlay inside the card
      const overlay = card.querySelector('.card-overlay');
      const textBlock = card.querySelector('.card-text');
      
      gsap.to(overlay, {
        opacity: isCenter ? 0.2 : 0.7,
        duration: 0.8
      });

      gsap.to(textBlock, {
        y: isCenter ? 0 : 30,
        opacity: isCenter ? 1 : 0,
        duration: 0.6,
        delay: isCenter ? 0.2 : 0,
        ease: 'power2.out'
      });
    });
  }, { scope: containerRef, dependencies: [activeIdx] });

  return (
    <section 
      ref={containerRef} 
      className="relative py-24 font-sans text-gray-900 overflow-hidden bg-white min-h-[800px] flex flex-col justify-center"
    >
      {/* Dynamic Blurred Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center z-0 filter blur-3xl scale-110 transition-transform duration-1000"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full h-full flex flex-col items-center">
        
        {/* Section Heading */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-sm font-bold mb-4 uppercase tracking-widest">
            <Sparkles size={14} />
            Explore
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900 drop-shadow-sm">
            Shop by Department
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#800020] to-transparent mx-auto rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1200px]">
          
          {departments.map((dept, index) => (
            <div
              key={dept.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute w-full max-w-sm md:max-w-md h-full cursor-pointer will-change-transform"
              onClick={() => setActiveIdx(index)}
            >
              <Link to={dept.link} className="block w-full h-full relative group rounded-2xl overflow-hidden shadow-2xl">
                {/* Image */}
                <img 
                  src={dept.image} 
                  alt={dept.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Dark Overlay for contrast */}
                <div className="card-overlay absolute inset-0 bg-black pointer-events-none"></div>
                
                {/* Text Content */}
                <div className="card-text absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col items-center text-center">
                  <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2">
                    {dept.subtitle}
                  </p>
                  <h3 className="text-3xl font-bold font-serif mb-4 text-white">
                    {dept.title}
                  </h3>
                  <div className="flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-[#D4AF37] hover:text-white transition-colors text-sm shadow-lg">
                    View Collection <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </div>
          ))}

        </div>

        {/* Navigation Controls */}
        <div className="mt-12 flex items-center gap-6 z-20">
          <button 
            onClick={handlePrev}
            className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          
          {/* Pagination Dots */}
          <div className="flex gap-3">
            {departments.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`transition-all duration-500 rounded-full ${
                  activeIdx === i ? 'w-8 h-2 bg-[#800020]' : 'w-2 h-2 bg-gray-300 hover:bg-[#800020]/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ShopByDepartment;