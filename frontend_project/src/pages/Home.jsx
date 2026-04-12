import "./Home.css";
import FeaturedProduct from "../components/Product/FeaturedProduct";
import Subscribe from "../components/layout/Subscribe";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/UI/PageWrapper";

function Home(){
    const navigate = useNavigate()
    return(
        <PageWrapper>
            <section className="container">
                <div className="content">
                    <span className="badge">✨ New Arrivals — Spring 2026</span>
                    <h1>Next-Gen Tech, <br/> 
                    <span className="gradient-text">Delivered.</span>
                    </h1>
                    <p>
                    Discover cutting-edge electronics, gaming gear, and accessories.
            Curated for tech enthusiasts who demand the best. 
                    </p>
                    <div className="home-button">
                        <button className="btn primary" onClick={()=> navigate("/products")}>Shop Now →</button>
                        
                    </div>
                </div>
            </section>
            <div>
                <FeaturedProduct />
                <Subscribe />
            </div>
        </PageWrapper>
    )
}

export default Home;