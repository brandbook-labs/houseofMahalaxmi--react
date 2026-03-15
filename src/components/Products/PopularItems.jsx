import React, { useState, useEffect } from 'react';
import { ArrowDown, Loader2 } from 'lucide-react'; // ନୂଆ ଆଇକନ୍
import ProductCard from '../Card/ProductCard'; 
import { getAllProducts } from '../../services/apiService';

const categories = ["All", "New Arrivals", "Best Sellers", "Trending"];

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState("All");
  
  // ───────────── STATES ─────────────
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // ପ୍ରଥମ ଥର ଲୋଡିଂ ପାଇଁ
  const [isLoadingMore, setIsLoadingMore] = useState(false); // Load More ବଟନ୍ ପାଇଁ
  
  // Pagination States
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ───────────── FETCH API ─────────────
  useEffect(() => {
    const fetchShowcaseProducts = async () => {
      // ଯଦି page 1 ଅଟେ ତେବେ ମେନ୍ ଲୋଡର୍ ଦେଖାନ୍ତୁ, ନଚେତ୍ ତଳେ ଥିବା ଛୋଟ ଲୋଡର୍ ଦେଖାନ୍ତୁ
      if (page === 1) setIsLoading(true);
      else setIsLoadingMore(true);

      try {
        const params = {
            limit: 8, // ଥରକେ ୮ଟି ପ୍ରଡକ୍ଟ ଆଣିବା
            sort: 'newest',
            page: page // API କୁ କରେଣ୍ଟ୍ ପେଜ୍ ପଠାନ୍ତୁ
        };

        if (activeTab !== "All") {
            const formattedTab = activeTab.toLowerCase().replace(/\s+/g, '_');
            params.curatedCollection = formattedTab;
        }

        const responseData = await getAllProducts(params);
        
        if (responseData && responseData.products) {
          if (page === 1) {
            // ପ୍ରଥମ ପେଜ୍ ହୋଇଥିଲେ ସିଧା ଡାଟା ସେଟ୍ କରନ୍ତୁ
            setProducts(responseData.products);
          } else {
            // ଦ୍ଵିତୀୟ ବା ତା'ଠାରୁ ଅଧିକ ପେଜ୍ ହୋଇଥିଲେ ପୁରୁଣା ଡାଟା ସହ ନୂଆ ଡାଟା ଯୋଡନ୍ତୁ (Append)
            setProducts(prevProducts => [...prevProducts, ...responseData.products]);
          }
          // ବ୍ୟାକେଣ୍ଡ୍ ରୁ ଆସିଥିବା ସମୁଦାୟ ପେଜ୍ ସଂଖ୍ୟାକୁ ସେଭ୍ କରନ୍ତୁ
          setTotalPages(responseData.pagination?.totalPages || 1);
        } else {
          if (page === 1) setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch showcase products:", error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    };

    fetchShowcaseProducts();
  }, [activeTab, page]); 

  // ───────────── HANDLERS ─────────────
  const handleTabChange = (category) => {
      if (activeTab !== category) {
          setActiveTab(category);
          setPage(1); // ଟ୍ୟାବ୍ ବଦଳିଲେ ପେଜ୍ ୧ କୁ ଫେରିବ
          setProducts([]); // ତୁରନ୍ତ ପୁରୁଣା ଡାଟା କ୍ଲିୟର୍ କରିବା ଯାହାଦ୍ୱାରା ୟୁଜର୍ କୁ ସ୍ମୁଥ୍ ଲାଗିବ
      }
  };

  const handleLoadMore = () => {
      if (page < totalPages && !isLoadingMore) {
          setPage(prevPage => prevPage + 1);
      }
  };

  return (
    <section className="bg-white py-16 md:py-24 text-gray-900 font-sans">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* --- HEADER & TABS --- */}
        <div className="mb-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 border-b border-gray-200 pb-6 text-center md:text-left">
          
          <div>
            <span className="text-[#800020] font-medium text-sm tracking-widest uppercase mb-2 block">
              Discover Fashion
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              Curated <span className="text-gray-500 font-normal">Collections</span>
            </h2>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide snap-x">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleTabChange(category)}
                disabled={isLoading || isLoadingMore} 
                className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors snap-center ${
                  activeTab === category
                    ? 'bg-[#800020] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } ${(isLoading || isLoadingMore) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* --- GRID --- */}
        {isLoading && page === 1 ? (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020]"></div>
            </div>
        ) : (
            <>
                <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4 min-h-[400px]">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <ProductCard key={`${product._id}-${activeTab}`} product={product} />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center text-gray-500 flex flex-col items-center">
                      <p className="text-lg">No products found for {activeTab}.</p>
                      <button 
                          onClick={() => handleTabChange('All')}
                          className="mt-4 text-[#800020] font-medium underline underline-offset-4"
                      >
                          View All Products
                      </button>
                    </div>
                  )}
                </div>

                {/* --- LOAD MORE BUTTON (Pagination) --- */}
                {/* କେବଳ ଯଦି ଆହୁରି ପେଜ୍ ବାକି ଅଛି, ତେବେ ହିଁ ଏହି ବଟନ୍ ଦେଖାଯିବ */}
                {page < totalPages && (
                    <button 
                        onClick={handleLoadMore}
                        disabled={isLoadingMore}
                        className="mt-12 w-full md:w-auto md:min-w-[300px] mx-auto flex items-center justify-center gap-2 border border-[#800020] py-4 px-8 text-sm font-bold uppercase tracking-wider text-[#800020] hover:bg-[#800020] hover:text-white transition-all rounded-md disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoadingMore ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Loading...
                            </>
                        ) : (
                            <>
                                Load More Products
                                <ArrowDown size={18} />
                            </>
                        )}
                    </button>
                )}
            </>
        )}

      </div>
    </section>
  );
}