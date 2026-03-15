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

// --- LAYOUT & MAIN PAGES ---
import Layout from "./Layout";
import Home from "./pages/Home";
import ContactPage from "./components/Contact/Contact";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./components/Products/cart";
import SuccessPage from "./components/Products/PurchaseSuccess";
import CheckoutPage from "./components/Products/checkout";
import DepartmentPage from "./pages/DepartmentPage";
import SearchPage from "./pages/SearchPage";
import NotFoundPage from "./pages/NotFoundPage";

// import WomensCollection from "./pages/Women/WomensCollection";
// import MensCollection from "./pages/Men/MensCollection";
// import KidsCollection from "./pages/Kids/KidsCollection";
// import FestiveCollection from "./pages/collections/FestiveCollection";
// import WeddingCollection from "./pages/collections/WeddingCollection";
// import CasualCollection from "./pages/collections/CasualCollection";
// import AccessoriesCollection from "./pages/collections/Accessories";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* Main Pages */}
      <Route path="" element={<Home />} />
      {/* <Route path="/contact-us" element={<ContactPage />} /> */}
      
      {/* E-Commerce Core */}
      {/* Notice the ":id" here. This makes it a dynamic route. */}
      <Route path="/products/:slug" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/success" element={<SuccessPage />} />

      {/* Main Categories */}
      <Route path="/department/:departmentId" element={<DepartmentPage />} />
      <Route path="/collections/:collectionId" element={<DepartmentPage />} />

      <Route path="/search" element={<SearchPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>
);