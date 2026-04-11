import Search from "lucide-react/dist/esm/icons/search";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import User from "lucide-react/dist/esm/icons/user";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";
import useCart from "/src/components/cart/useCart";


const Navbar = ()=>{
    const{cart} = useCart()
    const [query, SetQuery] = useState("")

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const handleSearch = (e) =>{
        e.preventDefault();
        console.log("Search:", query)
    };
    return(
        <nav>
            <div className="navbar">
               <div className="logo">
                    <span>⚡</span>
                    <h1>VOLTEX</h1>
                </div> 
            

                <div className="nav-links">
                    <NavLink to="/"  className={({isActive}) => isActive ? "active" : ""}>Home</NavLink>
                    <NavLink to ="/products"  className={({isActive}) => isActive ? "active" : ""}>Products</NavLink>
                    <NavLink to ="/contact"  className={({isActive}) => isActive ? "active" : ""}>Contact</NavLink>
                    <NavLink to ="/cart"  className={({isActive}) => isActive ? "active" : ""}>Cart</NavLink>
                </div>

                <div className="nav-right">
                    <form className="search-box" onSubmit={handleSearch}>
                        <input 
                        type="text"
                        placeholder="search..."
                        value={query}
                        onChange={(e) => SetQuery(e.target.value)}
                        />
                        <Search size ={18} className="search-icon" />
                    </form>


                    <div className="account">
                        <User size = {20}/>
                    </div>


                    <NavLink to="/cart"  className="cart">
                        <ShoppingCart/>
                        <span className="cart-count">{totalItems}</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar