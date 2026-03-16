import React, { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    id: 1,
    title: "Festive Wear",
    image: "https://img.freepik.com/free-photo/indian-couple-celebrating-propose-day-by-being-romantic-with-each-other_23-2151110950.jpg?uid=R169025813&ga=GA1.1.744688816.1759506239&semt=ais_hybrid&w=740&q=80",
    link: "/collections/festive-wears"
  },
  {
    id: 2,
    title: "Wedding Collection",
    image: "https://img.freepik.com/premium-photo/man-woman-are-walking-building-with-woman-wearing-turban_1113980-2219.jpg?uid=R169025813&ga=GA1.1.744688816.1759506239&semt=ais_hybrid&w=740&q=80",
    link: "/collections/wedding-collections"
  },
  {
    id: 3,
    title: "Everyday Casuals",
    image: "https://img.freepik.com/free-photo/love-story-indian-couple-posed-outdoor_627829-1772.jpg?uid=R169025813&ga=GA1.1.744688816.1759506239&semt=ais_hybrid&w=740&q=80",
    link: "/collections/everyday-casuals"
  },
  {
    id: 4,
    title: "Accessories",
    image: "https://img.freepik.com/free-photo/couple-winter-cloths-studio_1303-5885.jpg?uid=R169025813&ga=GA1.1.744688816.1759506239&semt=ais_hybrid&w=740&q=80",
    link: "/collections/accessories"
  }
];

const MahalaxmiCategories = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Animate the Header
    gsap.from('.section-header', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%', // Triggers when the top of the section hits 85% of the viewport height
      }
    });

    // 2. Stagger in the Category Cards
    gsap.from('.category-card', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15, // Creates that beautiful wave effect
      ease: 'back.out(1.2)', // Slight overshoot for a bouncy, premium feel
      scrollTrigger: {
        trigger: '.categories-grid',
        start: 'top 85%',
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-[#FAFAFA] py-16 md:py-24 font-sans text-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="section-header text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-xs font-bold mb-4 uppercase tracking-widest">
            <Sparkles size={14} />
            Curated For You
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-gray-900 drop-shadow-sm">
            Shop by Collection
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#800020] to-transparent mx-auto rounded-full"></div>
        </div>

        {/* 4-Column Grid */}
        <div className="categories-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={category.link}
              className="category-card group block cursor-pointer"
            >
              {/* Image Container with advanced hover states */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-200 mb-5 shadow-sm group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                
                {/* Image */}
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Inner Shadow / Vignette for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Floating Action Button (Appears on Hover) */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-[#800020] p-3 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-lg">
                  <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </div>
              </div>

              {/* Text Container */}
              <div className="text-center px-2">
                <h3 className="text-2xl font-bold font-serif mb-2 text-gray-900 group-hover:text-[#800020] transition-colors duration-300">
                  {category.title}
                </h3>
                <div className="w-0 h-[2px] bg-[#800020] mx-auto transition-all duration-500 group-hover:w-12 mb-2"></div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  Explore Now
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MahalaxmiCategories;