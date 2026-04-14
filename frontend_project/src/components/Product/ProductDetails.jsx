import { useParams } from "react-router-dom"
import productsdata from "./productdata"
import "./ProductDetails.css"
import { useState } from "react";
import useCart from "../cart/useCart";
import { ArrowLeft } from "lucide-react";

const ProductDetails = () => {
    const{id} = useParams();
    const[qty, setQty] = useState(1);
    const{addToCart} = useCart();

    const product = productsdata.find(
        (item) => item.id === parseInt(id)
    );

    if (!product) return <h2>Product not found</h2>;

    return(
        <div className="product-details">
            <div className="top-bar">
                <button className="back-btn" onClick={() => window.history.back()}>
                    <ArrowLeft size={18} />
                    Back to Products
                </button>
            </div>

            <div className="details-container">
                <div className="image-box">
                    <img src={product.image} alt={product.name} />
                </div>

                <div className="content-box">
                    <p className="brand">{product.brand}</p>

                    <h1 >{product.name}</h1>

                    <p className="rating">
                        ⭐{product.rating} ({product.reviews})
                    </p>

                    <div className="price-row">
                        <span className="price">₹{product.price}</span>
                        {product.oldPrice && (
                            <span className="old-price">₹{product.oldPrice}</span>
                        )}
                    </div>


                    <p className="desc">{product.description}</p>
                    <div className="specs">
                        {product.specs?.map((spec, index) => (
                            <div key={index}>
                                <span className="spec-label">{spec.label}</span>
                                <span className="spec-value">{spec.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="cart-section">
                        <div className="qty">
                            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
                            <span>{qty}</span>
                            <button onClick={() => setQty(qty + 1)}>+</button>
                        </div>

                        <button 
                            className="add-cart"
                            onClick={() => addToCart(product, qty)}>
                           🛒 Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ProductDetails