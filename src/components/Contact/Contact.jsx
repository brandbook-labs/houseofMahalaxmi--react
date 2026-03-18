import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  MapPin, MessageCircle, Mail, Send, CheckCircle2 
} from 'lucide-react';

export default function ContactMahalaxmi() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef(null);

  // Smooth entry animation
  useEffect(() => {
    gsap.fromTo(".fade-up",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 1. Extract data
    const formData = new FormData(e.target);
    const name = formData.get('userName');
    const email = formData.get('userEmail');
    const message = formData.get('message');
    
    // 2. Format the message for WhatsApp
    let waMessage = `*New Inquiry: House of Mahalaxmi* ✨\n\n`;
    waMessage += `*Name:* ${name}\n`;
    waMessage += `*Email:* ${email}\n\n`;
    waMessage += `*Message:*\n${message}`;

    // 3. Process the redirect
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      const ownerNumber = "919692664009"; 
      const encodedMessage = encodeURIComponent(waMessage);
      const whatsappUrl = `https://wa.me/${ownerNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      if(formRef.current) formRef.current.reset();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 pt-24 pb-20 relative font-sans">
      
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* === LEFT COLUMN: BRAND & DETAILS === */}
        <div className="flex flex-col gap-10">
           
           <div className="fade-up">
              <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-slate-900 mb-6">
                 House of <br/>
                 <span className="text-amber-600 italic">Mahalaxmi</span>
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed max-w-md">
                 We would love to hear from you. Reach out to us for bespoke inquiries, collections, or general questions.
              </p>
           </div>

           {/* Direct Contacts */}
           <div className="flex flex-col gap-6 fade-up mt-4">
              
              <div className="flex items-start gap-5">
                 <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                    <MapPin size={22} />
                 </div>
                 <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">Our Store</h3>
                    <p className="text-slate-600 leading-relaxed">
                       Bhadrak, Odisha<br/>
                       India, 756100
                    </p>
                 </div>
              </div>

              <div className="flex items-start gap-5">
                 <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <MessageCircle size={22} />
                 </div>
                 <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">WhatsApp</h3>
                    <p className="text-slate-600">+91 96926 64009</p>
                 </div>
              </div>

              <div className="flex items-start gap-5">
                 <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <Mail size={22} />
                 </div>
                 <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">Email</h3>
                    <p className="text-slate-600">contact@houseofmahalaxmi.shop</p>
                 </div>
              </div>

           </div>
        </div>

        {/* === RIGHT COLUMN: SIMPLE FORM === */}
        <div className="fade-up">
           <div className="bg-white border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 md:p-10 relative overflow-hidden">
              
              {/* SUCCESS OVERLAY */}
              {isSuccess && (
                 <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                    <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 text-green-600">
                       <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-serif text-slate-900 mb-2">Connecting...</h3>
                    <p className="text-slate-500 max-w-[250px] mb-8">Redirecting you to our WhatsApp to complete your message.</p>
                    <button 
                       onClick={() => setIsSuccess(false)}
                       className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
                    >
                       Send another message
                    </button>
                 </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                 
                 <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                       Full Name
                    </label>
                    <input 
                       required
                       name="userName"
                       type="text" 
                       className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                       placeholder="e.g. Priya Sharma"
                    />
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                       Email Address
                    </label>
                    <input 
                       required
                       name="userEmail"
                       type="email" 
                       className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                       placeholder="priya@example.com"
                    />
                 </div>

                 <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                       Your Message
                    </label>
                    <textarea 
                       required
                       name="message"
                       rows="4"
                       className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
                       placeholder="How can we assist you today?"
                    ></textarea>
                 </div>

                 <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 bg-slate-900 text-white h-12 rounded-lg font-medium tracking-wide hover:bg-amber-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                 >
                    {isSubmitting ? (
                       <span className="animate-pulse">Opening WhatsApp...</span>
                    ) : (
                       <>Send Inquiry <Send size={16} /></>
                    )}
                 </button>

              </form>
           </div>
        </div>

      </div>
    </div>
  );
}