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
    <section className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-sm font-bold mb-4 uppercase tracking-widest">
            <Award size={16} />
            Official Retailer
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Premium Brands at Mahalaxmi Bastralaya
          </h2>
          <p className="text-gray-600 max-w-2xl text-lg">
            We bring you the finest collections from India's and the world's most trusted fashion houses.
          </p>
        </div>

        {/* Brands Grid Layout */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {brands.map((brand) => (
            <div 
              key={brand.id}
              className="w-[120px] sm:w-[150px] md:w-[180px] h-[80px] flex items-center justify-center group"
            >
              <img 
                src={brand.logoUrl} 
                alt={`${brand.name} logo`} 
                title={brand.name}
                // The CSS below makes logos gray by default, and colorful + slightly scaled up on hover
                className="max-w-full max-h-full object-contain filter grayscale opacity-60 transition-all duration-300 ease-in-out group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 mix-blend-multiply"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PremiumBrands;