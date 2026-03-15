import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components/index";
import DynamicSEO from "./components/DynamicSEO";
import { CartProvider } from "./context/CartContext";

function Layout() {
  return (
    <>
      <CartProvider>
        <DynamicSEO />
        <Header />
        <Outlet />
        <Footer />
      </CartProvider>
    </>
  );
}

export default Layout;
