import Navbar from "./components/layout/navbar";
import { BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import Loader from "./components/UI/loader";
import Home  from "./pages/Home";
import Products from "./pages/products";
import CartPage from "./pages/cart";
import Contact from "./pages/contact";
import ScrollToTop from "./components/UI/ScrollToTop";
import { AnimatePresence, } from "framer-motion";
import ProductDetails from "./components/Product/ProductDetails";
import ToastProvider from "./components/UI/ToastProvider";
import Footer from "./components/layout/footer";
import AuthPage from "./components/layout/AuthPage";


function AnimateRoutes() {
  const location = useLocation();
  
  return (
    <>
    <ToastProvider />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/auth" element={<AuthPage />} />
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
      <Footer />
    </BrowserRouter>
  )
}

export default App;
