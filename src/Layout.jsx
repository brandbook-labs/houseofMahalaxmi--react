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
        <Toaster />
      </CartProvider>
    </>
  );
}

export default Layout;
