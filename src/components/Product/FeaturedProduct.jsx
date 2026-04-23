import products from "./productdata";
import ProductCard from "./ProductCard";
import"./FeaturedProduct.css";
import {  useNavigate } from "react-router-dom";

function FeaturedProduct(){
    const navigate = useNavigate();
    return(
        <section className="featured">
            <div className="header">
                <div>
                    <h2>Featured Products</h2>
                    <p>Hand-picked tech for you</p>
                </div>
                <button
                className="view-btn"
                onClick={() => navigate("/products")}> 
                    <span className="text">View All</span> →
                </button>
            </div>

            <div className="grid">
                {products.slice(0,4).map((item) =>(
                    <ProductCard key ={item.id} item ={item} />
                ))}
            </div>
        </section>
    );
}

export default FeaturedProduct
