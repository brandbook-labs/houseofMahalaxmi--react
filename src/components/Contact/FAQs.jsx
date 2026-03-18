import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  Search, ChevronDown, MessageCircle, 
  ShoppingBag, Truck, Sparkles, RefreshCcw 
} from 'lucide-react';

// --- FAQ DATA ---
const faqs = [
  {
    id: 1,
    categoryId: 'shipping',
    question: "How long does delivery take within India?",
    answer: "Standard shipping within India typically takes 3-5 business days. For bespoke or customized orders, please allow an additional 7-10 business days for our artisans to craft your piece."
  },
  {
    id: 2,
    categoryId: 'shipping',
    question: "Do you offer international shipping?",
    answer: "Yes, we ship globally. International deliveries usually take 7-14 business days depending on the destination and customs processing."
  },
  {
    id: 3,
    categoryId: 'returns',
    question: "What is your return and exchange policy?",
    answer: "We accept returns and exchanges within 14 days of delivery, provided the item is unworn, in its original condition, and with all tags attached. Please note that bespoke and personalized items are final sale."
  },
  {
    id: 4,
    categoryId: 'returns',
    question: "How do I initiate a return?",
    answer: "You can initiate a return by contacting our support team via email or WhatsApp with your Order ID. We will arrange a complimentary pickup from your address."
  },
  {
    id: 5,
    categoryId: 'care',
    question: "How should I care for my Mahalaxmi pieces?",
    answer: "Store your pieces in a cool, dry place, preferably in the protective pouch provided. Avoid direct contact with perfumes, lotions, and harsh chemicals to maintain their luster."
  },
  {
    id: 6,
    categoryId: 'bespoke',
    question: "Can I request a custom design?",
    answer: "Absolutely. Our House of Mahalaxmi artisans specialize in bringing your unique visions to life. Please reach out to our team to schedule a bespoke consultation."
  }
];

const categories = [
  { id: 'all', label: 'All Questions', icon: <Search size={18} /> },
  { id: 'shipping', label: 'Shipping & Delivery', icon: <Truck size={18} /> },
  { id: 'returns', label: 'Returns & Exchanges', icon: <RefreshCcw size={18} /> },
  { id: 'care', label: 'Product Care', icon: <Sparkles size={18} /> },
  { id: 'bespoke', label: 'Bespoke Orders', icon: <ShoppingBag size={18} /> },
];

export default function FAQMahalaxmi() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  // Initial Page Animation
  useEffect(() => {
    gsap.fromTo(".fade-up",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, []);

  // Filter Logic
  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.categoryId === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 pt-24 pb-24 font-sans selection:bg-amber-100 selection:text-amber-900">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* --- HEADER & SEARCH --- */}
        <div className="text-center mb-16 fade-up">
          <span className="text-amber-600 font-semibold tracking-wider uppercase text-xs mb-3 block">
            Client Services
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">
            Frequently Asked <span className="italic">Questions</span>
          </h1>
          
          <div className="max-w-xl mx-auto relative mt-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="w-full bg-white border border-slate-200 rounded-full py-4 pl-12 pr-6 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-50 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          
          {/* --- SIDEBAR CATEGORIES --- */}
          <div className="w-full md:w-64 shrink-0 fade-up hidden md:flex flex-col gap-2 sticky top-24">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 ml-3">Categories</h3>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpenFaq(null); }}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? 'bg-amber-50 text-amber-700 font-medium shadow-sm border border-amber-100' 
                    : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <span className={`${activeCategory === cat.id ? 'text-amber-600' : 'text-slate-400'}`}>
                  {cat.icon}
                </span>
                <span className="text-sm">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Category Dropdown (Visible only on small screens) */}
          <div className="w-full md:hidden fade-up mb-4">
             <select 
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-4 text-slate-700 focus:outline-none focus:border-amber-400"
             >
                {categories.map((cat) => (
                   <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
             </select>
          </div>

          {/* --- FAQ ACCORDION LIST --- */}
          <div className="flex-1 w-full fade-up">
            {filteredFaqs.length === 0 ? (
               <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <Search size={40} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-lg font-serif text-slate-900 mb-2">No results found</h3>
                  <p className="text-slate-500">We couldn't find any answers matching "{searchQuery}".</p>
                  <button 
                     onClick={() => setSearchQuery('')}
                     className="mt-4 text-sm font-medium text-amber-600 hover:text-amber-700"
                  >
                     Clear search
                  </button>
               </div>
            ) : (
               <div className="flex flex-col gap-3">
                 {filteredFaqs.map((faq) => (
                   <div 
                     key={faq.id} 
                     className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${
                        openFaq === faq.id ? 'border-amber-200 shadow-md' : 'border-slate-200/60 shadow-sm hover:border-slate-300'
                     }`}
                   >
                     <button
                       onClick={() => toggleFaq(faq.id)}
                       className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                     >
                       <span className="font-serif text-lg text-slate-900 pr-8">{faq.question}</span>
                       <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 ${
                         openFaq === faq.id ? 'bg-amber-100 text-amber-600 rotate-180' : 'bg-slate-50 text-slate-400'
                       }`}>
                         <ChevronDown size={18} />
                       </span>
                     </button>
                     
                     {/* CSS Grid trick for smooth height transition */}
                     <div className={`grid transition-all duration-300 ease-in-out ${
                         openFaq === faq.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                       }`}
                     >
                       <div className="overflow-hidden">
                         <div className="p-6 pt-0 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-50 mt-2">
                           {faq.answer}
                         </div>
                       </div>
                     </div>
                   </div>
                 ))}
               </div>
            )}
          </div>

        </div>

        {/* --- BOTTOM CTA --- */}
        <div className="mt-20 fade-up bg-amber-900 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
           {/* Decorative background pattern */}
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
           
           <div className="relative z-10">
              <h2 className="text-3xl font-serif text-amber-50 mb-4">Still have questions?</h2>
              <p className="text-amber-200/80 mb-8 max-w-lg mx-auto">
                 If you couldn't find the answer you were looking for, our concierge team is always here to assist you.
              </p>
              <button 
                // Connect this to your contact form page
                onClick={() => window.location.href = '/contact-us'} 
                className="inline-flex items-center gap-2 bg-white text-amber-900 px-8 py-4 rounded-full font-medium hover:bg-amber-50 hover:scale-105 transition-all shadow-lg"
              >
                 <MessageCircle size={18} />
                 Contact Support
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}