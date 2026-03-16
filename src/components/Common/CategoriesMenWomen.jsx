import React, { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const baseDepartments = [
  // --- ORIGINAL DEPARTMENTS (URLs Unchanged) ---
  {
    id: 'women',
    title: "Women's Fashion",
    image: "https://media.samyakk.in/pub/media/catalog/product/c/r/crimson-red-zari-woven-banarasi-silk-saree-with-unstitched-blouse-sr27838.jpg",
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

  // --- NEW API PRODUCT TYPES (Mapped to /type/:productType) ---
  // Indian Wear
  {
    id: 'saree',
    title: "Exquisite Sarees",
    image: "https://anayadesignerstudio.com/cdn/shop/files/BridalRedSareeForKarwaChauthOnlineShopping.webp?v=1721648475",
    link: "/type/saree",
    subtitle: "Timeless Indian Grace"
  },
  {
    id: 'lehenga',
    title: "Designer Lehengas",
    image: "https://nitikagujral.com/cdn/shop/files/NitikaG07-07-2500543_1200x.jpg?v=1754627659",
    link: "/type/lehenga",
    subtitle: "Festive & Bridal"
  },
  {
    id: 'kurta',
    title: "Classic Kurtas",
    image: "https://kapdavilla.com/images/product/sub_images/2021/10/blue-hills-love-birds-vol-3-matching-ethnic-wear-men-women-kurta-set-catalogs-3-2021-10-07_18_40_03.jpeg",
    link: "/type/kurta",
    subtitle: "Everyday Comfort"
  },
  
  // Western Wear
  {
    id: 'dress',
    title: "Western Dresses",
    image: "https://westernera.com/cdn/shop/files/scalloped-embroidery-brown-long-dress-with-victorian-collar-dresses-for-women-350568.jpg?v=1747167973",
    link: "/type/dress",
    subtitle: "Chic & Modern"
  },
  {
    id: 'jacket',
    title: "Coats & Jackets",
    image: "https://assets.ajio.com/medias/sys_master/root/20250114/KCW6/67859345663dbe1c5fd5bb32/-473Wx593H-701052498-brown-MODEL.jpg",
    link: "/type/jacket",
    subtitle: "Layer up in style"
  },

  // Accessories
  {
    id: 'Jewellery',
    title: "Fine Jewellery",
    image: "https://www.giva.co/cdn/shop/articles/1-min_7c32be2b-8045-4a94-a1bb-ef3f91115a07.jpg?v=1760355237",
    link: "/type/Jewellery", // Note: Capitalized 'J' as per your API schema
    subtitle: "The perfect finish"
  },
  {
    id: 'bag',
    title: "Premium Bags",
    image: "https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/W27385s.jpg?im=Resize,width=750",
    link: "/type/bag",
    subtitle: "Carry your world"
  },
  {
    id: 'watch',
    title: "Luxury Watches",
    image: "https://globalboutique.com/wp-content/uploads/2023/05/featured-gold-watches-800x600.jpg",
    link: "/type/watch",
    subtitle: "Timeless precision"
  }
];

// Duplicate the array to create the seamless infinite scrolling illusion
// Since we have more items now, the loop will feel much more natural and expansive
const departments = [...baseDepartments, ...baseDepartments];

const ShopByDepartment = () => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useGSAP(() => {
    // Create the infinite continuous scroll
    const tl = gsap.to(scrollerRef.current, {
      xPercent: -50, // Moves exactly half the width (one full set of items)
      // Increased duration slightly because the array is much longer now
      duration: 40,  
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
                  <h3 className="text-3xl font-bold font-serif text-white">
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