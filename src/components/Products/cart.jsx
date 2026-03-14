import React, { useState, useMemo } from "react";
import {
  Trash2,
  Minus,
  Plus,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- MOCK CART DATA ---
const INITIAL_CART = [
  {
    id: 1,
    title: "Social Media Monthly - Heavy",
    category: "Graphics",
    type: "MONTHLY",
    price: 89000,
    gstRate: 18,
    image: "https://images.unsplash.com/photo-1626785774573-4b799312c95d?w=800&q=80",
    quantity: 1,
  },
  {
    id: 3,
    title: "Dukan/Store Website",
    category: "Website",
    type: "DEV",
    price: 1000,
    gstRate: 18,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    quantity: 1,
  },
  {
    id: 9,
    title: "Promotional Brochures",
    category: "Print",
    type: "BULK",
    price: 15,
    gstRate: 5,
    image: "https://images.unsplash.com/photo-1628260412297-a3377e45006f?w=800&q=80",
    quantity: 100,
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const navigate = useNavigate();

  // --- CALCULATIONS ---
  const totals = useMemo(() => {
    return cartItems.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;
        const itemTax = itemTotal * (item.gstRate / 100);
        
        return {
            subtotal: acc.subtotal + itemTotal,
            tax: acc.tax + itemTax
        };
    }, { subtotal: 0, tax: 0 });
  }, [cartItems]);

  const grandTotal = totals.subtotal + totals.tax;

  // Handlers
  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleCheckout = () => {
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
    <div className="min-h-screen bg-[#050505] text-white font-sans pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* --- HEADER --- */}
        <div className="mb-8 md:mb-12 border-b border-white/10 pb-6">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D4E821] text-xs font-mono uppercase tracking-widest mb-4 transition-colors"
          >
            <ArrowLeft size={12} /> Continue Shopping
          </a>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-none">
            Your <span className="text-gray-600">Cart</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-mono">
            {cartItems.length} Services Selected
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            
            {/* === LEFT: CART ITEMS LIST === */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {cartItems.map((item) => {
                // Per Item Calculations
                const itemBaseTotal = item.price * item.quantity;
                const itemTax = itemBaseTotal * (item.gstRate / 100);
                const itemFinalTotal = itemBaseTotal + itemTax;

                return (
                  <div
                    key={item.id}
                    className="group flex flex-col sm:flex-row gap-4 sm:gap-6 bg-[#0a0a0a] border border-white/10 p-4 rounded-xl hover:border-white/20 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-full sm:w-32 h-32 sm:h-32 rounded-lg overflow-hidden bg-[#111] border border-white/5 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1 pr-4">
                              <h3 className="text-lg font-bold uppercase leading-tight">
                                {item.title}
                              </h3>
                              <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-gray-500 tracking-wider mt-2">
                                  <span className="bg-white/5 px-2 py-0.5 rounded">
                                  {item.category}
                                  </span>
                                  <span>•</span>
                                  <span>{item.type}</span>
                              </div>
                          </div>

                          {/* --- UPDATED ITEM PRICE DISPLAY --- */}
                          <div className="text-right">
                              {/* 1. Top Right: Total Value (Inclusive) */}
                              <span className="block text-xl font-bold text-[#D4E821] font-mono leading-none">
                                  {formatPrice(itemFinalTotal)}
                              </span>
                              
                              {/* 2. Bottom Message: Base + GST% */}
                              <span className="block text-[10px] text-gray-500 font-mono mt-1">
                                  {formatPrice(itemBaseTotal)} + {item.gstRate}% GST
                              </span>
                          </div>
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4 bg-[#111] rounded-lg p-1 border border-white/10">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-mono w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-xs font-bold text-gray-500 hover:text-red-500 uppercase tracking-wider flex items-center gap-1 transition-colors"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* === RIGHT: ORDER SUMMARY (Sticky) === */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 md:p-8">
                
                {/* 1. TOTAL AT TOP */}
                <div className="mb-6 pb-6 border-b border-white/10">
                    <p className="text-xs font-bold uppercase text-gray-500 tracking-widest mb-1">Total Payable</p>
                    <div className="flex items-baseline gap-1">
                        <h2 className="text-4xl font-black text-[#D4E821] tracking-tight">
                            {formatPrice(grandTotal)}
                        </h2>
                    </div>
                </div>

                {/* 2. BREAKDOWN */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Taxable Value</span>
                    <span className="text-white font-mono">
                      {formatPrice(totals.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Total GST</span>
                    <span className="text-white font-mono">
                      {formatPrice(totals.tax)}
                    </span>
                  </div>

                  {/* Promo Code */}
                  <div className="pt-4">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          type="text"
                          placeholder="Promo Code"
                          className="w-full bg-[#111] border border-white/10 rounded text-xs py-2.5 pl-9 pr-3 text-white placeholder-gray-600 focus:border-[#D4E821] focus:outline-none transition-colors uppercase font-mono"
                        />
                      </div>
                      <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase px-3 rounded transition-colors">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. CHECKOUT BUTTON */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#D4E821] hover:bg-white text-black font-bold uppercase py-4 rounded text-sm tracking-widest transition-colors flex items-center justify-center gap-2 group mb-4"
                >
                  Proceed to Checkout
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>

                {/* 4. BOTTOM MESSAGE */}
                <div className="text-center bg-[#111] py-2 rounded border border-white/5">
                    <p className="text-xs font-mono text-gray-400">
                        {formatPrice(totals.subtotal)} + GST
                    </p>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-500 font-mono uppercase">
                  <ShieldCheck size={12} className="text-[#D4E821]" />
                  Secure SSL Payment
                </div>

              </div>
            </div>
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-xl bg-[#0a0a0a]">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6">
              <Trash2 size={24} className="text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Your cart is empty
            </h2>
            <a
              href="/shop"
              className="bg-[#D4E821] text-black px-8 py-3 rounded font-bold uppercase text-sm hover:bg-white transition-colors"
            >
              Browse Services
            </a>
          </div>
        )}
      </div>
    </div>
  );
}