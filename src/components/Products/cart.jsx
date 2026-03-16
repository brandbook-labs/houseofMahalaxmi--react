import React, { useMemo } from "react";
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck, ShoppingBag, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from 'sonner'; 

export default function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // [UPDATED] ଭାରତରେ Price ରେ ପୂର୍ବରୁ GST ଥାଏ, ତେଣୁ ଅଲଗା Tax ହିସାବ ଦରକାର ନାହିଁ
  const totals = useMemo(() => {
    return cartItems.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;
        return {
            subtotal: acc.subtotal + itemTotal
        };
    }, { subtotal: 0 });
  }, [cartItems]);

  const grandTotal = totals.subtotal;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
  };

  const handleRemove = (id, size, name) => {
      removeFromCart(id, size);
      toast.error("Item removed from bag 🗑️", {
          description: name,
          position: 'top-center'
      });
  };

  const handleCheckout = () => {
      navigate("/checkout", { 
          state: { 
              items: cartItems,
              totals: { subtotal: totals.subtotal, tax: 0, grandTotal: grandTotal }
          } 
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pt-12 md:pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* === LEFT: CART ITEMS LIST === */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {cartItems.map((item) => {
                const itemImage = (item.productImages && item.productImages.length > 0) 
                                    ? item.productImages[0] 
                                    : item.image || item.img || 'https://images.unsplash.com/photo-1583391733958-d25e0b46410f?q=80&w=600&auto=format&fit=crop';

                return (
                  <div key={`${item.id}-${item.selectedSize}`} className="group flex flex-col sm:flex-row gap-4 sm:gap-6 bg-white border border-gray-100 shadow-sm p-4 rounded-xl hover:shadow-md transition-shadow">
                    
                    <Link to={`/products/${item.slug || item.id}`} className="shrink-0 w-24 sm:w-32 aspect-[3/4] overflow-hidden rounded-lg bg-gray-50 block">
                        <img src={itemImage} alt={item.title} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                    </Link>
                    
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                          <div className="flex-1 pr-4">
                              <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1">
                                {item.category || item.department || 'Fashion'}
                              </p>
                              <Link to={`/products/${item.slug || item.id}`} className="text-lg font-serif font-bold leading-tight text-gray-900 hover:text-[#800020] transition-colors line-clamp-2">
                                {item.title || item.name}
                              </Link>
                              {item.selectedSize && (
                                <p className="text-sm text-gray-600 mt-1 bg-gray-100 inline-block px-2 py-0.5 rounded-md border border-gray-200">
                                    Size: <span className="font-bold">{item.selectedSize.toUpperCase()}</span>
                                </p>
                              )}
                          </div>
                          
                          <div className="text-left sm:text-right shrink-0 mt-2 sm:mt-0">
                              <p className="text-lg font-bold text-gray-900">{formatPrice(item.price)}</p>
                              {item.mrp && item.mrp > item.price && (
                                  <p className="text-xs text-gray-400 line-through">{formatPrice(item.mrp)}</p>
                              )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 sm:mt-0 border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">
                        <div className="flex items-center gap-4 bg-gray-50 rounded-lg p-1 border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-200 rounded transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-medium w-6 text-center text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black hover:bg-gray-200 rounded transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => handleRemove(item.id, item.selectedSize, item.title || item.name)}
                          className="text-xs font-bold text-gray-400 hover:text-red-600 uppercase tracking-wider flex items-center gap-1.5 transition-colors p-2 hover:bg-red-50 rounded-md"
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
                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">{formatPrice(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>

                  {/* [NEW] Enhanced GST & Tax Note - Trust Badge UI */}
                  <div className="bg-green-50 rounded-lg p-3 mt-4 border border-green-100 flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-green-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 leading-relaxed">
                      <span className="font-bold text-gray-900">No Hidden Charges:</span> GST and all applicable duties are already included in the subtotal price.
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                    <div className="flex justify-between items-end mb-1">
                        <span className="text-base font-bold text-gray-900">Total Amount</span>
                        <h2 className="text-3xl font-serif font-bold text-[#800020] tracking-tight leading-none">
                            {formatPrice(grandTotal)}
                        </h2>
                    </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#800020] hover:bg-[#600018] text-white font-bold uppercase py-4 rounded-md text-sm tracking-widest transition-colors flex items-center justify-center gap-2 group mb-4 shadow-md shadow-[#800020]/20"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-medium">
                  <ShieldCheck size={16} className="text-green-600" />
                  Secure Encrypted Checkout
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 border border-dashed border-gray-300 rounded-2xl bg-white shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">Your bag is empty</h2>
            <p className="text-gray-500 mb-8 max-w-sm text-center">Looks like you haven't added anything to your bag yet. Let's find you something beautiful.</p>
            <Link to={"/"} className="bg-[#800020] text-white px-8 py-3.5 rounded-md font-bold uppercase text-sm hover:bg-[#600018] transition-colors shadow-md shadow-[#800020]/20">
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}