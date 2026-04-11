import "./products.css";
import { useState } from "react";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import useCart from "../components/cart/useCart"
import productsdata from "../components/Product/productdata";




function Products() {

    
    const {addToCart} = useCart();
    const [selectCategory, setSelectCategory] = useState("All");
    


    const filterProducts = 
    selectCategory === "All"
    ? productsdata: productsdata.filter((p) => p.category.toLowerCase()  === selectCategory.toLowerCase());
    
    
    return(
        <div className="product-page">
            <h1>All Product</h1>
            <p>Browse our collection of premium tech</p>

            <div className="categories">
                {["All", "Audio", "Gaming", "Displays", "Peripherals", "Accessories"].map(
                    (item, index) => (
                        <button key={index}
                            className= {selectCategory === item ? "active" : ""} onClick={() => setSelectCategory(item)}>
                            {item}
                        </button>
                    )
                )}
            </div>

            <div className="product-grid">
                {filterProducts.map((item) => (
                    <div className="card" key={item.id}>
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
                                    console.log("Adding:", item)
                                    addToCart(item);
                                }}>
                                    <ShoppingCart size ={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products;