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

  useEffect(() => {
    const handleClickOutside = () => {
      setOpen(false);
    };

    if (open) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

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
        className={`user-icon ${open ? "active" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(prev => !prev)
        }}
      />

      {open && (
        <div className="dropdown" onClick={(e) => e.stopPropagation()}>

          {user ? (
            <>
              <p style={{ padding: "10px" }}>
                👋 Hello, <b>{user.name}</b>
              </p>

              <Link to="/orders" onClick={() => setOpen(false)}>Your Orders</Link>
              <Link to="/Account" onClick={() => setOpen(false)}>Account</Link>
              <Link to="/coupons" onClick={() => setOpen(false)}>Coupons</Link>

              <button 
                className="logout-btn" 
                onClick={() =>{
                  handleLogout();
                  setOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" onClick={() => setOpen(false)}>Sign In / Sign Up</Link>
            </>
          )}

        </div>
      )}
    </div>
  );
}

export default UserMenu;