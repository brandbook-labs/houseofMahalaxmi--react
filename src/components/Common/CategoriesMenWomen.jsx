import React, { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const baseDepartments = [
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
  }
];

// Duplicate the array to create the seamless infinite scrolling illusion
const departments = [...baseDepartments, ...baseDepartments];

const ShopByDepartment = () => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useGSAP(() => {
    // Create the infinite continuous scroll
    const tl = gsap.to(scrollerRef.current, {
      xPercent: -50, // Moves exactly half the width (one full set of items)
      duration: 25,  // Adjust for faster/slower scrolling
      ease: 'none',
      repeat: -1,
    });

    // Pause the timerly animation on hover, resume on mouse leave
    const container = containerRef.current;
    
    const pauseAnimation = () => gsap.to(tl, { timeScale: 0, duration: 0.5 });
    const playAnimation = () => gsap.to(tl, { timeScale: 1, duration: 0.5 });

    container.addEventListener('mouseenter', pauseAnimation);
    container.addEventListener('mouseleave', playAnimation);

    return () => {
      container.removeEventListener('mouseenter', pauseAnimation);
      container.removeEventListener('mouseleave', playAnimation);
    };
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative py-24 font-sans text-gray-900 overflow-hidden min-h-[700px] flex flex-col justify-center"
    >
      <div className="relative z-10 w-full flex flex-col items-center mb-12 px-4">
        {/* Section Heading */}
        <div className="text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-sm font-bold mb-4 uppercase tracking-widest">
            <Sparkles size={14} />
            Explore Collections
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 drop-shadow-sm">
            Shop by Department
          </h2>
        </div>
      </div>

      {/* Infinite Scroller Track */}
      <div className="w-full overflow-x-hidden cursor-grab active:cursor-grabbing">
        <div 
          ref={scrollerRef} 
          className="flex gap-6 px-3 w-max"
        >
          {departments.map((dept, index) => (
            <div 
              key={`${dept.id}-${index}`} 
              className="relative w-[300px] sm:w-[350px] md:w-[400px] h-[500px] flex-shrink-0 group rounded-2xl overflow-hidden shadow-xs transition-all duration-500 hover:shadow-md hover:-translate-y-2"
            >
              <Link to={dept.link} className="block w-full h-full">
                {/* Background Image */}
                <img 
                  src={dept.image} 
                  alt={dept.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay - Darkens on hover for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content Block */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                    {dept.subtitle}
                  </p>
                  <h3 className="text-3xl font-bold font-serif mb-6 text-white">
                    {dept.title}
                  </h3>
                  
                  {/* Action Button - Slides in on hover */}
                  <div className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-lg opacity-0 transition-all duration-500 hover:bg-[#D4AF37] hover:text-white">
                    View Collection <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByDepartment;