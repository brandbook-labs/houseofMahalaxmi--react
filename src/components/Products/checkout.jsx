import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  ArrowRight, Smartphone, User, CheckCircle2, 
  Wallet, Banknote, ShieldCheck, Loader2, X, Smartphone as MobileIcon, Clock 
} from 'lucide-react';

// --- CONFIGURATION ---
const MERCHANT_VPA = "mographics@upi"; 
const MERCHANT_NAME = "MoGraphics Agency";

// --- MOCK DATABASE ---
const EXISTING_USERS = ['9876543210', '9999999999']; 

export default function CheckoutPage() {
  const navigate = useNavigate();
  
  // Data State
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [totalAmount] = useState(105020); 
  
  // Logic State
  const [isChecking, setIsChecking] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isMobileValid, setIsMobileValid] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  
  // Modal / Gateway State
  const [showGateway, setShowGateway] = useState(false);
  const [orderStatus, setOrderStatus] = useState('pending'); // pending -> processing -> success

  // Refs
  const nameFieldRef = useRef(null);
  const gatewayRef = useRef(null);

  // --- 1. IDENTITY LOGIC ---
  const handleMobileChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(val);

    if (val.length < 10) {
        setIsMobileValid(false);
        setIsNewUser(false);
        gsap.to(nameFieldRef.current, { height: 0, opacity: 0, duration: 0.3 });
    }
  };

  useEffect(() => {
    if (mobile.length === 10) {
        setIsChecking(true);
        setTimeout(() => {
            setIsChecking(false);
            setIsMobileValid(true);
            if (!EXISTING_USERS.includes(mobile)) {
                setIsNewUser(true);
                gsap.fromTo(nameFieldRef.current, 
                    { height: 0, opacity: 0 },
                    { height: "auto", opacity: 1, duration: 0.4, ease: "power2.out" }
                );
            }
        }, 800);
    }
  }, [mobile]);

  // --- 2. ORDER INITIATION ---
  const handleProceed = () => {
    if (!isMobileValid) return alert("Enter valid mobile number");
    if (isNewUser && name.length < 2) return alert("Enter your name");
    
    // Open the Universal Gateway Modal
    setOrderStatus('pending');
    setShowGateway(true);
  };

  // --- 3. SIMULATION LOGIC (Backend Replacement) ---
  useEffect(() => {
    if (showGateway && orderStatus === 'pending') {
        // Animate Modal In
        gsap.fromTo(gatewayRef.current, 
            { y: "100%" }, 
            { y: "0%", duration: 0.5, ease: "power3.out" }
        );

        // LOGIC FOR CASH VS UPI
        if (paymentMethod === 'cash') {
            // SIMULATE ADMIN APPROVAL (Cash Flow)
            // In real app: This would be a WebSocket waiting for Admin Dashboard response
            const adminTimer = setTimeout(() => {
                setOrderStatus('processing'); // Admin saw request
                setTimeout(() => {
                    setOrderStatus('success'); // Admin clicked "Accept"
                    setTimeout(() => navigate('/success'), 2000);
                }, 3000);
            }, 4000); 
            return () => clearTimeout(adminTimer);

        } else {
            // SIMULATE PAYMENT VERIFICATION (UPI Flow)
            const upiTimer = setTimeout(() => {
                setOrderStatus('processing'); // Payment detected
                setTimeout(() => {
                    setOrderStatus('success'); // Payment captured
                    setTimeout(() => navigate('/success'), 2000);
                }, 2000);
            }, 8000);
            return () => clearTimeout(upiTimer);
        }
    }
  }, [showGateway, paymentMethod, orderStatus, navigate]);

  // Generate UPI Links
  const upiLink = `upi://pay?pa=${MERCHANT_VPA}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${totalAmount}&tn=Order_${mobile}`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pt-24 pb-20 relative">
      
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-12 border-b border-white/10 pb-6">
           <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">
              Fast <span className="text-gray-600">Checkout</span>
           </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* === LEFT: IDENTITY & PAYMENT SELECTION === */}
            <div className="lg:col-span-8 space-y-8">
               
               {/* Identity */}
               <section className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 md:p-8">
                    <h2 className="text-sm font-bold uppercase text-gray-500 tracking-widest mb-6 flex items-center gap-2">
                       <Smartphone size={16} className="text-[#D4E821]" />
                       Contact Details
                    </h2>
                    <div className="space-y-6">
                       <div className="relative">
                          <input 
                            type="tel" 
                            value={mobile}
                            onChange={handleMobileChange}
                            placeholder="Mobile Number"
                            className="w-full bg-transparent border-b border-white/20 h-14 pl-12 text-2xl font-mono text-white placeholder-gray-700 focus:border-[#D4E821] focus:outline-none transition-colors"
                          />
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xl">+91</span>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2">
                             {isChecking && <Loader2 className="animate-spin text-gray-500" size={20} />}
                             {!isChecking && isMobileValid && !isNewUser && <span className="text-xs font-bold text-[#D4E821] uppercase bg-[#D4E821]/10 px-2 py-1 rounded">Welcome Back</span>}
                             {!isChecking && isMobileValid && isNewUser && <span className="text-xs font-bold text-gray-500 uppercase bg-white/10 px-2 py-1 rounded">New User</span>}
                          </div>
                       </div>
                       <div ref={nameFieldRef} className="overflow-hidden h-0 opacity-0">
                          <div className="pt-2 pb-2">
                             <div className="relative">
                                <input 
                                  type="text" 
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  placeholder="Enter your Name *"
                                  className="w-full bg-transparent border-b border-white/20 h-12 pl-8 text-lg text-white placeholder-gray-700 focus:border-[#D4E821] focus:outline-none transition-colors"
                                />
                                <User size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500" />
                             </div>
                          </div>
                       </div>
                    </div>
               </section>

               {/* Payment Method Selector */}
               <section className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 md:p-8">
                    <h2 className="text-sm font-bold uppercase text-gray-500 tracking-widest mb-6 flex items-center gap-2">
                       <Wallet size={16} className="text-[#D4E821]" />
                       Payment Method
                    </h2>
                    <div className="flex gap-4">
                        <button 
                           onClick={() => setPaymentMethod('upi')}
                           className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-all duration-300 flex-1 justify-center md:flex-none md:justify-start
                              ${paymentMethod === 'upi' ? 'bg-[#D4E821] border-[#D4E821] text-black' : 'bg-[#111] border-white/10 text-gray-400 hover:text-white'}
                           `}
                        >
                           <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'upi' ? 'border-black' : 'border-gray-500'}`}>
                              {paymentMethod === 'upi' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                           </div>
                           <span className="font-bold uppercase tracking-wider text-sm">UPI / Online</span>
                        </button>

                        <button 
                           onClick={() => setPaymentMethod('cash')}
                           className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-all duration-300 flex-1 justify-center md:flex-none md:justify-start
                              ${paymentMethod === 'cash' ? 'bg-[#D4E821] border-[#D4E821] text-black' : 'bg-[#111] border-white/10 text-gray-400 hover:text-white'}
                           `}
                        >
                           <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cash' ? 'border-black' : 'border-gray-500'}`}>
                              {paymentMethod === 'cash' && <div className="w-2 h-2 bg-black rounded-full"></div>}
                           </div>
                           <span className="font-bold uppercase tracking-wider text-sm">Cash Request</span>
                        </button>
                    </div>
               </section>
            </div>

            {/* === RIGHT: SUMMARY & ACTION === */}
            <div className="lg:col-span-4 lg:sticky lg:top-8">
               <div className="bg-[#111] border border-white/10 rounded-xl p-6 md:p-8">
                  <h3 className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-6">Order Summary</h3>
                  <div className="space-y-3 mb-8">
                      <div className="flex justify-between items-center text-sm text-gray-400">
                          <span>Subtotal</span>
                          <span className="font-mono">₹89,000</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-gray-400">
                          <span>GST (18%)</span>
                          <span className="font-mono">₹16,020</span>
                      </div>
                      <div className="pt-4 mt-2 border-t border-white/10 flex justify-between items-center">
                          <span className="text-base font-bold text-white uppercase">Total</span>
                          <span className="text-2xl font-bold text-[#D4E821] font-mono">₹1,05,020</span>
                      </div>
                  </div>

                  {/* PROCEED BUTTON */}
                  <button 
                      onClick={handleProceed}
                      disabled={!isMobileValid}
                      className={`w-full bg-[#D4E821] hover:bg-white text-black font-bold uppercase py-5 rounded text-sm tracking-widest transition-all flex items-center justify-center gap-2 group 
                        ${!isMobileValid ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
                      `}
                  >
                      {paymentMethod === 'upi' ? 'Pay with UPI' : 'Send Request'}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-500 font-mono uppercase">
                      <ShieldCheck size={12} className="text-[#D4E821]" />
                      Secure SSL Connection
                  </div>
               </div>
            </div>

        </div>
      </div>

      {/* ============================================== */}
      {/* === UNIFIED PAYMENT/REQUEST MODAL === */}
      {/* ============================================== */}
      {showGateway && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/80 backdrop-blur-sm p-0 md:p-4">
            
            <div 
                ref={gatewayRef}
                className="w-full md:w-[450px] bg-[#1a1a1a] border border-white/10 rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden relative"
            >
                {/* Modal Header */}
                <div className="bg-black/50 p-4 flex justify-between items-center border-b border-white/10">
                    <div className="flex items-center gap-2 text-[#D4E821] text-xs font-bold uppercase tracking-wider">
                        <ShieldCheck size={14} /> MoGraphics Gateway
                    </div>
                    <button onClick={() => setShowGateway(false)} className="text-gray-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 md:p-8 flex flex-col items-center text-center">
                    
                    {/* Amount Display */}
                    <p className="text-gray-400 text-xs font-mono uppercase mb-1">Total Amount</p>
                    <h2 className="text-4xl font-bold text-white font-mono mb-8">₹1,05,020</h2>

                    {/* --- CASE 1: UPI PAYMENT --- */}
                    {paymentMethod === 'upi' && orderStatus === 'pending' && (
                        <>
                            <div className="hidden md:block bg-white p-3 rounded-xl mb-6 shadow-lg">
                                <img src={qrCodeUrl} alt="UPI QR" className="w-48 h-48 mix-blend-multiply" />
                            </div>
                            <div className="md:hidden w-full space-y-3 mb-6">
                                <a href={upiLink} className="flex items-center justify-center gap-3 w-full bg-[#111] hover:bg-[#222] border border-white/10 text-white font-bold py-4 rounded-lg transition-colors">
                                    <MobileIcon size={20} className="text-[#D4E821]" /> Pay via UPI App
                                </a>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-500 text-xs font-bold animate-pulse">
                                <Loader2 size={12} className="animate-spin" /> Waiting for payment...
                            </div>
                        </>
                    )}

                    {/* --- CASE 2: CASH REQUEST --- */}
                    {paymentMethod === 'cash' && orderStatus === 'pending' && (
                        <>
                            <div className="w-24 h-24 bg-[#111] border border-white/10 rounded-full flex items-center justify-center mb-6 relative">
                                <Banknote size={40} className="text-gray-400" />
                                <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-black rounded-full p-1.5 border-4 border-[#1a1a1a]">
                                    <Clock size={16} className="animate-spin-slow" /> 
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Request Sent to Admin</h3>
                            <p className="text-sm text-gray-400 mb-6 max-w-xs mx-auto">
                                We have notified the store admin. Please wait while they confirm your cash order request.
                            </p>
                            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold animate-pulse">
                                <Loader2 size={12} className="animate-spin" /> Awaiting Confirmation...
                            </div>
                        </>
                    )}

                    {/* --- COMMON STATES: PROCESSING & SUCCESS --- */}
                    {orderStatus === 'processing' && (
                        <div className="py-10">
                            <Loader2 size={48} className="text-[#D4E821] animate-spin mb-4 mx-auto" />
                            <h3 className="text-xl font-bold text-white uppercase">
                                {paymentMethod === 'cash' ? 'Admin is reviewing...' : 'Verifying Payment...'}
                            </h3>
                        </div>
                    )}

                    {orderStatus === 'success' && (
                        <div className="py-10">
                            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase">Order Confirmed!</h3>
                            <p className="text-gray-500 text-sm mt-2">
                                {paymentMethod === 'cash' ? 'Pay cash on delivery.' : 'Payment received successfully.'}
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
      )}

    </div>
  );
}