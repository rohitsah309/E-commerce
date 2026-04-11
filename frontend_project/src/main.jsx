import React from "react";
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartProvider from "./context/cartProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <CartProvider>
      <App />
    </CartProvider>
);
