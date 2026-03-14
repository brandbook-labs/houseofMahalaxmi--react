import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import ContactPage from "./components/Contact/Contact";
import ProductDetails from "./components/Products/ProductDetails";
import ProductCatalog from "./components/Products/ProductList";
import Contact from "./components/Contact/Contact";
import CartPage from "./components/Products/cart";
import CheckoutPage from "./components/Products/checkout";
import SuccessPage from "./components/Products/PurchaseSuccess";
import ServicesPage from "./components/Services/Services";
import PortfolioPage from "./components/Works/WorksPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/contact-us" element={<ContactPage />} />
      <Route path="/product-details" element={<ProductDetails />} />
      <Route path="/store" element={<ProductCatalog />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/works" element={<PortfolioPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      {" "}
      {/* <--- WRAP APP HERE */}
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);
