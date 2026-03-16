import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ShoppingBag, Heart, Eye, Star, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllProducts } from '../services/apiService';
import ProductCard from '../components/Card/ProductCard';

export default function DepartmentPage() {
  // ୧. URL ରୁ ପାରାମିଟର୍ ଆଣିବା
  const { departmentId, collectionId, productType } = useParams(); 
  
  // ୨. ଡାଇନାମିକ୍ ଭାବରେ ଚେକ୍ କରିବା ଯେ ଏହା କେଉଁ ପେଜ୍ ଅଟେ (Smart Logic)
  let rawCategory = '';
  let filterKey = ''; // ବ୍ୟାକେଣ୍ଡ୍ API କୁ କେଉଁ ନାମରେ ଡାଟା ଯିବ ତାହା ଏଠାରେ ସେଭ୍ ହେବ

  if (collectionId) {
      rawCategory = collectionId;
      filterKey = 'collectionType'; // ବ୍ୟାକେଣ୍ଡ୍ ର collectionType ଫିଲ୍ଡ ପାଇଁ
  } else if (productType) {
      rawCategory = productType;
      filterKey = 'productType';    // ବ୍ୟାକେଣ୍ଡ୍ ର productType ଫିଲ୍ଡ ପାଇଁ (ଯେପରିକି 'saree', 'lehenga')
  } else if (departmentId) {
      rawCategory = departmentId;
      filterKey = 'department';     // ବ୍ୟାକେଣ୍ଡ୍ ର department ଫିଲ୍ଡ ପାଇଁ ('women', 'men')
  }

  // ୩. ବ୍ୟାକେଣ୍ଡ୍ ପାଇଁ ଫର୍ମାଟିଂ (Hyphen '-' କୁ Underscore '_' ରେ ବଦଳାଇବା)
  const apiFilterValue = rawCategory ? rawCategory.replace(/-/g, '_') : '';

  // ୪. ଫ୍ରଣ୍ଟଏଣ୍ଡ୍ (UI) ରେ ଦେଖାଇବା ପାଇଁ ଫର୍ମାଟିଂ 
  const displayName = rawCategory 
      ? rawCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') 
      : '';

  // ───────────── STATES ─────────────
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [pagination, setPagination] = useState({
    totalProducts: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 12
  });

  const [sortBy, setSortBy] = useState('newest'); 
  const [curatedFilter, setCuratedFilter] = useState(''); 

// ───────────── FETCH API ─────────────
  useEffect(() => {
    const fetchDepartmentProducts = async () => {
      setIsLoading(true);
      try {
        const params = { 
            page: pagination.currentPage,
            sort: sortBy 
        };

        // ୫. ସ୍ମାର୍ଟ୍ ଚେକ୍: ଏବେ ଆମକୁ ଜଣାଅଛି ଯେ API କୁ କଣ ପଠାଇବାକୁ ହେବ
        // ଯଦି filterKey ହେଉଛି 'productType' ଏବଂ value ହେଉଛି 'saree', ଏହା ଆପେ ଆପେ { productType: 'saree' } ହୋଇଯିବ
        if (filterKey && apiFilterValue) {
            params[filterKey] = apiFilterValue;
        }

        if (curatedFilter) {
            params.curatedCollection = curatedFilter;
        }

        const responseData = await getAllProducts(params);
        
        if (responseData) {
          setProducts(responseData.products || []);
          setPagination(responseData.pagination || { totalProducts: 0, totalPages: 1, currentPage: 1 });
        } else {
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
    
  // Dependency Array ରେ 'filterKey' କୁ ଯୋଡିବାକୁ ଭୁଲିବେ ନାହିଁ
  }, [rawCategory, filterKey, apiFilterValue, pagination.currentPage, sortBy, curatedFilter]);

  // Page ବଦଳିଲେ currentPage ରିସେଟ୍ କରନ୍ତୁ
  useEffect(() => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    setCuratedFilter(''); // ନୂଆ ପେଜ୍ କୁ ଗଲେ ଫିଲ୍ଟର୍ କ୍ଲିୟର୍ ହେବ
  }, [rawCategory]);

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