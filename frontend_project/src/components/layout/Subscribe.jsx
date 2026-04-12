import "./subscribe.css"

function Subscribe(){
    return(
        <section className="subscribe">
            <h2>Never Miss a Deal</h2>
            <p>
                Get notified about new product, exclusive deals, and tech insights.
            </p>

            <div className="box">
                <input type="email" placeholder="your@email.com" />
                <button>Subscribe</button>
            </div>
        </section>
    )
}

export default Subscribe