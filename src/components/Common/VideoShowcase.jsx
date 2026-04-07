import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Replace these with your actual Cloudinary video URLs
const videoGallery = [
  {
    id: 'campaign-1',
    title: "Summer Collection",
    // Ensure you use the raw video URL from your Cloudinary dashboard
    videoUrl: "https://res.cloudinary.com/db7uvwjjv/video/upload/v1775545995/IMG_4928-1_xsmewd.mp4",
    link: "/campaign/summer",
    subtitle: "Behind the scenes"
  },
  {
    id: 'campaign-2',
    title: "Bridal Elegance",
    videoUrl: "https://res.cloudinary.com/db7uvwjjv/video/upload/v1775545995/IMG_4777_jnu8km.mp4", // Replace
    link: "/campaign/bridal",
    subtitle: "A closer look"
  },
  {
    id: 'campaign-3',
    title: "Festive Wear",
    videoUrl: "https://res.cloudinary.com/db7uvwjjv/video/upload/v1775545995/IMG_5267_c9izjb.mp4", // Replace
    link: "/campaign/festive",
    subtitle: "Dazzling styles"
  },
  {
    id: 'campaign-4',
    title: "Accessories",
    videoUrl: "https://res.cloudinary.com/db7uvwjjv/video/upload/v1775545995/IMG_5258-1_ywnr0l.mp4", // Replace
    link: "/campaign/accessories",
    subtitle: "The perfect detail"
  }
];

const VideoShowcase = () => {
  return (
    <section className="relative py-24 font-sans text-gray-900 overflow-hidden min-h-[700px] flex flex-col justify-center">
      <div className="relative z-10 w-full flex flex-col items-center mb-12 px-4">
        {/* Section Heading */}
        <div className="text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#800020]/10 border border-[#800020]/20 text-[#800020] text-sm font-bold mb-4 uppercase tracking-widest">
            <PlayCircle size={14} />
            Watch Campaigns
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 drop-shadow-sm">
            Featured Videos
          </h2>
        </div>
      </div>

      {/* Grid Layout (Replaces the GSAP Scroller) */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {videoGallery.map((video, index) => (
            <div 
              key={`${video.id}-${index}`} 
              className="relative w-full max-w-[400px] h-[500px] group rounded-2xl overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
            >
              <Link to={video.link} className="block w-full h-full">
                {/* Cloudinary Video Tag */}
                <video 
                  src={video.videoUrl} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                
                {/* Gradient Overlay - Darkens on hover for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Content Block */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start translate-y-12 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-2 opacity-0 transition-opacity duration-500 delay-100 group-hover:opacity-100">
                    {video.subtitle}
                  </p>
                  <h3 className="text-3xl font-bold font-serif text-white mb-4">
                    {video.title}
                  </h3>
                  
                  {/* Action Button - Slides in on hover */}
                  <div className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-lg opacity-0 transition-all duration-500 group-hover:opacity-100 hover:bg-[#D4AF37] hover:text-white">
                    Watch Now <ArrowRight size={16} />
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

export default VideoShowcase;