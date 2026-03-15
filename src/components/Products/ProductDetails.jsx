import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Truck, ShieldCheck, Minus, Plus, ChevronDown, ChevronUp, Ruler, RotateCcw } from 'lucide-react';
import { getProductById } from '../../services/apiService'; // ଆପଣଙ୍କ API ସର୍ଭିସ୍
import { useCart } from '../../context/CartContext'; // Cart Hook

export default function ProductDetails() {
  const { slug } = useParams(); 
  const { addToCart } = useCart(); // ଗ୍ଲୋବାଲ୍ କାର୍ଟ ଅପଡେଟ୍ କରିବା ପାଇଁ

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
          // ଯଦି ପ୍ରଡକ୍ଟ ର sizes ଅଛି ଏବଂ stock > 0, ପ୍ରଥମ ସାଇଜ୍ ସିଲେକ୍ଟ କରନ୍ତୁ
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

  const handleAddToCart = () => {
      if (!selectedSize && product.sizes?.length > 0) {
          alert("Please select a size first!");
          return;
      }
      addToCart(quantity); // ଗ୍ଲୋବାଲ୍ କାର୍ଟ ଷ୍ଟେଟ୍ ଅପଡେଟ୍ ହେବ
      // ଏଠାରେ ଆପଣ ଏକ ସୁନ୍ଦର Toast ମେସେଜ୍ ମଧ୍ୟ ଦେଖାଇ ପାରିବେ
  };

  if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020]"></div></div>;
  }

  if (!product) {
      return <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">Product not found!</div>;
  }

  // Fallback ଇମେଜ୍ ଯଦି ଆରେ (Array) ଖାଲି ଥାଏ
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

            {/* Rating (ଖାଲି ଥିଲେ ଦେଖାଇବ ନାହିଁ) */}
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

            {/* Price */}
            <div className="flex items-end gap-3 mb-6 pb-6 border-b border-gray-200">
               <span className="text-3xl font-serif font-bold text-gray-900 leading-none">
                 {formatPrice(product.originalPrice)}
               </span>
               {product.mrp > product.originalPrice && (
                 <>
                     <span className="text-lg text-gray-400 line-through mb-0.5">
                       {formatPrice(product.mrp)}
                     </span>
                     <span className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1 ml-2 bg-green-50 px-2 py-1 rounded-sm">
                       Save {formatPrice(product.mrp - product.originalPrice)}
                     </span>
                 </>
               )}
            </div>

            {product.description && (
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  {product.description}
                </p>
            )}

            {/* Sizes (ଖାଲି ଥିଲେ ଦେଖାଇବ ନାହିଁ) */}
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
                               {sizeObj.sizeName.toUpperCase()}
                             </button>
                         )
                     })}
                   </div>
                </div>
            )}

            {/* Add to Cart Actions */}
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

            {/* Accordions (Product Details Mapping) */}
            <div className="border-t border-gray-200">
               {product.productDetails && (Object.keys(product.productDetails).length > 0) && (
                   <div className="border-b border-gray-200">
                     <button onClick={() => setActiveAccordion(activeAccordion === 'details' ? null : 'details')} className="w-full py-5 flex justify-between items-center text-left">
                       <span className="text-sm font-bold uppercase tracking-widest text-gray-900">Product Details</span>
                       {activeAccordion === 'details' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ${activeAccordion === 'details' ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <ul className="space-y-3">
                          {/* କେବଳ ଭ୍ୟାଲୁ ଥିଲେ ହିଁ ରେଣ୍ଡର୍ ହେବ */}
                          {product.productDetails.fabric && (
                              <li className="flex flex-col sm:flex-row text-sm"><span className="font-bold text-gray-900 sm:w-1/3">Fabric:</span><span className="text-gray-600 sm:w-2/3">{product.productDetails.fabric}</span></li>
                          )}
                          {product.productDetails.work && (
                              <li className="flex flex-col sm:flex-row text-sm"><span className="font-bold text-gray-900 sm:w-1/3">Work:</span><span className="text-gray-600 sm:w-2/3">{product.productDetails.work}</span></li>
                          )}
                          {product.productDetails.inclusions && (
                              <li className="flex flex-col sm:flex-row text-sm"><span className="font-bold text-gray-900 sm:w-1/3">Inclusions:</span><span className="text-gray-600 sm:w-2/3">{product.productDetails.inclusions}</span></li>
                          )}
                        </ul>
                     </div>
                   </div>
               )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}