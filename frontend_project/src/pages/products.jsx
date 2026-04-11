import "./products.css";
import { useState } from "react";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import headphoneImg from "../assets/Headphone.jpg";
import mouseImg from "../assets/HP_mouse.jpg";
import monitorImg from "../assets/asus_monitor.jpg";
import keyboardImg from "../assets/keyboard.png";
import chargerImg from "../assets/charger.webp";
import airpodsImg from "../assets/airpods.jpeg";
import useCart from "/src/components/cart/useCart"

const products = [
    {
        id : 1,
        tag : "Best Seller",
        category: "Audio",
        brand: "Marshall",
        name: "Monitor III A.N.C Black",
        rating:4.4,
        reviews: 2341,
        price:2999,
        image: headphoneImg
    },
    {
        id : 2,
        tag : "New",
        category: "Gaming",
        brand: "DELL",
        name: "Alienware Wireless Gaming Mouse",
        rating:4.4,
        reviews: 1890,
        price:8199,
        oldPrice:9999, 
        image: mouseImg
    },
    {
        id : 3,
        tag : "Top Rated",
        category: "Displays",
        brand: "ASUS",
        name: "proArt Display PA32UCDM",
        rating:4.9,
        reviews: 987,
        price:201889,
        oldPrice:300000,
        image: monitorImg
    },
    {
        id : 4,
        tag : "",
        category: "Peripherals",
        brand: "HP",
        name: "HP 970 Creator Keyboard (Wireless)",
        rating:4.2,
        reviews: 987,
        price:7999,
        oldPrice:11989,
        image: keyboardImg
    },

    {
        id : 5,
        tag : " ",
        category: "Accessories",
        brand: "Nothing",
        name: "Nothing 65W Fast Charger",
        rating:4.2,
        reviews: 987,
        price:2499,
        oldPrice:3999, 
        image: chargerImg
    },
    {
        id : 6,
        tag : "Premium ",
        category: "Audio",
        brand:"Apple",
        name: "AirPods Pro 3",
        rating:4.4,
        reviews: 987,
        price:24900,
        oldPrice:25900,
        image: airpodsImg
    }


];




function Products() {
    const data = useCart();
    console.log("Products:", data);
    
    const {addToCart} = useCart();
    const [selectCategory, setSelectCategory] = useState("All");
    


    const filterProducts = 
    selectCategory === "All"
    ? products: products.filter((p) => p.category.toLowerCase()  === selectCategory.toLowerCase());
    
    
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