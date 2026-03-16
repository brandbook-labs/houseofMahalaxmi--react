import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ArrowRight, Smartphone, User, CheckCircle2,
    Wallet, Banknote, ShieldCheck, Loader2, X, Clock, MapPin
} from 'lucide-react';
import { toast } from 'sonner';

import { placeOrderAPI } from '../../services/apiService';
import { useCart } from '../../context/CartContext';

// ମକ୍ ୟୁଜର୍ ଚେକ୍ କରିବା ପାଇଁ (UI ଆନିମେସନ୍)
const EXISTING_USERS = ['9876543210', '9999999999'];

export default function CheckoutPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { clearCart } = useCart();

    // ───────────── 1. DYNAMIC CART DATA ─────────────
    const { items: cartItems = [], totals = { subtotal: 0, tax: 0, grandTotal: 0 } } = location.state || {};

    useEffect(() => {
        // କାର୍ଟ ଖାଲି ଥିଲେ ସିଧା କାର୍ଟ ପେଜ୍ କୁ ଫେରାଇଦେବୁ
        if (!cartItems || cartItems.length === 0) {
            toast.info("Your cart is empty!");
            navigate('/cart', { replace: true });
        }
    }, [cartItems, navigate]);

    // ───────────── 2. FORM STATES ─────────────
    const [mobile, setMobile] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState({ flat: '', area: '', pincode: '', city: '', state: '' });
    const [paymentMethod] = useState('cash_on_delivery'); // API ସ୍କିମା ଅନୁସାରେ

    // Logic States
    const [isChecking, setIsChecking] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [isMobileValid, setIsMobileValid] = useState(false);

    // ───────────── 3. MODAL STATES ─────────────
    const [showGateway, setShowGateway] = useState(false);
    const [orderStatus, setOrderStatus] = useState('pending'); // pending -> processing -> success/failed

    // --- INPUT HANDLERS ---
    const handleMobileChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
        setMobile(val);

        if (val.length < 10) {
            setIsMobileValid(false);
            setIsNewUser(false);
        }
    };

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    // ମୋବାଇଲ୍ ନମ୍ବର ଟାଇପ୍ ସରିଲେ UI ଆନିମେସନ୍ ପାଇଁ
    useEffect(() => {
        if (mobile.length === 10) {
            setIsChecking(true);
            setTimeout(() => {
                setIsChecking(false);
                setIsMobileValid(true);
                if (!EXISTING_USERS.includes(mobile)) {
                    setIsNewUser(true);
                }
            }, 800);
        }
    }, [mobile]);

    // ───────────── 4. THE MAGIC FUNCTION (HANDLE PROCEED) ─────────────
    // ଏହି ଫଙ୍କସନ୍ ଟି "Place Order" ବଟନ୍ ରେ ବ୍ୟବହାର ହୋଇଛି
    const handleProceed = async () => {

        // ଭ୍ୟାଲିଡେସନ୍
        if (mobile.length !== 10) return toast.error("Please enter a valid 10-digit mobile number.");
        if (name.trim().length < 2) return toast.error("Please enter your full name.");
        if (!address.flat || !address.area || !address.pincode || !address.city || !address.state) {
            return toast.error("Please fill in your complete shipping address.");
        }

        // ୧. ପ୍ରଥମେ "Pending" ଷ୍ଟାଟସ୍ ସହ ଗେଟୱେ ମୋଡାଲ୍ ଖୋଲନ୍ତୁ (ଏହା Verifying details ଦେଖାଇବ)
        setOrderStatus('pending');
        setShowGateway(true);

        try {
            // ୨. ୩ ସେକେଣ୍ଡ୍ ପାଇଁ ଅପେକ୍ଷା କରନ୍ତୁ (ଆପଣଙ୍କ ପୁରୁଣା ସିମୁଲେସନ୍ ପରି)
            await new Promise(resolve => setTimeout(resolve, 3000));

            // ୩. ଷ୍ଟାଟସ୍ କୁ "Processing" କୁ ବଦଳାନ୍ତୁ (ଏହା Finalizing Order ଦେଖାଇବ)
            setOrderStatus('processing');

            // ୪. ବ୍ୟାକେଣ୍ଡ୍ ପାଇଁ ପେଲୋଡ୍ ତିଆରି କରନ୍ତୁ
            const orderPayload = {
                name: name.trim(),
                phone: mobile,
                shippingAddress: address,
                paymentMethod: paymentMethod,
                products: cartItems.map(item => ({
                    product: item.id,
                    size: item.selectedSize || "Free Size",
                    quantity: item.quantity
                }))
            };

            // ୫. ପ୍ରକୃତ API କଲ୍ କରନ୍ତୁ 
            const response = await placeOrderAPI(orderPayload);
            console.log("✅ API Response:", response);

            if (response.code === 201 || response.code === 200) {
                // ୬. ସଫଳ ହେଲେ "Success" ଷ୍ଟାଟସ୍ ଦେଖାନ୍ତୁ (ଏହା Order Confirmed ଦେଖାଇବ)
                setOrderStatus('success');
                clearCart(); // ଗ୍ଲୋବାଲ୍ କାର୍ଟ ଖାଲି କରିବେ
                toast.success("Order placed successfully! 🎉");

                const actualOrderData = response.data; // ବ୍ୟାକେଣ୍ଡ୍ ରୁ ଆସିଥିବା ପ୍ରକୃତ ଡାଟା

                // ୭. ୨ ସେକେଣ୍ଡ୍ ପରେ ସକ୍ସେସ୍ ପେଜ୍ କୁ ରିଡାଇରେକ୍ଟ କରନ୍ତୁ
                setTimeout(() => {
                    navigate('/success', {
                        replace: true,
                        state: { orderDetails: actualOrderData }
                    });
                }, 2000);

            } else {
                setOrderStatus('failed');
                setShowGateway(false);
                toast.error(response.msg || "Failed to place order.");
            }

        } catch (error) {
            console.error("Order Submit Error:", error);
            setOrderStatus('failed');
            setShowGateway(false);
            toast.error("Server error! Please try again later.");
        }
    };

    const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
    const inputClass = "w-full bg-transparent border-b-2 border-gray-200 h-12 text-base text-gray-900 placeholder-gray-400 focus:border-[#800020] focus:outline-none transition-colors";

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pt-12 md:pt-24 pb-20 relative">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                {/* --- HEADER --- */}
                <div className="mb-8 md:mb-12 border-b border-gray-200 pb-6 text-center md:text-left">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-none">
                        Secure <span className="text-gray-400 font-normal">Checkout</span>
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                    {/* === LEFT: CONTACT, ADDRESS & PAYMENT === */}
                    <div className="lg:col-span-8 space-y-6 md:space-y-8">

                        {/* 1. Contact Details */}
                        <section className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 md:p-8">
                            <h2 className="text-lg font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Smartphone size={20} className="text-[#800020]" />
                                Contact Details
                            </h2>
                            <div className="space-y-6">
                                <div className="relative">
                                    <input
                                        type="tel"
                                        value={mobile}
                                        onChange={handleMobileChange}
                                        placeholder="Mobile Number *"
                                        className="w-full bg-transparent border-b-2 border-gray-200 h-14 pl-12 text-xl tracking-wide text-gray-900 placeholder-gray-400 focus:border-[#800020] focus:outline-none transition-colors"
                                    />
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 font-medium text-lg">+91</span>
                                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                                        {isChecking && <Loader2 className="animate-spin text-[#800020]" size={20} />}
                                        {!isChecking && isMobileValid && !isNewUser && (
                                            <span className="text-xs font-bold text-[#800020] uppercase bg-[#800020]/10 px-3 py-1.5 rounded-full">Welcome Back</span>
                                        )}
                                        {!isChecking && isMobileValid && isNewUser && (
                                            <span className="text-xs font-bold text-gray-600 uppercase bg-gray-100 px-3 py-1.5 rounded-full">New User</span>
                                        )}
                                    </div>
                                </div>

                                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isNewUser ? 'max-h-24 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Full Name *"
                                            className="w-full bg-transparent border-b-2 border-gray-200 h-14 pl-10 text-lg text-gray-900 placeholder-gray-400 focus:border-[#800020] focus:outline-none transition-colors"
                                        />
                                        <User size={20} className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 2. Shipping Address */}
                        <section className={`bg-white border border-gray-200 shadow-sm rounded-xl p-6 md:p-8 overflow-hidden transition-all duration-500 ease-in-out ${isMobileValid ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0 p-0 border-0 shadow-none'}`}>
                            <h2 className="text-lg font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <MapPin size={20} className="text-[#800020]" />
                                Shipping Address
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                                <div className="md:col-span-2">
                                    <input type="text" name="flat" value={address.flat} onChange={handleAddressChange} placeholder="Flat, House no., Building, Apartment *" className={inputClass} />
                                </div>
                                <div className="md:col-span-2">
                                    <input type="text" name="area" value={address.area} onChange={handleAddressChange} placeholder="Area, Street, Sector, Village *" className={inputClass} />
                                </div>
                                <div>
                                    <input type="text" name="pincode" value={address.pincode} onChange={handleAddressChange} placeholder="Pincode *" maxLength="6" className={inputClass} />
                                </div>
                                <div>
                                    <input type="text" name="city" value={address.city} onChange={handleAddressChange} placeholder="Town / City *" className={inputClass} />
                                </div>
                                <div className="md:col-span-2">
                                    <input type="text" name="state" value={address.state} onChange={handleAddressChange} placeholder="State *" className={inputClass} />
                                </div>
                            </div>
                        </section>

                        {/* 3. Payment Method Selector */}
                        <section className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 md:p-8">
                            <h2 className="text-lg font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Wallet size={20} className="text-[#800020]" />
                                Payment Method
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex items-center gap-3 px-6 py-4 rounded-lg border-2 transition-all duration-300 flex-1 justify-start bg-[#800020]/5 border-[#800020] text-[#800020] cursor-default">
                                    <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-[#800020]">
                                        <div className="w-2.5 h-2.5 bg-[#800020] rounded-full"></div>
                                    </div>
                                    <span className="font-bold tracking-wide text-sm">Cash on Delivery</span>
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* === RIGHT: SUMMARY & ACTION === */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 md:p-8">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Order Summary</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm text-gray-600">
                                    <span>Subtotal ({cartItems.length} items)</span>
                                    <span className="font-medium text-gray-900">{formatPrice(totals.subtotal)}</span>
                                </div>
                                {/* [NEW] Enhanced GST & Tax Note - Trust Badge UI */}
                                <div className="bg-green-50 rounded-lg p-3 mt-4 border border-green-100 flex items-start gap-2.5">
                                    <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                                    <p className="text-xs text-gray-700 leading-relaxed">
                                        <span className="font-bold text-gray-900">No Hidden Charges:</span> GST and all applicable duties are already included in the subtotal price.
                                    </p>
                                </div>
                                <div className="pt-4 mt-2 border-t border-gray-200 flex justify-between items-end">
                                    <span className="text-base font-bold text-gray-900">Total</span>
                                    <span className="text-3xl font-serif font-bold text-[#800020] leading-none">{formatPrice(totals.grandTotal)}</span>
                                </div>
                            </div>

                            {/* ଏହି ବଟନ୍ ରେ handleProceed କଲ୍ ହେଉଛି */}
                            <button
                                onClick={handleProceed}
                                disabled={!isMobileValid}
                                className={`w-full font-bold uppercase py-4 rounded-md text-sm tracking-widest transition-all flex items-center justify-center gap-2 group shadow-md shadow-[#800020]/20
                        ${!isMobileValid ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none' : 'bg-[#800020] hover:bg-[#600018] text-white'}
                      `}
                            >
                                Place Order
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium uppercase tracking-wide">
                                <ShieldCheck size={16} className="text-green-600" />
                                Secure Encrypted Checkout
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ============================================== */}
            {/* === MODAL: API PROCESSING & SUCCESS === */}
            {/* ============================================== */}
            {showGateway && (
                <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-gray-900/60 backdrop-blur-sm p-0 md:p-4 transition-opacity">
                    <div className="w-full md:w-[450px] bg-white border border-gray-200 rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-300">

                        <div className="bg-gray-50 p-4 flex justify-between items-center border-b border-gray-200">
                            <div className="flex items-center gap-2 text-[#800020] text-sm font-bold tracking-wide">
                                <ShieldCheck size={18} /> Secure Checkout
                            </div>
                            {/* Processing ବେଳେ ବନ୍ଦ କରିବାକୁ ଦେବୁ ନାହିଁ */}
                            {orderStatus !== 'processing' && (
                                <button onClick={() => setShowGateway(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                                    <X size={24} />
                                </button>
                            )}
                        </div>

                        <div className="p-6 md:p-8 flex flex-col items-center text-center">
                            <p className="text-gray-500 text-sm font-medium uppercase mb-1 tracking-wider">Amount to Pay</p>
                            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-8">{formatPrice(totals.grandTotal)}</h2>

                            {/* Pending State (Verifying) */}
                            {orderStatus === 'pending' && (
                                <>
                                    <div className="w-24 h-24 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center mb-6 relative">
                                        <Banknote size={40} className="text-gray-400" />
                                        <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-yellow-900 rounded-full p-2 border-4 border-white shadow-sm">
                                            <Clock size={16} className="animate-spin-slow" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Processing Order</h3>
                                    <p className="text-base text-gray-500 mb-6 max-w-xs mx-auto">
                                        Please wait while we confirm your Cash on Delivery order.
                                    </p>
                                    <div className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium animate-pulse">
                                        <Loader2 size={16} className="animate-spin" /> Verifying details...
                                    </div>
                                </>
                            )}

                            {/* Processing State (API Call Active) */}
                            {orderStatus === 'processing' && (
                                <div className="py-10">
                                    <Loader2 size={48} className="text-[#800020] animate-spin mb-6 mx-auto" />
                                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                                        Finalizing Order...
                                    </h3>
                                    <p className="text-sm text-gray-500">Please do not close or refresh this window.</p>
                                </div>
                            )}

                            {/* Success State */}
                            {orderStatus === 'success' && (
                                <div className="py-10 animate-in zoom-in duration-300">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                        <CheckCircle2 size={40} />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-gray-900">Order Confirmed!</h3>
                                    <p className="text-gray-500 text-base mt-2">
                                        Redirecting to success page...
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