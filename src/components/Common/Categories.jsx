import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
    <section className="bg-white py-16 md:py-24 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Shop by Collection
          </h2>
          <div className="w-16 h-1 bg-[#800020] mx-auto rounded-full"></div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={category.link}
              className="group block cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-gray-100 mb-4 shadow-sm group-hover:shadow-md transition-shadow duration-500">
                <img 
                  src={category.image} 
                  alt={category.title} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>

              {/* Text Container */}
              <div className="text-center">
                <h3 className="text-xl font-bold font-serif mb-2 text-gray-900 group-hover:text-[#800020] transition-colors">
                  {category.title}
                </h3>
                <p className="flex items-center justify-center gap-1 text-sm font-medium text-gray-500 group-hover:text-[#800020] transition-colors">
                  Explore <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-1" />
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