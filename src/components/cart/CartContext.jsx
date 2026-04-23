import { createContext, } from "react";

export const CartContext = createContext();

const getCartKey = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user ? `cart_${user.email}` : "cart_guest";
};

export default getCartKey




