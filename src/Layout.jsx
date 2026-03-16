import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components/index";
import DynamicSEO from "./components/DynamicSEO";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "sonner";

function Layout() {
  return (
    <>
      <CartProvider>
        <DynamicSEO />
        <Header />
        <Outlet />
        <Footer />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#FDF2F8', // Light Pink
              color: '#800020',      // Mahalaxmi Maroon
              border: '1px solid #FBCFE8',
            },
            className: 'font-sans font-bold', // ଆପଣ ଚାହିଁଲେ ଫଣ୍ଟ୍ ମଧ୍ୟ ଦେଇପାରିବେ
          }}
        />      </CartProvider>
    </>
  );
}

export default Layout;
