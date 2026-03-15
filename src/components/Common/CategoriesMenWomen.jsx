import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const departments = [
  {
    id: 'women',
    title: "Women's Fashion",
    // Lady wearing traditional sari
    image: "https://img.freepik.com/free-photo/portrait-young-woman-wearing-tradition-sari-garment_52683-90226.jpg?uid=R169025813&ga=GA1.1.744688816.1759506239&semt=ais_hybrid&w=740&q=80",
    link: "/department/women"
  },
  {
    id: 'men',
    title: "Men's Ethnic",
    // Men's off-white embroidered kurta
    image: "https://img.freepik.com/premium-photo/two-indian-men-wears-ethnic-traditional-cloths-male-fashion-models-with-sherwani-kurta-pyjama-sitting-posing-wing-chair-sofa-against-brown-grunge-background-selective-focus_466689-45467.jpg?",
    link: "/department/men"
  },
  {
    id: 'kids',
    title: "Kids' Wear",
    // Cute baby girl in yellow clothes
    image: "https://img.freepik.com/free-photo/happy-cute-baby-girl-fashionable-yellow-baby-clothes-posing-studio-blue-background_114579-92593.jpg?uid=R169025813&ga=GA1.1.744688816.1759506239&semt=ais_hybrid&w=740&q=80",
    link: "/department/kids"
  }
];

const ShopByDepartment = () => {
  return (
    <section className="bg-white py-16 md:py-24 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Shop by Department
          </h2>
          <div className="w-16 h-1 bg-[#800020] mx-auto rounded-full"></div>
        </div>

        {/* 3-Column Grid for perfect balance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {departments.map((dept) => (
            <Link 
              key={dept.id} 
              to={dept.link}
              className="group block cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 mb-6 shadow-sm group-hover:shadow-lg transition-shadow duration-500">
                <img 
                  src={dept.image} 
                  alt={dept.title} 
                  /* Added object-top to ensure faces are not cut off when image fills the box */
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>

              {/* Text Container */}
              <div className="text-center">
                <h3 className="text-2xl font-bold font-serif mb-2 text-gray-900 group-hover:text-[#800020] transition-colors">
                  {dept.title}
                </h3>
                <p className="flex items-center justify-center gap-1 text-sm font-medium text-gray-500 group-hover:text-[#800020] transition-colors">
                  View Collection <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-1" />
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ShopByDepartment;