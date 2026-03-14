import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components/index";
import DynamicSEO from "./components/DynamicSEO";

function Layout() {
  return (
    <>
      <DynamicSEO />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
