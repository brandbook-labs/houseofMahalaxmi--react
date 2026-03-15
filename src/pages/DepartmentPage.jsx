import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ShoppingBag, Heart, Eye, Star, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllProducts } from '../services/apiService';
import ProductCard from '../components/Card/ProductCard';

export default function DepartmentPage() {
  const { category } = useParams(); 
  
  // ───────────── STATES ─────────────
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Pagination State (API ରୁ ଆସୁଥିବା ଡାଟା ପାଇଁ)
  const [pagination, setPagination] = useState({
    totalProducts: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 12
  });

  // Sorting & Filtering State
  const [sortBy, setSortBy] = useState('newest'); // ଡିଫଲ୍ଟ ନୂଆ ପ୍ରଡକ୍ଟ ଆସିବ
  const [curatedFilter, setCuratedFilter] = useState(''); // trending କିମ୍ବା best_sellers ପାଇଁ

// ───────────── FETCH API ─────────────
  useEffect(() => {
    const fetchDepartmentProducts = async () => {
      setIsLoading(true);
      try {
        const params = { 
            department: category,
            page: pagination.currentPage,
            sort: sortBy 
        };

        if (curatedFilter) {
            params.curatedCollection = curatedFilter;
        }

        // ବର୍ତ୍ତମାନ response ସିଧାସଳଖ { products: [...], pagination: {...} } ଆଣିବ
        const responseData = await getAllProducts(params);
        
        if (responseData) {
          setProducts(responseData.products);
          setPagination(responseData.pagination);
        } else {
          // ଯଦି କୌଣସି ଏରର୍ ଆସେ କିମ୍ବା ଡାଟା ନଥାଏ
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartmentProducts();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
  }, [category, pagination.currentPage, sortBy, curatedFilter]);

  // Page ବଦଳିଲେ currentPage ରିସେଟ୍ କରନ୍ତୁ
  useEffect(() => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setCuratedFilter(''); // ନୂଆ ପେଜ୍ କୁ ଗଲେ ଫିଲ୍ଟର୍ କ୍ଲିୟର୍ ହେବ
  }, [category]);

  const formatCategoryName = (str) => {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const displayName = formatCategoryName(category);

  // ───────────── PAGINATION HANDLERS ─────────────
  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
        setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const handlePrevPage = () => {
    if (pagination.currentPage > 1) {
        setPagination(prev => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <nav className="flex text-xs font-medium text-gray-500 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-[#800020] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{displayName}</span>
        </nav>

        <div className={`mb-12 transition-all duration-700 ease-out transform ${!isLoading ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            {displayName}'s Collection
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Explore our exclusive range of fashion curated perfectly for {displayName.toLowerCase()}.
          </p>
        </div>

        {/* ───────────── FILTER & SORT SECTION ───────────── */}
        <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 py-4 mb-8 border-y border-gray-200 transition-all duration-700 delay-100`}>
           <div className="text-sm font-medium text-gray-500">
             Showing {products.length} of {pagination.totalProducts} products
           </div>
           
           <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
              {/* Quick Filters (Curated Collections) */}
              <div className="flex gap-2">
                 <button 
                    onClick={() => setCuratedFilter(curatedFilter === 'trending' ? '' : 'trending')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${curatedFilter === 'trending' ? 'bg-[#800020] text-white border-[#800020]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                 >
                    🔥 Trending
                 </button>
                 <button 
                    onClick={() => setCuratedFilter(curatedFilter === 'best_sellers' ? '' : 'best_sellers')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors border ${curatedFilter === 'best_sellers' ? 'bg-[#800020] text-white border-[#800020]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
                 >
                    ⭐ Best Sellers
                 </button>
              </div>

              {/* <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                 <SlidersHorizontal size={16} /> Filters
              </button> */}
              
              {/* Sort Dropdown */}
              <div className="relative w-full sm:w-auto">
                 <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)} 
                    className="appearance-none w-full sm:w-auto bg-transparent border border-gray-300 rounded-md py-2 pl-4 pr-10 text-sm font-medium text-gray-700 focus:outline-none focus:border-[#800020] cursor-pointer"
                 >
                   <option value="newest">Newest Arrivals</option>
                   <option value="price_low">Price: Low to High</option>
                   <option value="price_high">Price: High to Low</option>
                 </select>
                 <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
           </div>
        </div>

        {/* ───────────── PRODUCT GRID ───────────── */}
        {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020]"></div>
            </div>
        ) : products.length === 0 ? (
            <div className="text-center text-gray-500 py-12 flex flex-col items-center">
                <ShoppingBag size={48} className="text-gray-300 mb-4" />
                <p className="text-lg">No products found for this selection.</p>
                <button 
                    onClick={() => { setCuratedFilter(''); setSortBy('newest'); }} 
                    className="mt-4 text-[#800020] underline font-medium"
                >
                    Clear Filters
                </button>
            </div>
        ) : (
            <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
                  {products.map((product) => <ProductCard key={product._id} product={product} />)}
                </div>

                {/* ───────────── PAGINATION CONTROLS ───────────── */}
                {pagination.totalPages > 1 && (
                    <div className="mt-16 flex items-center justify-center gap-4">
                        <button 
                            onClick={handlePrevPage}
                            disabled={pagination.currentPage === 1}
                            className={`p-2 rounded-full border ${pagination.currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors'}`}
                        >
                            <ChevronLeft size={20} />
                        </button>
                        
                        <span className="text-sm font-medium text-gray-700">
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </span>

                        <button 
                            onClick={handleNextPage}
                            disabled={pagination.currentPage === pagination.totalPages}
                            className={`p-2 rounded-full border ${pagination.currentPage === pagination.totalPages ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors'}`}
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </>
        )}
      </div>
    </div>
  );
}

// ───────────── PRODUCT CARD COMPONENT ─────────────
// const ProductCard = ({ product }) => {
//   const { addToCart } = useCart(); // ଗ୍ଲୋବାଲ୍ Cart ଫଙ୍କସନ୍
  
//   const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

//   const displayImage = product.productImages && product.productImages.length > 0 
//         ? product.productImages[0] 
//         : 'https://images.unsplash.com/photo-1583391733958-d25e0b46410f?q=80&w=600&auto=format&fit=crop';

//   // ───────────── ୧. SLUG FALLBACK LOGIC ─────────────
//   // ଯଦି slug ଅଛି, ତାକୁ ବ୍ୟବହାର କରନ୍ତୁ। ନଚେତ୍ ନାମକୁ ଛୋଟ ଅକ୍ଷର କରି ସ୍ପେସ୍ ବଦଳରେ '-' ଲଗାନ୍ତୁ।
//   const productIdentifier = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
//   const productLink = `/products/${productIdentifier}`;

//   // ───────────── ୨. QUICK ADD TO CART ─────────────
//   const handleQuickAdd = (e) => {
//       e.preventDefault();   // ଲିଙ୍କ୍ କ୍ଲିକ୍ ହେବାକୁ ଦେବ ନାହିଁ (ପେଜ୍ ରିଡାଇରେକ୍ଟ ଅଟକାଇବ)
//       e.stopPropagation();  // ପ୍ୟାରେଣ୍ଟ୍ କମ୍ପୋନେଣ୍ଟ୍ କୁ କ୍ଲିକ୍ ଇଭେଣ୍ଟ୍ ଯିବାକୁ ଦେବ ନାହିଁ

//       // Department ପେଜ୍ ରେ ୟୁଜର୍ ସାଇଜ୍ ବାଛିବାର ଅପସନ୍ ନଥାଏ। 
//       // ତେଣୁ ଆମେ ପ୍ରଥମ ଉପଲବ୍ଧ ସାଇଜ୍ ବା 'Free Size' ଡିଫଲ୍ଟ ଭାବରେ ନେବା।
//       let defaultSize = 'Free Size';
//       if (product.sizes && product.sizes.length > 0) {
//           const availableSize = product.sizes.find(s => s.stock > 0);
//           if (availableSize) defaultSize = availableSize.sizeName;
//       }

//       // ଗ୍ଲୋବାଲ୍ କାର୍ଟ କୁ ପଠାନ୍ତୁ (Cart Icon ସଙ୍ଗେ ସଙ୍ଗେ ଅପଡେଟ୍ ହେବ)
//       addToCart(product, defaultSize, 1);
//   };

//   return (
//     // ସମ୍ପୂର୍ଣ୍ଣ କାର୍ଡ ଟି ଏବେ ଗୋଟିଏ କ୍ଲିକେବଲ୍ (clickable) ଲିଙ୍କ୍
//     <Link to={productLink} className="group flex flex-col cursor-pointer block">
      
//       <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-lg mb-4">
//         <img src={displayImage} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        
//         {product.curatedCollection?.includes('best_sellers') && (
//             <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-gray-900 uppercase tracking-wider rounded-sm shadow-sm z-10">
//                 Bestseller
//             </div>
//         )}
        
//         {/* Hover Overlay Actions */}
//         <div className="hidden lg:flex absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/50 to-transparent z-20">
//           <div className="flex w-full gap-2 justify-center">
            
//             {/* ADD TO BAG ବଟନ୍ */}
//             <button 
//                 onClick={handleQuickAdd}
//                 className="flex-1 bg-white text-gray-900 py-2.5 rounded-sm font-medium hover:bg-[#800020] hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
//             >
//                 <ShoppingBag size={16} /> Add
//             </button>
            
//             <button 
//                 onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* Wishlist Logic */ }}
//                 className="p-2.5 bg-white text-gray-900 rounded-sm hover:text-[#800020] transition-colors"
//             >
//                 <Heart size={18} />
//             </button>
            
//             {/* EYE ବଟନ୍ ମଧ୍ୟ ସେହି ସମାନ ଲିଙ୍କ୍ କୁ ନେବ, କିନ୍ତୁ କୌଣସି ଅତିରିକ୍ତ Link ଟ୍ୟାଗ୍ ଦରକାର ନାହିଁ */}
//             <div className="p-2.5 bg-white text-gray-900 rounded-sm hover:text-gray-600 transition-colors">
//                 <Eye size={18} />
//             </div>
//           </div>
//         </div>

//         {/* Mobile Quick Add Button */}
//         <button 
//             onClick={handleQuickAdd}
//             className="lg:hidden absolute bottom-2 right-2 h-10 w-10 bg-white/90 backdrop-blur-sm text-gray-900 flex items-center justify-center rounded-full shadow-md active:scale-95 transition-transform z-20"
//         >
//             <ShoppingBag size={18} />
//         </button>
//       </div>

//       <div className="flex-1 flex flex-col">
//         <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mb-1">
//             {product.productType ? product.productType.replace('_', ' ') : 'Fashion'}
//         </p>
//         <h3 className="text-sm md:text-base font-serif font-medium text-gray-900 group-hover:text-[#800020] transition-colors leading-snug line-clamp-2 mb-2">
//             {product.name}
//         </h3>
        
//         <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//           <div className="flex items-center gap-2">
//             <span className="text-base md:text-lg font-bold text-gray-900">{formatPrice(product.originalPrice)}</span>
//             {product.mrp > product.originalPrice && (
//                 <span className="text-xs text-gray-400 line-through">{formatPrice(product.mrp)}</span>
//             )}
//           </div>
          
//           {product.averageRating > 0 && (
//             <div className="flex items-center gap-1">
//                 <Star size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
//                 <span className="text-xs text-gray-500">{product.averageRating}</span>
//             </div>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };