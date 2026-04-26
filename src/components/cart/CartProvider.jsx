import { useState, useEffect } from "react";
import getCartKey, { CartContext } from "./CartContext";

function CartProvider({children}){

    const[cart, setCart] = useState(() => {
        const key = getCartKey();
        return JSON.parse(localStorage.getItem(key)) || [];
    });

    useEffect(() => {
        const key = getCartKey();
        localStorage.setItem(key, JSON.stringify(cart))
    }, [cart]);

    useEffect(() => {
        const handleAuthChange = () => {
            const key = getCartKey();
            const newCart = JSON.parse(localStorage.getItem(key)) || [];
            setCart(newCart);
        };

        window.addEventListener("authChanged", handleAuthChange);

        return () =>
            window.removeEventListener("authChanged", handleAuthChange);
    }, []);

    const addToCart = (product, qty = 1) => {
        setCart((prev) => {
            const exist = prev.find((item) => item.id === product.id);
            if (exist){
                return prev.map((item) =>
                item.id === product.id 
                ?{...item, quantity: item.quantity + qty}
                : item
                );
            }
            return[...prev, {
                id: product.id,
                name: product.name,
                brand: product.brand,
                price: typeof product.price === "object" ? product.price.value : product.price,
                image: product.image,
                quantity: qty
            }];
            

        });
    };


    const removePurchasedItems = (items) => {
        setCart((prevCart) => {
            const updated = prevCart.filter(
                (cartItem) =>
                    !items.some((item) => item.id === cartItem.id)
            );

            return updated;
        });
    };

    const increaseQty =(id) =>{
        setCart((prev) =>
            prev.map((item) =>
                item.id === id? {...item, quantity: (item.quantity  || 1)+ 1}
                    :item
            )
        );
    };


    const decreaseQty = (id) =>{
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                ? {...item, quantity: Math.max(( item.quantity || 1) -1)}
                :item
            )
            .filter((item) => item.quantity > 0)
        );
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
                decreaseQty,
                removePurchasedItems
                }}>
            {children}
        </CartContext.Provider>
    );
}
export default CartProvider