import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Account.css";
import { toast } from "react-toastify";

const Account = () => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));

    const [user, setUser] = useState(storedUser);
    const [name, setName] = useState(storedUser?.name || "");
    const [image, setImage] = useState(storedUser?.image || "");
    const [activeTab, setActiveTab] = useState("profile");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!storedUser) {
            navigate("/auth");
        }
    }, [navigate, storedUser]);

  // 🖼️ Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const updatedUser = { ...user, image: reader.result };
      updateUser(updatedUser);
      setImage(reader.result);
    };

    if (file) reader.readAsDataURL(file);
  };

  // 💾 Update user everywhere
  const updateUser = (updatedUser) => {
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUser(updatedUser);
    window.dispatchEvent(new Event("authChanged"));
  };

  // ✏️ Save name
  const handleSaveName = () => {
    updateUser({ ...user, name });
  };

  // 🔑 Change password
  const handleChangePassword = () => {
    if (password.length < 6) {
      toast.success("Password must be at least 6 characters");
      return;
    }

    updateUser({ ...user, password });
    toast.success("Password updated!");
    setPassword("");
  };

  // 📦 Orders
  const orders = JSON.parse(localStorage.getItem(`orders_${user?.email}`)) || [];

  if (!user) return null;

  return (
    <div className="account-page">
      <h1>👤 My Account</h1>

      {/* Tabs */}
      <div className="tabs">
        <button 
            onClick={() => setActiveTab("profile")}
            className ={activeTab === "profile" ? "active-tab" : ""}
            >
                Profile
        </button>
        <button 
            onClick={() => setActiveTab("orders")}
            className={activeTab === "orders" ? "active-tab" : ""}
            >
                Orders
        </button>
        <button 
            onClick={() => setActiveTab("settings")}
            className={activeTab === "settings" ? "active-tab" : ""}
            >
                Settings
        </button>
      </div>

      <div className="account-card">

        {/* 🧑 PROFILE TAB */}
        {activeTab === "profile" && (
          <>
            <div className="avatar">
              {image ? (
                <img src={image} alt="profile" />
              ) : (
                user?.name?.charAt(0)?.toUpperCase()
              )}
            </div>

            <input type="file" onChange={handleImageUpload} />

            <p>Email: {user.email}</p>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />

            <button className="btn btn-save" onClick={handleSaveName}>
              Save Changes
            </button>
          </>
        )}

        {/* 📦 ORDERS TAB */}
        {activeTab === "orders" && (
          <div>
            <h3>Your Orders</h3>

            {orders.length === 0 ? (
              <p>No orders yet</p>
            ) : (
              orders.map((order, index) => (
                <div key={index} className="order-card">
                  <p>Order #{index + 1}</p>
                  <p>Total: ₹{order.total}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* 🔑 SETTINGS TAB */}
        {activeTab === "settings" && (
          <>
            <h3>Change Password</h3>

            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />

            <button className="btn btn-save" onClick={handleChangePassword}>
              Update Password
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Account;