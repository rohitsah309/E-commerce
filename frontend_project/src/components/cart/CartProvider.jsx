import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

function CartProvider({children}){

    const[cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const exist = prev.find((item) => item.id === product.id);
            if (exist){
                return prev.map((item) =>
                item.id === product.id 
                ?{...item, quantity: item.quantity +1}
                : item
                );
            }
            return[...prev, {...product, quantity:1}]

        });
    };

    const increaseQty =(id) =>{
        setCart((prev) =>
            prev.map((item) =>
                item.id === id? {...item, quantity: item.quantity + 1}
                    :item
            )
        );
    };


    const decreaseQty = (id) =>{
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                ? {...item, quantity: item.quantity-1}
                :item
            )
            .filter((item) => item.quantity > 0)
        )
    }

    const removeFromCart = (id) =>{
        setCart((prev) => prev.filter((item) => item.id !== id));
    };
    const clearCart = ()=>{
        setCart([]);
    }

    return(
        <CartContext.Provider 
            value={{
                cart,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQty,
                decreaseQty
                }}>
            {children}
        </CartContext.Provider>
    );
}
export default CartProvider