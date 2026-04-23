import { useState } from "react";
import User from "lucide-react/dist/esm/icons/user";
import { Link } from "react-router-dom";
import "./UseMenu.css";

function UserMenu() {
  const[open, setOpen] = useState(false)
  return (
    <div className="user-menu">
      <User className="user-icon" 
      onclick = {() => setOpen(!open)}/>

      <div className="dropdown">
        <Link to="/auth">Sign In / Sign Up</Link>
        <Link>Your Orders</Link>
        <Link>Account</Link>
        <Link>Coupons</Link>
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default UserMenu;