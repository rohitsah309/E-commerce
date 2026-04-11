import  { useContext } from "react"
import { CartContext } from "./CartContext";  

function useCart(){
    return useContext(CartContext)
};

export default useCart