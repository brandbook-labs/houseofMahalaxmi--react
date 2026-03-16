import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Truck, ShieldCheck, Minus, Plus, ChevronDown, ChevronUp, Ruler, RotateCcw } from 'lucide-react';
import { getProductById } from '../services/apiService'; 
import { useCart } from '../context/CartContext'; 
import { toast } from 'sonner';


export default function ProductDetails() {
  const { slug } = useParams();   
  const { addToCart } = useCart(); 

  // ───────────── STATES ─────────────
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('details'); 

  // ───────────── FETCH API ─────────────
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const responseData = await getProductById(slug);
        if (responseData) {
          setProduct(responseData);
          // ଡିଫଲ୍ଟ ସାଇଜ୍ ସିଲେକ୍ଟ କରିବା
          if (responseData.sizes && responseData.sizes.length > 0) {
              const availableSize = responseData.sizes.find(s => s.stock > 0);
              if (availableSize) setSelectedSize(availableSize.sizeName);
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
  };

  // ───────────── [NEW] PRICE CALCULATION LOGIC ─────────────
  // ୟୁଜର୍ ବାଛିଥିବା ସାଇଜ୍ ର ଡାଟା ଖୋଜିବା
  const activeSizeData = product?.sizes?.find(s => s.sizeName === selectedSize);
  
  // ଯଦି activeSizeData ରେ additionalPrice ଅଛି, ତେବେ ତାକୁ ମେନ୍ ପ୍ରାଇସ୍ ସହ ମିଶାଇବା ନଚେତ୍ ୦
  const extraPrice = activeSizeData?.additionalPrice || 0;
  
  // ଫାଇନାଲ୍ ପ୍ରାଇସ୍ ଯାହାକି ୟୁଜର୍ କୁ ଦେଖାଯିବ ଏବଂ କାର୍ଟ କୁ ଯିବ
  const currentSellingPrice = (product?.originalPrice || 0) + extraPrice;
  const currentMRP = (product?.mrp || 0) + extraPrice;

  // ───────────── ADD TO CART LOGIC ─────────────
  const handleAddToCart = () => {
      if (!selectedSize && product.sizes?.length > 0) {
          toast.error("Please select a size first!");
          return;
      }

      // [NEW] କାର୍ଟ କୁ ପଠାଇବା ପୂର୍ବରୁ ଆମେ product ର price କୁ ଅପଡେଟ୍ କରି ପଠାଉଛୁ
      // ଯାହାଦ୍ୱାରା CartContext ସେହି ବଦଳିଥିବା ଦାମ୍ (currentSellingPrice) କୁ ସେଭ୍ କରିବ
      const productWithUpdatedPrice = {
          ...product,
          originalPrice: currentSellingPrice, 
          mrp: currentMRP
      };

      addToCart(productWithUpdatedPrice, selectedSize || 'Free Size', quantity); 
      
      toast.success("Item added to your bag! 🛍️", {
          description: `${product.name} (${selectedSize?.toUpperCase()})`
      }); 
  };

  if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020]"></div></div>;
  }

  if (!product) {
      return <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">Product not found!</div>;
  }

  const displayImages = product.productImages?.length > 0 ? product.productImages : ['https://images.unsplash.com/photo-1583391733958-d25e0b46410f?q=80&w=600&auto=format&fit=crop'];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- BREADCRUMBS --- */}
        <nav className="flex text-xs font-medium text-gray-500 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-[#800020] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          {product.department && (
              <>
                  <Link to={`/department/${product.department}`} className="hover:text-[#800020] transition-colors">{product.department}</Link>
                  <span className="mx-2">/</span>
              </>
          )}
          <span className="text-gray-900 truncate">{product.name}</span>
        </nav>

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16`}>
          
          {/* ========================================== */}
          {/* LEFT: IMAGE GALLERY                        */}
          {/* ========================================== */}
          <div className="lg:col-span-7 flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
             <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:w-24 shrink-0 scrollbar-hide snap-x">
                {displayImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative w-20 h-24 lg:w-full lg:h-32 rounded-lg overflow-hidden shrink-0 snap-center transition-all duration-300 border-2 ${
                      selectedImage === idx ? 'border-[#800020]' : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
             </div>

             <div className="w-full aspect-[3/4] md:aspect-[4/5] bg-gray-100 rounded-2xl overflow-hidden relative">
                <img 
                  src={displayImages[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover object-top"
                />
             </div>
          </div>

          {/* ========================================== */}
          {/* RIGHT: PRODUCT INFO                        */}
          {/* ========================================== */}
          <div className="lg:col-span-5 flex flex-col">
            
            <p className="text-[#800020] font-medium text-xs tracking-widest uppercase mb-2">
              {product.productType ? product.productType.replace('_', ' ') : 'Premium Collection'}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 leading-tight mb-4">
              {product.name}
            </h1>

            {product.averageRating > 0 && (
                <div className="flex items-center gap-4 mb-6">
                   <div className="flex items-center gap-1">
                     {[...Array(5)].map((_, i) => (
                       <Star key={i} size={16} className={i < Math.floor(product.averageRating) ? "fill-[#D4AF37] text-[#D4AF37]" : "text-gray-300"} />
                     ))}
                   </div>
                   <span className="text-sm font-medium text-gray-500 underline decoration-gray-300">
                     {product.totalReviews} Reviews
                   </span>
                </div>
            )}

            {/* [UPDATED] ଡାଇନାମିକ୍ ପ୍ରାଇସ୍ ଦେଖାଇବା (currentSellingPrice ବ୍ୟବହାର କରାଯାଇଛି) */}
            <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-200">
               <span className="text-3xl font-serif font-bold text-gray-900 leading-none transition-all duration-300">
                 {formatPrice(currentSellingPrice)}
               </span>
               {currentMRP > currentSellingPrice && (
                 <>
                     <span className="text-lg text-gray-400 line-through mb-0.5 transition-all duration-300">
                       {formatPrice(currentMRP)}
                     </span>
                     <span className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1 ml-2 bg-green-50 px-2 py-1 rounded-sm">
                       Save {formatPrice(currentMRP - currentSellingPrice)}
                     </span>
                 </>
               )}
            </div>

            {product.description && (
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  {product.description}
                </p>
            )}

            {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                   <div className="flex justify-between items-center mb-4">
                     <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Select Size</h3>
                     <button className="flex items-center gap-1 text-xs font-medium text-[#800020] hover:underline">
                       <Ruler size={14} /> Size Guide
                     </button>
                   </div>
                   <div className="flex flex-wrap gap-3">
                     {product.sizes.map((sizeObj, idx) => {
                         const isOutOfStock = sizeObj.stock === 0;
                         return (
                             <button
                               key={idx}
                               disabled={isOutOfStock}
                               onClick={() => setSelectedSize(sizeObj.sizeName)}
                               className={`px-4 py-3 border rounded-md text-sm font-medium transition-all ${
                                 isOutOfStock 
                                   ? 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed' 
                                   : selectedSize === sizeObj.sizeName
                                     ? 'border-[#800020] bg-[#800020]/5 text-[#800020] shadow-sm' 
                                     : 'border-gray-300 text-gray-600 hover:border-gray-400'
                               }`}
                             >
                               {/* ସାଇଜ୍ ନାମ ସହ ତାହାର additional price ଅଛି କି ନାହିଁ ଦେଖାଇବା (UX Improvement) */}
                               {sizeObj.sizeName.toUpperCase()} 
                               {sizeObj.additionalPrice > 0 && selectedSize !== sizeObj.sizeName && (
                                   <span className="ml-1 text-[10px] text-gray-400">(+{sizeObj.additionalPrice})</span>
                               )}
                             </button>
                         )
                     })}
                   </div>
                </div>
            )}

            {/* ... (ବାକି ସବୁ Button ଏବଂ Accordion କୋଡ୍ ସମାନ ରହିବ, କୌଣସି ପରିବର୍ତ୍ତନ ନାହିଁ) ... */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
               <div className="flex items-center justify-between border border-gray-300 rounded-md px-4 py-3 w-full sm:w-32 bg-white">
                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-gray-500 hover:text-gray-900"><Minus size={16} /></button>
                 <span className="font-bold text-gray-900">{quantity}</span>
                 <button onClick={() => setQuantity(quantity + 1)} className="text-gray-500 hover:text-gray-900"><Plus size={16} /></button>
               </div>
               
               <button onClick={handleAddToCart} className="flex-1 bg-[#800020] hover:bg-[#600018] text-white font-bold uppercase tracking-widest text-sm py-4 rounded-md transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#800020]/20">
                 <ShoppingBag size={18} /> Add to Bag
               </button>
            </div>

            {/* ───────────── TRUST BADGES ───────────── */}
            <div className="grid grid-cols-2 gap-4 mb-10 p-5 bg-gray-50 rounded-xl border border-gray-100">
               <div className="flex items-center gap-3"><Truck size={20} className="text-[#800020]" /><div><p className="text-sm font-bold text-gray-900">Free Shipping</p><p className="text-xs text-gray-500">On orders over ₹5000</p></div></div>
               <div className="flex items-center gap-3"><RotateCcw size={20} className="text-[#800020]" /><div><p className="text-sm font-bold text-gray-900">Easy Returns</p><p className="text-xs text-gray-500">7-day return policy</p></div></div>
               <div className="col-span-2 flex items-center gap-3 mt-2 pt-4 border-t border-gray-200"><ShieldCheck size={20} className="text-[#800020]" /><div><p className="text-sm font-bold text-gray-900">Cash on Delivery</p><p className="text-xs text-gray-500">Available across all major pin codes</p></div></div>
            </div>

            {/* ───────────── ACCORDIONS ───────────── */}
            <div className="border-t border-gray-200">
               
               {product.productDetails && (Object.keys(product.productDetails).length > 0) && (
                   <div className="border-b border-gray-200">
                     <button onClick={() => setActiveAccordion(activeAccordion === 'details' ? null : 'details')} className="w-full py-5 flex justify-between items-center text-left">
                       <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Product Details</span>
                       {activeAccordion === 'details' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === 'details' ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="space-y-3">
                          {product.productDetails.fabric && (<li className="flex flex-col sm:flex-row text-sm"><span className="font-bold text-gray-900 sm:w-1/3">Fabric:</span><span className="text-gray-600 sm:w-2/3">{product.productDetails.fabric}</span></li>)}
                          {product.productDetails.work && (<li className="flex flex-col sm:flex-row text-sm"><span className="font-bold text-gray-900 sm:w-1/3">Work:</span><span className="text-gray-600 sm:w-2/3">{product.productDetails.work}</span></li>)}
                          {product.productDetails.inclusions && (<li className="flex flex-col sm:flex-row text-sm"><span className="font-bold text-gray-900 sm:w-1/3">Inclusions:</span><span className="text-gray-600 sm:w-2/3">{product.productDetails.inclusions}</span></li>)}
                        </ul>
                     </div>
                   </div>
               )}

               <div className="border-b border-gray-200">
                 <button onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? null : 'shipping')} className="w-full py-5 flex justify-between items-center text-left">
                   <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Shipping & Delivery</span>
                   {activeAccordion === 'shipping' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                 </button>
                 <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === 'shipping' ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {product.shippingInfo ? product.shippingInfo : "Standard orders are dispatched within 2-3 business days. Custom-fit orders require an additional 5-7 days for tailoring. You will receive a tracking link via email once your order is shipped."}
                    </p>
                 </div>
               </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}