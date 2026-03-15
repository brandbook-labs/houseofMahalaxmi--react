import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShoppingBag, Search as SearchIcon } from 'lucide-react';
import ProductCard from '../components/Card/ProductCard';
import { getAllProducts } from '../services/apiService'; 

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || ''; // URL ରୁ ସର୍ଚ୍ଚ ଶବ୍ଦ ଆଣିବା
  
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return; // ଖାଲି ଥିଲେ ସର୍ଚ୍ଚ କରିବ ନାହିଁ
      
      setIsLoading(true);
      try {
        // ବ୍ୟାକେଣ୍ଡ୍ କୁ 'search' ପାରାମିଟର୍ ସହ ପଠାଇବା
        const responseData = await getAllProducts({ search: query });
        
        if (responseData && responseData.products) {
          setProducts(responseData.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
    window.scrollTo(0, 0);
  }, [query]); // ଯେତେବେଳେ ସର୍ଚ୍ଚ କ୍ୱେରୀ ବଦଳିବ, API ପୁଣି କଲ୍ ହେବ

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <nav className="flex text-xs font-medium text-gray-500 mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-[#800020] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Search Results</span>
        </nav>

        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            Showing results for <span className="font-bold text-gray-900">"{query}"</span>
          </p>
        </div>

        {/* ───────────── SEARCH RESULTS GRID ───────────── */}
        {isLoading ? (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#800020]"></div>
            </div>
        ) : products.length === 0 ? (
            <div className="text-center text-gray-500 py-16 flex flex-col items-center bg-white rounded-xl border border-gray-200">
                <SearchIcon size={48} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-md max-w-md mx-auto">
                    We couldn't find anything matching "{query}". Try searching for something else like 'saree', 'lehenga', or 'kurta'.
                </p>
                <Link to="/department/women" className="mt-6 bg-[#800020] text-white px-6 py-3 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-[#600018] transition-colors">
                    Browse Collection
                </Link>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
                {products.map((product) => <ProductCard key={product._id} product={product} />)}
            </div>
        )}

      </div>
    </div>
  );
}