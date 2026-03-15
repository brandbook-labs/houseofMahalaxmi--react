import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Download, Home, FileText, Package, Truck, Clock } from 'lucide-react';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  
  const orderDetails = location.state?.orderDetails;

  useEffect(() => {
    if (!orderDetails) {
        navigate('/', { replace: true });
        return;
    }
    setIsLoaded(true);
    window.scrollTo(0, 0);
  }, [orderDetails, navigate]);

  if (!orderDetails) return null; 

  const displayOrderId = `ORD-${orderDetails._id.slice(-8).toUpperCase()}`;
  const orderDate = new Date(orderDetails.createdAt || new Date()).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  // ───────────── NATIVE PRINT FUNCTION ─────────────
  const handlePrint = () => {
      window.print(); // ଏହା ବ୍ରାଉଜର୍ ର ପ୍ରିଣ୍ଟ୍/ସେଭ୍ ଆଜ୍ PDF ଡାୟଲଗ୍ ଖୋଲିବ
  };

  return (
    // print:bg-white ଏବଂ print:pt-0 ଦ୍ୱାରା ପ୍ରିଣ୍ଟ୍ ବେଳେ ବ୍ୟାକଗ୍ରାଉଣ୍ଡ୍ ସଫା ଆସିବ
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pt-16 md:pt-24 pb-20 overflow-x-hidden print:bg-white print:pt-0 print:pb-0">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start print:block print:w-full">
        
        {/* --- LEFT COLUMN: Message & Actions (ପ୍ରିଣ୍ଟ୍ ବେଳେ ଏହା ଲୁଚିଯିବ) --- */}
        <div className={`pt-10 transition-all duration-1000 ease-out transform print:hidden ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-8 shadow-sm">
                <CheckCircle2 size={40} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-6 text-gray-900">
                Order <br/> <span className="text-[#800020] font-normal italic">Confirmed</span>
            </h1>
            
            <p className="text-lg text-gray-600 max-w-md leading-relaxed mb-10">
                Thank you for shopping with us, <span className="font-bold">{orderDetails.name}</span>! Your order <strong>#{displayOrderId}</strong> has been successfully placed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                 {/* ଏହି ବଟନ୍ ପ୍ରିଣ୍ଟ୍ ଡାୟଲଗ୍ ଖୋଲିବ */}
                 <button 
                    onClick={handlePrint}
                    className="flex-1 bg-[#800020] text-white font-bold uppercase py-4 rounded-md flex items-center justify-center gap-2 hover:bg-[#600018] transition-colors group shadow-md shadow-[#800020]/20"
                 >
                    <Download size={20} /> 
                    <span>Print / Save PDF</span>
                 </button>
                 
                 <Link to="/" className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold uppercase py-4 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
                    <Home size={20} /> 
                    <span>Back to Home</span>
                 </Link>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
                <h4 className="text-sm font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                    What happens next?
                </h4>
                <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                            <Package size={18} />
                        </div>
                        <div>
                            <p className="text-base font-bold text-gray-900">Order Processing</p>
                            <p className="text-sm text-gray-500 mt-1">We are preparing your items for dispatch. This usually takes 1-2 business days.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
                            <Truck size={18} />
                        </div>
                        <div>
                            <p className="text-base font-bold text-gray-900">Shipping & Delivery</p>
                            <p className="text-sm text-gray-500 mt-1">You will receive a tracking link via SMS/Email once your package is handed to our delivery partner.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* --- RIGHT COLUMN: The Invoice UI (ଏହାହିଁ ପ୍ରିଣ୍ଟ୍ ହେବ) --- */}
        <div className={`w-full transition-all duration-1000 delay-200 ease-out transform print:translate-x-0 print:opacity-100 print:w-full print:block ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xl relative print:shadow-none print:border-none print:rounded-none">
                 
                 <div className="absolute top-0 left-0 w-full h-1.5 bg-[#800020] print:hidden"></div>

                 <div className="p-6 md:p-8">
                    {/* ପ୍ରିଣ୍ଟ୍ ବେଳେ ଦେଖାଇବା ପାଇଁ ଅତିରିକ୍ତ କମ୍ପାନୀ ଡିଟେଲ୍ସ (ସାଧାରଣତଃ ଲୁଚି ରହିବ) */}
                    <div className="hidden print:block mb-8 pb-4 border-b border-gray-200">
                        <h2 className="text-3xl font-serif font-bold text-[#800020]">House of Mahalaxmi</h2>
                        <p className="text-sm text-gray-500 mt-1">Bhubaneswar, Odisha, India | GSTIN: 21AAAAA0000A1Z5</p>
                    </div>

                    <div className="flex justify-between items-start mb-8 pb-8 border-b border-gray-100">
                        <div>
                            <h3 className="text-2xl font-serif font-bold text-gray-900">Tax Invoice</h3>
                            <p className="text-sm text-gray-500 mt-1">Order Date: {orderDate}</p>
                            <p className="text-sm text-gray-900 font-medium mt-3">Bill To: {orderDetails.name}</p>
                            <p className="text-sm text-gray-500">{orderDetails.shippingAddress.flat}, {orderDetails.shippingAddress.area}</p>
                            <p className="text-sm text-gray-500">{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} - {orderDetails.shippingAddress.pincode}</p>
                        </div>
                        <div className="text-right">
                             <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-700 text-xs font-bold uppercase mb-2">
                                <Clock size={14} /> Pending
                             </div>
                             <p className="text-sm text-gray-900 font-bold mt-2">Invoice #: {displayOrderId}</p>
                             <p className="text-sm text-gray-500">
                                Cash on Delivery
                             </p>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex justify-between text-xs text-gray-500 uppercase tracking-widest font-bold mb-4 border-b border-gray-100 pb-2">
                            <span>Item Details</span>
                            <span>Amount</span>
                        </div>
                        
                        <div className="space-y-6">
                            {orderDetails.products.map((item, i) => {
                                // [NEW] ବ୍ୟାକେଣ୍ଡ୍ ରୁ populate ହୋଇ ଆସିଥିବା ନାମ (ଯଦି ନଥାଏ ତେବେ Product 1)
                                const productName = item.product?.name || `Product ${i + 1}`;

                                return (
                                    <div key={i} className="flex justify-between items-start">
                                        <div className="pr-4">
                                            <h4 className="text-base font-bold text-gray-900 leading-tight">{productName}</h4>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Size: {item.size} • Qty: {item.quantity} • Unit Price: {formatPrice(item.price)}
                                            </p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="block text-base font-medium text-gray-900">
                                                {formatPrice(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Totals Section */}
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-3 print:bg-transparent print:p-0 print:border-none print:mt-10">
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-medium text-gray-900">{formatPrice(orderDetails.pricing.subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Estimated GST</span>
                            <span className="font-medium text-gray-900">{formatPrice(orderDetails.pricing.gst)}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-4 flex justify-between items-end mt-2">
                            <span className="text-base font-bold uppercase text-gray-900">Grand Total</span>
                            <span className="text-3xl font-serif font-bold text-[#800020] leading-none">
                                {formatPrice(orderDetails.pricing.totalPrice)}
                            </span>
                        </div>
                    </div>
                 </div>

                 <div className="bg-gray-50 p-4 text-center border-t border-gray-200 flex items-center justify-center gap-2 text-gray-500 text-xs uppercase tracking-widest print:hidden">
                    <FileText size={16} /> Official Tax Invoice available via download
                 </div>
            </div>
        </div>

      </div>
    </div>
  );
}