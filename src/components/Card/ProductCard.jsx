import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import { toast } from 'sonner'; // [NEW] ଟୋଷ୍ଟ୍ ଇମ୍ପୋର୍ଟ କରନ୍ତୁ

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const displayImage = product.productImages && product.productImages.length > 0 
        ? product.productImages[0] 
        : 'https://images.unsplash.com/photo-1583391733958-d25e0b46410f?q=80&w=600&auto=format&fit=crop';

  const productIdentifier = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const productLink = `/products/${productIdentifier}`;

  const handleQuickAdd = (e) => {
      e.preventDefault();  
      e.stopPropagation();  

      let defaultSize = 'Free Size';
      if (product.sizes && product.sizes.length > 0) {
          const availableSize = product.sizes.find(s => s.stock > 0);
          if (availableSize) defaultSize = availableSize.sizeName;
      }

      // ଗ୍ଲୋବାଲ୍ କାର୍ଟ କୁ ପଠାନ୍ତୁ
      addToCart(product, defaultSize, 1);

      // [NEW] ସୁନ୍ଦର Sonner Toast ମେସେଜ୍
      toast.success("Added to Bag! 🛍️", {
          description: `${product.name} (Size: ${defaultSize})`,
          duration: 3000,
          position: 'top-center',
          style: {
              background: '#FDF2F8', // Light Pink
              color: '#800020', // Mahalaxmi Maroon
              border: '1px solid #FBCFE8'
          }
      });
  };

  return (
    <Link to={productLink} className="group flex flex-col cursor-pointer block">
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-lg mb-4">
        <img src={displayImage} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        
        {product.curatedCollection?.includes('best_sellers') && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-gray-900 uppercase tracking-wider rounded-sm shadow-sm z-10">
                Bestseller
            </div>
        )}
        
        <div className="hidden lg:flex absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black/50 to-transparent z-20">
          <div className="flex w-full gap-2 justify-center">
            <button 
                onClick={handleQuickAdd}
                className="flex-1 bg-white text-gray-900 py-2.5 rounded-sm font-medium hover:bg-[#800020] hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
            >
                <ShoppingBag size={16} /> Add
            </button>
            <div className="p-2.5 bg-white text-gray-900 rounded-sm hover:text-gray-600 transition-colors">
                <Eye size={18} />
            </div>
          </div>
        </div>

        <button 
            onClick={handleQuickAdd}
            className="lg:hidden absolute bottom-2 right-2 h-10 w-10 bg-white/90 backdrop-blur-sm text-gray-900 flex items-center justify-center rounded-full shadow-md active:scale-95 transition-transform z-20"
        >
            <ShoppingBag size={18} />
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mb-1">
            {product.productType ? product.productType.replace('_', ' ') : 'Fashion'}
        </p>
        <h3 className="text-sm md:text-base font-serif font-medium text-gray-900 group-hover:text-[#800020] transition-colors leading-snug line-clamp-2 mb-2">
            {product.name}
        </h3>
        <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base md:text-lg font-bold text-gray-900">{formatPrice(product.originalPrice)}</span>
            {product.mrp > product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">{formatPrice(product.mrp)}</span>
            )}
          </div>
          {product.averageRating > 0 && (
            <div className="flex items-center gap-1">
                <Star size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
                <span className="text-xs text-gray-500">{product.averageRating}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;