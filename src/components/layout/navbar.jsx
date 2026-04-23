import Search from "lucide-react/dist/esm/icons/search";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useState } from "react";
import useCart from "/src/components/cart/useCart";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";


const Navbar = ()=>{
    const{cart} = useCart()
    const [query, setQuery] = useState("")
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => {
        setMenuOpen(false);
    };
    const navigate = useNavigate();

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const handleSearch = (e) =>{
        e.preventDefault();
    if (!query.trim()) return;

    navigate(`/products?q=${query}`)
    };
    return(
        <nav>
            <div className="navbar">
               <div className="logo">
                    <span>⚡</span>
                    <h1>VOLTEX</h1>
                </div>

            

                <div className={ `nav-links ${menuOpen ? "active": ""}`}>
                    <NavLink to="/" className={({isActive}) => isActive ? "active" : ""} onClick={closeMenu}>Home</NavLink>
                    <NavLink to ="/products" className={({isActive}) => isActive ? "active" : ""} onClick={closeMenu}>Products</NavLink>
                    <NavLink to ="/contact" className={({isActive}) => isActive ? "active" : ""} onClick={closeMenu}>Contact</NavLink>
                    <NavLink to ="/cart" className={({isActive}) => isActive ? "active" : ""} onClick={closeMenu}>Cart</NavLink>
                </div>

                <div className="nav-right">
                    <form className="search-box" onSubmit={handleSearch}>
                        <input 
                        type="text"
                        placeholder="search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        />
                        <button type="submit" className="search-btn">
                            <Search size ={18} />
                        </button>
                    </form>

                    <UserMenu/>

                    <NavLink to="/cart"  className="cart">
                        <ShoppingCart/>
                        <span className="cart-count">{totalItems}</span>
                    </NavLink>
                    <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                        ☰
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar