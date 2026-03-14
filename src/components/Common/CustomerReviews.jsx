import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Star, CheckCircle2, ArrowUpRight, MessageSquareQuote } from 'lucide-react';

// --- MOCK GOOGLE REVIEW DATA ---
const REVIEWS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Campaign Manager, BJP",
    text: "Brandbook Studio handled our entire election campaign graphics. The turnaround time during the polls was insane. Highly recommended for political branding.",
    rating: 5,
    date: "2 weeks ago",
    service: "Campaign Mgmt"
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "UI Designer, UK",
    text: "Downloaded the Glassmorphism 3D pack. The topology is clean and the Blender files are organized perfectly. Saved me hours on my fintech project.",
    rating: 5,
    date: "1 month ago",
    service: "3D Assets"
  },
  {
    id: 3,
    name: "Amit Abhijeet",
    role: "Principal, DAV School",
    text: "They built our school website and admission portal. Very professional team. The site is fast and parents find it easy to use.",
    rating: 5,
    date: "3 months ago",
    service: "Web Dev"
  },
  {
    id: 4,
    name: "Sneha Das",
    role: "Marketing Head",
    text: "We use their 'Heavy' social media retainer. The quality of reels and static posts has doubled our engagement in just 2 months.",
    rating: 4,
    date: "1 week ago",
    service: "Social Media"
  },
  {
    id: 5,
    name: "Prakash Mohanty",
    role: "Business Owner",
    text: "Best place in Bhubaneswar for flex printing. The colors are vibrant and they delivered 500 banners overnight.",
    rating: 5,
    date: "2 days ago",
    service: "Printing"
  },
  {
    id: 6,
    name: "Mike T.",
    role: "Freelancer",
    text: "The SaaS UI Kit is a game changer. Worth every penny. I customized it for a client and they loved it.",
    rating: 5,
    date: "3 weeks ago",
    service: "UI Kit"
  }
];

export default function GoogleReviews() {
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);

  // Infinite Scroll Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Top Row (Moves Left)
      gsap.to(topRowRef.current, {
        xPercent: -50,
        repeat: -1,
        duration: 40,
        ease: "linear",
      });

      // Bottom Row (Moves Right)
      gsap.fromTo(bottomRowRef.current, 
        { xPercent: -50 },
        { xPercent: 0, repeat: -1, duration: 40, ease: "linear" }
      );

    });
    return () => ctx.revert();
  }, []);

  return (
    // ADJUSTED: Reduced vertical padding on mobile (py-12 vs py-24)
    <section className="bg-[#050505] py-12 md:py-24 border-b border-white/10 overflow-hidden relative">
      
      {/* --- HEADER: AGGREGATE STATS --- */}
      {/* ADJUSTED: mb-10 for mobile, gap-6 for tighter layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-10 md:mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-8">
         
         <div>
            <div className="flex items-center gap-2 text-[#D4E821] font-mono text-[10px] md:text-xs uppercase tracking-widest mb-2 md:mb-4">
               <MessageSquareQuote size={14} />
               Social Proof
            </div>
            {/* ADJUSTED: Font size scaled down for mobile to prevent overflow */}
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight leading-none text-white">
               Client <span className="text-gray-600">Feedback</span>
            </h2>
         </div>

         {/* Google Badge */}
         {/* ADJUSTED: Full width on mobile, auto on desktop */}
         <div className="w-full md:w-auto bg-[#0a0a0a] border border-white/10 rounded-xl p-3 md:p-4 flex items-center justify-between md:justify-start gap-4 md:gap-6">
            <div className="flex flex-col">
               <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl md:text-3xl font-bold text-white">4.9</span>
                  <div className="flex text-[#ffb400]">
                     {[1,2,3,4,5].map(i => <Star key={i} size={14} className="md:w-4 md:h-4" fill="currentColor" />)}
                  </div>
               </div>
               <span className="text-[10px] md:text-xs text-gray-500 font-mono">Based on 120+ Google Reviews</span>
            </div>
            {/* Google Logo SVG */}
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0">
               <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
               </svg>
            </div>
         </div>
      </div>

      {/* --- SCROLLING REVIEWS --- */}
      {/* ADJUSTED: Gap reduced slightly for mobile */}
      <div className="flex flex-col gap-6 md:gap-8 relative">
         
         {/* Fade Gradients - Reduced width on mobile to show more content */}
         <div className="absolute left-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
         <div className="absolute right-0 top-0 bottom-0 w-8 md:w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

         {/* Row 1 */}
         <div 
            className="flex w-max hover:[animation-play-state:paused]" 
            ref={topRowRef}
            onMouseEnter={() => gsap.to(topRowRef.current, { timeScale: 0, duration: 0.5 })}
            onMouseLeave={() => gsap.to(topRowRef.current, { timeScale: 1, duration: 0.5 })}
         >
            {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, i) => (
               <ReviewCard key={`top-${i}`} review={review} />
            ))}
         </div>

         {/* Row 2 */}
         <div 
            className="flex w-max hover:[animation-play-state:paused]" 
            ref={bottomRowRef}
            onMouseEnter={() => gsap.to(bottomRowRef.current, { timeScale: 0, duration: 0.5 })}
            onMouseLeave={() => gsap.to(bottomRowRef.current, { timeScale: 1, duration: 0.5 })}
         >
            {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, i) => (
               <ReviewCard key={`bot-${i}`} review={review} />
            ))}
         </div>

      </div>

      {/* --- CTA --- */}
      <div className="mt-12 md:mt-16 text-center">
         <a 
            href="https://google.com" 
            target="_blank"
            className="inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white/5 border border-white/10 rounded-full hover:bg-[#D4E821] hover:text-black hover:border-[#D4E821] transition-all group"
         >
            <span className="text-xs md:text-sm font-bold uppercase tracking-wider">Write a Review</span>
            <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
         </a>
      </div>

    </section>
  );
}

// --- CARD COMPONENT ---
const ReviewCard = ({ review }) => (
  // ADJUSTED: 
  // 1. Width: w-[280px] for small phones, scaling up to md:w-[450px]
  // 2. Padding: p-5 on mobile, p-6 desktop
  // 3. Margin: mx-3 mobile, mx-4 desktop
  <div className="w-[280px] sm:w-[350px] md:w-[450px] bg-[#0a0a0a] border border-white/10 p-5 md:p-6 rounded-xl mx-3 md:mx-4 flex flex-col justify-between hover:border-[#D4E821] transition-colors group cursor-default">
     
     {/* Header */}
     <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-white border border-white/10 text-sm md:text-base">
              {review.name.charAt(0)}
           </div>
           <div>
              <h4 className="text-sm font-bold text-white leading-tight">{review.name}</h4>
              <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wide truncate max-w-[150px]">{review.role}</p>
           </div>
        </div>
        <div className="w-5 h-5 md:w-6 md:h-6 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 transition-all">
           {/* Tiny Google G Icon */}
           <svg viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
           </svg>
        </div>
     </div>

     {/* Stars & Text */}
     <div className="mb-4">
        <div className="flex text-[#ffb400] mb-2 scale-75 origin-left gap-0.5">
           {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
        </div>
        <p className="text-xs md:text-sm text-gray-300 leading-relaxed line-clamp-3 md:line-clamp-none">
           "{review.text}"
        </p>
     </div>

     {/* Footer */}
     <div className="pt-3 md:pt-4 border-t border-white/5 flex justify-between items-center">
        <span className="text-[9px] md:text-[10px] text-gray-600 font-mono uppercase">{review.date}</span>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-[#D4E821]/10 rounded border border-[#D4E821]/20">
           <CheckCircle2 size={10} className="text-[#D4E821]" />
           <span className="text-[9px] md:text-[10px] font-bold text-[#D4E821] uppercase tracking-wide">Verified Client</span>
        </div>
     </div>

  </div>
);