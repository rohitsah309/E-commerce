import "./Home.css";


function Home(){
    return(
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
                    <button className="btn primary">Shop Now →</button>
                    <button className="btn secondary">Browse Catalog</button>
                </div>
            </div>
        </section>
    )
}

export default Home;