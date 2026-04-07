import React from 'react';
import { Award } from 'lucide-react';

const brands = [
  { 
    id: 'crimsoune-club', 
    name: "Crimsoune Club", 
    logoUrl: "https://mir-s3-cdn-cf.behance.net/projects/404/ec227c87170243.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png" 
  },
  { 
    id: 'killer', 
    name: "Killer", 
    logoUrl: "https://nextgalleriamalls.com/galleriapunjagutta/wp-content/uploads/2023/01/Killer.jpg" 
  },
  { 
    id: 'turtle', 
    name: "Turtle", 
    logoUrl: "https://i.pinimg.com/474x/bd/7f/54/bd7f54fc012f2f3a2415bab40023741d.jpg" 
  },
  { 
    id: 'twills', 
    name: "Twills", 
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzTL0hGRCZmQ_fHFY025Zrluwjo0xrm3X-ag&s" 
  },
  { 
    id: 'us-polo-assn', 
    name: "U.S. Polo Assn.", 
    logoUrl: "https://images.seeklogo.com/logo-png/18/2/us-polo-assn-logo-png_seeklogo-188407.png" 
  },
  { 
    id: 'van-heusen', 
    name: "Van Heusen", 
    logoUrl: "https://i.pinimg.com/474x/49/cf/03/49cf035d58c92c4076e34ee3caed1e23.jpg" 
  },
  { 
    id: 'jockey', 
    name: "Jockey", 
    logoUrl: "https://1000logos.net/wp-content/uploads/2020/07/Jockey-Logo.png" 
  },
  { 
    id: 'spykar', 
    name: "Spykar", 
    logoUrl: "https://dtbtob4osa700.cloudfront.net/BrandsImages/14112022150039336_brlo.jpg" 
  },
  { 
    id: 'citrus', 
    name: "Citrus", 
    logoUrl: "https://citrusclothing.in/img/logo.png" 
  }
];

const PremiumBrands = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Subtle Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[#800020]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="relative container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#800020]/10 text-[#800020] text-sm font-bold mb-6 uppercase tracking-widest shadow-sm">
            <Award size={16} />
            Official Retailer
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 tracking-tight">
            Curated Excellence
          </h2>
          <p className="text-gray-500 max-w-2xl text-lg md:text-xl font-light">
            Discover the finest collections from India's and the world's most trusted fashion houses at <span className="font-semibold text-gray-900">Mahalaxmi Bastralaya</span>.
          </p>
        </div>

        {/* Structured Grid Layout */}
        {/* Uses a 2-col grid on mobile, and a perfect 3x3 grid on medium/large screens */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto">
          {brands.map((brand) => (
            <div 
              key={brand.id}
              className="group relative flex items-center justify-center p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all duration-500 ease-out hover:shadow-xl hover:border-[#800020]/20 hover:-translate-y-1 aspect-[3/2] overflow-hidden"
            >
              {/* Internal subtle glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#800020]/0 to-[#800020]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <img 
                src={brand.logoUrl} 
                alt={`${brand.name} logo`} 
                title={brand.name}
                // mix-blend-multiply is kept because it magically removes white backgrounds from JPEGs when placed on a white card
                className="relative z-10 max-w-full max-h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 mix-blend-multiply opacity-80 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PremiumBrands;