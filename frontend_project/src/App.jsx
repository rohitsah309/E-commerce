import Navbar from "./components/layout/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home  from "./pages/Home";
import Products from "./pages/products";
import CartPage from "./pages/cart";

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
