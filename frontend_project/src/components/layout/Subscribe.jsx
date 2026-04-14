import "./subscribe.css"
import { useState } from "react"
import toast from "react-hot-toast";


function Subscribe(){
    const[email, setEmail] = useState("")

    const handleSubscribe = (e) => {
        e.preventDefault();
        if(!email || !email.includes('@')) {
            toast.error ("❌ Enter valid email")
            return;
        }

        toast.success("✅ Subscribed successfully!");
        setEmail("");
    }
    return(
        <section className="subscribe">
            <h2>Never Miss a Deal</h2>
            <p>
                Get notified about new product, exclusive deals, and tech insights.
            </p>

            <form className="box" onSubmit={handleSubscribe}>
                <input type="email" 
                    placeholder="your@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Subscribe</button>
            </form>
        </section>
    )
}

export default Subscribe