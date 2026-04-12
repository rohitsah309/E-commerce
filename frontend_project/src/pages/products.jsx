import "./products.css";
import { useState } from "react";
import productsdata from "../components/Product/productdata";
import ProductCard from "../components/Product/ProductCard";
import PageWrapper from "../components/UI/PageWrapper";



function Products() {
    const [selectCategory, setSelectCategory] = useState("All");
    
    const filterProducts = 
    selectCategory === "All"
    ? productsdata: productsdata.filter((p) => p.category.toLowerCase()  === selectCategory.toLowerCase());
    
    return(
        <PageWrapper>
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
                        <ProductCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </PageWrapper>  
    )
}

export default Products;