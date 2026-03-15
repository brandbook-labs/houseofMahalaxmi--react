import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // LocalStorage ରୁ ପୁରୁଣା କାର୍ଟ ଡାଟା ଆଣିବା (ଯାହାଦ୍ୱାରା ପେଜ୍ ରିଫ୍ରେସ୍ କଲେ ଡାଟା ଯିବ ନାହିଁ)
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

  // ୧. କାର୍ଟରେ ନୂଆ ପ୍ରଡକ୍ଟ ଯୋଡିବା (Product Details ପେଜ୍ ରୁ କଲ୍ ହେବ)
  const addToCart = (product, size, quantity = 1) => {
    setCartItems((prevItems) => {
      // ସମାନ ପ୍ରଡକ୍ଟ ଏବଂ ସମାନ ସାଇଜ୍ ଥିଲେ କେବଳ quantity ବଢାଇବା
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product._id && item.selectedSize === size
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      }

      // ନୂଆ ପ୍ରଡକ୍ଟ ହୋଇଥିଲେ Array ରେ ଯୋଡିବା
      return [...prevItems, {
        id: product._id, // ବ୍ୟାକେଣ୍ଡ୍ ର ID
        title: product.name,
        category: product.department,
        type: product.productType,
        price: product.originalPrice,
        gstRate: 12, // ଆପଣ ଏହାକୁ ବ୍ୟାକେଣ୍ଡ୍ ରୁ ଆଣିପାରିବେ ବା ଫିକ୍ସ କରିପାରିବେ
        image: product.productImages?.[0] || 'https://via.placeholder.com/150',
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