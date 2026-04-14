import useCart from "/src/components/cart/useCart";
import "./cart.css"
import PageWrapper from "../components/UI/PageWrapper";
import { useNavigate } from "react-router-dom";


function CartPage(){
    const navigate = useNavigate()
    
    const {cart, increaseQty, decreaseQty, removeFromCart} = useCart();

    const total = cart.reduce(
        (sum, item) =>
            sum + (Number(item.price) || Number(item.price?.value) || 0) * (item.quantity || 1),
        0
    );

    return(
        <PageWrapper>
            <div className="cart-page">
                <h1>Your Cart</h1>

                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <div className="empty-box">
                            <div className="icon">🛒</div>
                            <h2>Your cart is empty</h2>
                            <p>Add item to get started</p>
                            <button className="shop-btn" onClick={() => navigate("/products")}>Start Shoping</button>
                        </div>
                    </div>
                ):(
                    <div className="cart-container">

                        <div className="cart-items">
                            {cart.map((item) => (
                                <div className="cart-card" key = {item.id}>
                                    <img src= {item.image} alt = {item.name} />

                                    <div className="details">
                                        <p className="brand">{typeof item.brand === "object" ? item.brand.name : item.brand}</p>
                                        <h3>{item.name?.title || item.name}</h3>
                                        <p className="price">₹{typeof item.price === "object" ? item.price.value : item.price}</p>
                                    </div>

                                    <div className="action">
                                        <div className="qtn">
                                            <button onClick={() => decreaseQty(item.id)}>-</button>
                                            <span>{item.quantity || 1}</span>
                                            <button onClick={() => increaseQty(item.id)}>+</button>
                                        </div>
                                        <div className="remove" onClick={() => removeFromCart(item.id)}>
                                            🗑
                                        </div>
                                    </div>

                                    
                                
                                </div>
                            ))}
                        </div>


                        <div className="cart-summary">
                            <h2>Order Summary</h2>
                            <div className="row">
                                <span>Subtotal</span>
                                <span>₹{total}</span>
                            </div>

                            <div className="row">
                                <span>Shipping</span>
                                <span className="free">Free</span>
                            </div>

                            <hr/>

                            <div className="total">
                                <span>Total</span>
                                <span>₹{total}</span>
                            </div>
                            <button className="checkout">Checkout</button>
                        </div>
                    </div>
                )}
            </div>

        </PageWrapper>
    )
          
                
      
}

export default CartPage