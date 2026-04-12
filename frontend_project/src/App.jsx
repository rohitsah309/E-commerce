import Navbar from "./components/layout/navbar";
import { BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./components/UI/loader";
import Home  from "./pages/Home";
import Products from "./pages/products";
import CartPage from "./pages/cart";
import Contact from "./pages/contact";
import ScrollToTop from "./components/UI/ScrollToTop";
import { AnimatePresence, } from "framer-motion";


function AnimateRoutes() {
  const location = useLocation();
  
  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}


function App(){
  return(
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <AnimateRoutes />
    </BrowserRouter>
  )
}

export default App;
