import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  ArrowUpRight, Mail, MessageSquare, MapPin, 
  Send, CheckCircle2, User, HelpCircle, Briefcase, FileText 
} from 'lucide-react';

export default function ContactUX() {
  const [formType, setFormType] = useState('agency'); // 'agency' or 'support'
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef(null);

  // Animation on Mount
  useEffect(() => {
    gsap.fromTo(".fade-up",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-20 relative">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4E821] opacity-[0.03] blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* === LEFT COLUMN: CONTEXT & DIRECT LINKS === */}
        <div className="lg:col-span-5 flex flex-col gap-10">
           
           {/* Header */}
           <div className="fade-up">
              <span className="text-[#D4E821] font-mono text-xs uppercase tracking-widest mb-4 block">
                 /// Comms_Channel
              </span>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.9] mb-6">
                 Let's <br/> <span className="text-gray-700">Connect.</span>
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                 Whether you're looking to revolutionize your brand's digital presence or need help with a download, our team is standing by.
              </p>
           </div>

           {/* Quick Action Grid (Bento Style) */}
           <div className="grid grid-cols-1 gap-4 fade-up">
              
              {/* WhatsApp / Phone */}
              <a 
                href="https://wa.me/919692664009" 
                target="_blank"
                className="group flex items-center justify-between p-6 bg-[#0a0a0a] border border-white/10 rounded-xl hover:border-[#D4E821]/50 transition-all hover:bg-[#0f0f0f]"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                       <MessageSquare size={20} />
                    </div>
                    <div>
                       <h3 className="text-sm font-bold text-white">Chat on WhatsApp</h3>
                       <p className="text-xs text-gray-500 font-mono">+91 96926 64009</p>
                    </div>
                 </div>
                 <ArrowUpRight size={18} className="text-gray-600 group-hover:text-[#D4E821] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </a>

              {/* Email */}
              <a 
                href="mailto:hello@mographics.store"
                className="group flex items-center justify-between p-6 bg-[#0a0a0a] border border-white/10 rounded-xl hover:border-[#D4E821]/50 transition-all hover:bg-[#0f0f0f]"
              >
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                       <Mail size={20} />
                    </div>
                    <div>
                       <h3 className="text-sm font-bold text-white">Email Us</h3>
                       <p className="text-xs text-gray-500 font-mono">hello@mographics.store</p>
                    </div>
                 </div>
                 <ArrowUpRight size={18} className="text-gray-600 group-hover:text-[#D4E821] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
              </a>

              {/* Location */}
              <div className="flex items-start gap-4 p-6 bg-[#0a0a0a] border border-white/10 rounded-xl">
                 <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 shrink-0">
                    <MapPin size={20} />
                 </div>
                 <div>
                    <h3 className="text-sm font-bold text-white mb-1">Headquarters</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                       Bhubaneswar, Odisha<br/>
                       India, 751024
                    </p>
                 </div>
              </div>

           </div>
        </div>

        {/* === RIGHT COLUMN: THE SMART FORM === */}
        <div className="lg:col-span-7 fade-up">
           <div className="bg-[#0f0f0f] border border-white/10 rounded-2xl p-6 md:p-10 relative overflow-hidden">
              
              {/* SUCCESS STATE OVERLAY */}
              {isSuccess && (
                 <div className="absolute inset-0 z-20 bg-[#0f0f0f] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-[#D4E821] rounded-full flex items-center justify-center mb-6 text-black shadow-[0_0_30px_rgba(212,232,33,0.3)]">
                       <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-black uppercase mb-2">Message Sent</h3>
                    <p className="text-gray-400 max-w-xs mb-8">We have received your transmission. Our team will respond within 24 hours.</p>
                    <button 
                       onClick={() => setIsSuccess(false)}
                       className="text-sm font-bold text-[#D4E821] uppercase tracking-widest hover:text-white transition-colors"
                    >
                       Send Another
                    </button>
                 </div>
              )}

              {/* --- 1. INTENT TOGGLE --- */}
              <div className="flex p-1 bg-black rounded-lg border border-white/10 mb-8">
                 <button 
                    onClick={() => setFormType('agency')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300
                       ${formType === 'agency' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}
                    `}
                 >
                    <Briefcase size={14} /> Start a Project
                 </button>
                 <button 
                    onClick={() => setFormType('support')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md text-xs font-bold uppercase tracking-wider transition-all duration-300
                       ${formType === 'support' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}
                    `}
                 >
                    <HelpCircle size={14} /> Order Support
                 </button>
              </div>

              {/* --- 2. THE FORM --- */}
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">
                 
                 {/* Name & Email Row */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${focusedField === 'name' ? 'text-[#D4E821]' : 'text-gray-500'}`}>
                          Your Name
                       </label>
                       <div className={`flex items-center bg-black border rounded-lg px-4 transition-colors duration-300 ${focusedField === 'name' ? 'border-[#D4E821]' : 'border-white/10'}`}>
                          <User size={16} className="text-gray-600" />
                          <input 
                             required
                             type="text" 
                             onFocus={() => setFocusedField('name')}
                             onBlur={() => setFocusedField(null)}
                             className="w-full bg-transparent p-4 text-sm text-white placeholder-gray-700 focus:outline-none"
                             placeholder="John Doe"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${focusedField === 'email' ? 'text-[#D4E821]' : 'text-gray-500'}`}>
                          Email Address
                       </label>
                       <div className={`flex items-center bg-black border rounded-lg px-4 transition-colors duration-300 ${focusedField === 'email' ? 'border-[#D4E821]' : 'border-white/10'}`}>
                          <Mail size={16} className="text-gray-600" />
                          <input 
                             required
                             type="email" 
                             onFocus={() => setFocusedField('email')}
                             onBlur={() => setFocusedField(null)}
                             className="w-full bg-transparent p-4 text-sm text-white placeholder-gray-700 focus:outline-none"
                             placeholder="john@example.com"
                          />
                       </div>
                    </div>
                 </div>

                 {/* Dynamic Field based on Intent */}
                 {formType === 'support' && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                       <label className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${focusedField === 'order' ? 'text-[#D4E821]' : 'text-gray-500'}`}>
                          Order ID (Optional)
                       </label>
                       <div className={`flex items-center bg-black border rounded-lg px-4 transition-colors duration-300 ${focusedField === 'order' ? 'border-[#D4E821]' : 'border-white/10'}`}>
                          <FileText size={16} className="text-gray-600" />
                          <input 
                             type="text" 
                             onFocus={() => setFocusedField('order')}
                             onBlur={() => setFocusedField(null)}
                             className="w-full bg-transparent p-4 text-sm text-white placeholder-gray-700 focus:outline-none"
                             placeholder="#ORD-12345"
                          />
                       </div>
                    </div>
                 )}

                 {formType === 'agency' && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                       <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                          Service Type
                       </label>
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {['Social Media', 'Web Dev', 'Campaigns', 'Branding', 'Print'].map((service) => (
                             <label key={service} className="cursor-pointer">
                                <input type="checkbox" className="peer sr-only" />
                                <div className="text-[10px] font-bold uppercase text-center py-3 border border-white/10 rounded bg-black text-gray-500 peer-checked:bg-[#D4E821] peer-checked:text-black peer-checked:border-[#D4E821] transition-all hover:border-white/30">
                                   {service}
                                </div>
                             </label>
                          ))}
                       </div>
                    </div>
                 )}

                 {/* Message */}
                 <div className="space-y-2">
                    <label className={`text-[10px] font-mono uppercase tracking-widest transition-colors ${focusedField === 'msg' ? 'text-[#D4E821]' : 'text-gray-500'}`}>
                       How can we help?
                    </label>
                    <textarea 
                       required
                       rows="4"
                       onFocus={() => setFocusedField('msg')}
                       onBlur={() => setFocusedField(null)}
                       className={`w-full bg-black border rounded-lg p-4 text-sm text-white placeholder-gray-700 focus:outline-none transition-colors duration-300 resize-none ${focusedField === 'msg' ? 'border-[#D4E821]' : 'border-white/10'}`}
                       placeholder={formType === 'agency' ? "Tell us about your project goals..." : "Describe the issue you are facing..."}
                    ></textarea>
                 </div>

                 {/* Submit */}
                 <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 bg-[#D4E821] text-black h-14 rounded-lg font-bold uppercase tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,232,33,0.2)] hover:shadow-[0_0_30px_rgba(212,232,33,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    {isSubmitting ? (
                       <span className="animate-pulse">Processing...</span>
                    ) : (
                       <>Send Message <Send size={18} /></>
                    )}
                 </button>

              </form>
           </div>
        </div>

      </div>
    </div>
  );
}