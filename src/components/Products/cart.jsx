import React, { useMemo } from "react";
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck, ArrowLeft, ShoppingBag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const navigate = useNavigate();
  
  // [NEW] Local State ପରିବର୍ତ୍ତେ Global Context ରୁ ଡାଟା ଏବଂ ଫଙ୍କସନ୍ ଆଣନ୍ତୁ
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // --- CALCULATIONS ---
  const totals = useMemo(() => {
    return cartItems.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;
        const itemTax = itemTotal * ((item.gstRate || 0) / 100);
        
        return {
            subtotal: acc.subtotal + itemTotal,
            tax: acc.tax + itemTax
        };
    }, { subtotal: 0, tax: 0 });
  }, [cartItems]);

  const grandTotal = totals.subtotal + totals.tax;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
      // ଏଠାରୁ ଡାଟା ଧରି Checkout Page କୁ ଯିବା
      navigate("/checkout", { 
          state: { 
              items: cartItems,
              totals: {
                  subtotal: totals.subtotal,
                  tax: totals.tax,
                  grandTotal: grandTotal
              }
          } 
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pt-12 md:pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* ... Header Section ... */}
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* === LEFT: CART ITEMS LIST === */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {cartItems.map((item) => {
                const itemBaseTotal = item.price * item.quantity;
                const itemTax = itemBaseTotal * ((item.gstRate || 0) / 100);
                const itemFinalTotal = itemBaseTotal + itemTax;

                // ଧ୍ୟାନ ଦିଅନ୍ତୁ: map ରେ key ଦେଲାବେଳେ id ସହିତ size ମଧ୍ୟ ଯୋଡନ୍ତୁ, ନହେଲେ ଦୁଇଟି ଅଲଗା ସାଇଜ୍ ର ସମାନ ପ୍ରଡକ୍ଟ ଥିଲେ key error ଆସିବ
                return (
                  <div key={`${item.id}-${item.selectedSize}`} className="group flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white border border-gray-100 shadow-sm p-4 rounded-xl hover:shadow-md transition-shadow">
                    
                    {/* ... Image Section ... */}
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                          <div className="flex-1 pr-4">
                              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                                {item.category}
                              </p>
                              <h3 className="text-lg font-serif font-bold leading-tight text-gray-900">
                                {item.title}
                              </h3>
                              {/* [NEW] Size ଦେଖାଇବା ପାଇଁ */}
                              {item.selectedSize && (
                                <p className="text-sm text-gray-600 mt-1">Size: <span className="font-bold">{item.selectedSize.toUpperCase()}</span></p>
                              )}
                          </div>
                          
                          {/* ... Price Section ... */}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 sm:mt-0">
                        <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-1 border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, -1)} // [UPDATED]
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-200 rounded transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)} // [UPDATED]
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-200 rounded transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize)} // [UPDATED]
                          className="text-xs font-bold text-gray-400 hover:text-red-600 uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                        >
                          <Trash2 size={16} /> <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* === RIGHT: ORDER SUMMARY (Sticky) === */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6 md:p-8">
                
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Order Summary</h3>

                {/* BREAKDOWN */}
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(totals.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Estimated GST</span>
                    <span className="font-medium text-gray-900">
                      {formatPrice(totals.tax)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">
                      Free
                    </span>
                  </div>
                </div>

                {/* TOTAL AT BOTTOM */}
                <div className="mb-6">
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-base font-bold text-gray-900">Total</span>
                        <h2 className="text-3xl font-serif font-bold text-[#800020] tracking-tight leading-none">
                            {formatPrice(grandTotal)}
                        </h2>
                    </div>
                    <p className="text-right text-xs text-gray-500">Inclusive of all taxes</p>
                </div>

                {/* CHECKOUT BUTTON */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#800020] hover:bg-[#600018] text-white font-bold uppercase py-4 rounded-md text-sm tracking-widest transition-colors flex items-center justify-center gap-2 group mb-4 shadow-md shadow-[#800020]/20"
                >
                  Proceed to Checkout
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                  <ShieldCheck size={16} className="text-green-600" />
                  Secure Encrypted Checkout
                </div>

              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-gray-300 rounded-2xl bg-white shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Your bag is empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm text-center">
              Looks like you haven't added anything to your bag yet. Let's find you something beautiful.
            </p>
            <Link
              to={"/"}
              className="bg-[#800020] text-white px-8 py-3.5 rounded-md font-bold uppercase text-sm hover:bg-[#600018] transition-colors shadow-md shadow-[#800020]/20"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}