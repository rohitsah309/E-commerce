import "./ProductCard.css"
import useCart from "../../components/cart/useCart"
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ProductCard({item}){
    const navigate = useNavigate();
    const {cart, addToCart, increaseQty, decreaseQty} = useCart();
    const cartItem = cart.find(cartitem => cartitem.id === item.id);

    const handleAddToCart = (product) => {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!isLoggedIn) {
            toast.error("Please login first");
            navigate("/auth");
            return;
        }

        addToCart(product);
        toast.success("Item added to cart");
    };
   
    return(
        <div className="card"
            onClick={() => navigate(`/product/${item.id}`)}>
            {item.tag && item.tag.trim() !== "" &&(
            <span className="tag">{item.tag}</span>
            )}
                        

            <div className="image">
                <img src={item.image} alt={item.name} />
            </div>

            <div className="card-body">
                <p className="brand">{item.brand}</p>
                <h3>{item.name}</h3>
                            
                <p className="rating">
                    ⭐ {item.rating} ({item.reviews})
                </p>

                <div className="price-row">
                    <div>
                        <span className="price">₹{item.price}</span>
                        {item.oldPrice && (
                            <span className="old">₹{item.oldPrice}</span>
                        )}
                    </div>
                    
                    {!cartItem ? (
                        <button className="cart-btn" onClick={(e)=> {
                            e.stopPropagation();
                            handleAddToCart(item)
                            }}>
                            <ShoppingCart size ={18} />
                        </button>
                    ):(
                        <div 
                            className="qty-box"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={(e) => {
                                e.stopPropagation();
                                decreaseQty(item.id);
                            }}>
                                -
                            </button>
                            <span>{cartItem.quantity}</span>
                            <button onClick={(e) => {
                                e.stopPropagation();
                                increaseQty(item.id);
                            }}>
                                +
                            </button>
                        </div>

                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCard