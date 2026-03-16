import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // LocalStorage ରୁ ପୁରୁଣା କାର୍ଟ ଡାଟା ଆଣିବା
  const [cartItems, setCartItems] = useState(() => {
      const savedCart = localStorage.getItem('myCart');
      return savedCart ? JSON.parse(savedCart) : [];
  });

  // କାର୍ଟ ଅପଡେଟ୍ ହେଲେ LocalStorage ରେ ସେଭ୍ କରିବା
  useEffect(() => {
      localStorage.setItem('myCart', JSON.stringify(cartItems));
  }, [cartItems]);

  // ମୋଟ ଆଇଟମ୍ ସଂଖ୍ୟା ଗଣିବା (Header ପାଇଁ)
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // ୧. କାର୍ଟରେ ନୂଆ ପ୍ରଡକ୍ଟ ଯୋଡିବା
  const addToCart = (product, size, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product._id && item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        // [FIX] Shallow Copy ବଦଳରେ Deep Object Copy କରନ୍ତୁ (Strict Mode +2 Bug Fixed)
        const updatedItems = [...prevItems];
        const existingItem = updatedItems[existingItemIndex];
        
        updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + quantity
        };
        return updatedItems;
      }

      // ନୂଆ ପ୍ରଡକ୍ଟ ହୋଇଥିଲେ Array ରେ ଯୋଡିବା
      return [...prevItems, {
        id: product._id, 
        slug: product.slug || product._id, // [NEW] Cart Page ରେ ଲିଙ୍କ୍ ପାଇଁ 
        title: product.name,
        category: product.department,
        type: product.productType,
        price: product.originalPrice,
        mrp: product.mrp, // [NEW] Discount ଦେଖାଇବା ପାଇଁ
        gstRate: 12, 
        // [NEW] ଇମେଜ୍ ଲିଙ୍କ୍ କୁ ସଠିକ୍ ଭାବେ ସେଭ୍ କରିବା
        image: (product.productImages && product.productImages.length > 0) 
                ? product.productImages[0] 
                : 'https://images.unsplash.com/photo-1583391733958-d25e0b46410f?q=80&w=600&auto=format&fit=crop',
        selectedSize: size,
        quantity: quantity
      }];
    });
  };

  // ୨. Quantity ବଦଳାଇବା (Cart Page ପାଇଁ)
  const updateQuantity = (id, size, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id && item.selectedSize === size) {
          const newQty = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // ୩. ପ୍ରଡକ୍ଟ ହଟାଇବା (Cart Page ପାଇଁ)
  const removeFromCart = (id, size) => {
    setCartItems((prevItems) => 
        prevItems.filter((item) => !(item.id === id && item.selectedSize === size))
    );
  };

  // ୪. କାର୍ଟ କ୍ଲିୟର୍ କରିବା (Order ସଫଳ ହେବା ପରେ)
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);