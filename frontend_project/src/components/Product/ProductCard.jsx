import "./ProductCard.css"
import useCart from "../../components/cart/useCart"
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";


function ProductCard({item}){

    const {addToCart} = useCart();
   
    return(
        <div className="card">
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

                    <button className="cart-btn" onClick={()=> {
                        addToCart(item);
                        }}>
                        <ShoppingCart size ={18} />
                     </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard