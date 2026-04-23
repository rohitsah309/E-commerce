import { useState, useEffect } from "react";
import User from "lucide-react/dist/esm/icons/user";
import { Link, useNavigate } from "react-router-dom";
import "./UseMenu.css";

function UserMenu({ user, setUser }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      const storedUser = JSON.parse(localStorage.getItem("currentUser"));
      if (storedUser) {
        setUser && setUser(storedUser);
      }
    }
  }, [user, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("authChanged"));
    setUser && setUser(null);
    navigate("/auth");
  };

  return (
    <div className="user-menu">
      <User
        className="user-icon"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="dropdown">

          {user ? (
            <>
              <p style={{ padding: "10px" }}>
                👋 Hello, <b>{user.name}</b>
              </p>

              <Link to="/orders">Your Orders</Link>
              <Link to="/Account">Account</Link>
              <Link to="/coupons">Coupons</Link>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth">Sign In / Sign Up</Link>
            </>
          )}

        </div>
      )}
    </div>
  );
}

export default UserMenu;