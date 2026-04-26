import React, {useState, useEffect} from "react";
import "./Account.css";
import { toast } from "react-toastify";
import { Phone } from "lucide-react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import { Trash2 } from "lucide-react";

const Account = () => {

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);



  const [openPayment, setOpenPayment] = useState(false);

  const [payments, setPayments] = useState(() => {
    return JSON.parse(localStorage.getItem("payments")) || [];
  });

  const handleSavePayment = (newCard) => {
    let updated = [...payments, newCard];

    if (newCard.isDefault) {
      updated = updated.map((card, i) => ({
        ...card,
        isDefault: i === updated.length - 1,
      }));
    }

    setPayments(updated);
    localStorage.setItem("payments", JSON.stringify(updated));
  };



  const [addresses, setAddresses] = useState(() => {
    return JSON.parse(localStorage.getItem("addresses")) || [];
  });


  const handleSaveAddress = (newAddress) => {
    let updated = [...addresses, newAddress];

    if (newAddress.isDefault) {
      updated = updated.map((addr, i) => ({
        ...addr,
        isDefault: i === updated.length - 1,
      }));
    }

    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };

  const handleDeleteAddress = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };


  const handleSetDefault = (index) => {
    const updated = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));

    setAddresses(updated);
    localStorage.setItem("addresses", JSON.stringify(updated));
  };



  const handleSetDefaultPayment = (index) => {
    const updated = payments.map((card, i) => ({
      ...card,
      isDefault: i === index,
    }));

    setPayments(updated);
    localStorage.setItem("payments", JSON.stringify(updated));
  };


  const handleDeletePayment = (index) => {
    const updated = payments.filter((_, i) => i !== index);
    setPayments(updated);
    localStorage.setItem("payments", JSON.stringify(updated));
  };




  const handleUpdate = () => {
    if (currentPassword === newPassword){
      setError("New password must be different from current password ❌")
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    toast.success("Password updated successfully ✅");
  };

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("currentUser"));
  });

  useEffect(() => {
    const handleAuthChange = () =>{
      const updateUser = JSON.parse(localStorage.getItem("currentUser"));
      setUser(updateUser)
    };
    window.addEventListener("authChanged", handleAuthChange);
    
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      window.location.href = "/auth";
    }

    return () => {
      window.removeEventListener("authChanged", handleAuthChange);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.setItem("authChange", Date.now());
    window.dispatchEvent(new Event("authChanged"));
    toast.success("Logged out successfully 👋");

    window.location.href = "/auth";
  };

  const[isEditing, setIsEditing] = useState(false)
  const[formData, setFormData] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
      
    return{
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      dob: user?.dob || ""
    };
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData(prev => ({
          ...prev,
        [name]: value
      }));
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      toast.error("Enter valid 10-digit phone");
      return;
    }

    if (!formData.gender) {
      toast.error("Please select gender")
      return;
    }

    if (!formData.dob) {
      toast.error("Date of birth is required");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (formData.dob > today){
      toast.error("DOB cannot be in the future");
      return;
    }
    
    const updatedUser = {
      ...user,
      ...formData,
      dob: formData.dob
    };

    // update current user
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // update users list
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users = users.map(u =>
      u.email === user.email ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(users));

    setUser(updatedUser);
    setIsEditing(false);

    window.dispatchEvent(new Event("authChanged"));

    toast.success("Profile updated ✅");
  };




  return (
    <div className="account-page">

      <div className="profile-header">
        <div className="user-info">
          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="user-text">
            <h2>Welcome, {user?.name || "user"}</h2>
            <p className="email">{user?.email}</p>
          </div>
        </div>

        <button className="profile-logout-btn" onClick={handleLogout}>
          Sign Out
        </button>
      </div>

      {/* EDIT PROFILE */}
      <div className="profile-card">
        <div className="card-header">
          <h3>👤 Edit Profile</h3>
          <button 
            className="edit-btn"
            onClick={() => {
              if(isEditing){
                handleSave();
              } else {
                setIsEditing(true);
              }
            }}
          >
            {isEditing ? "save" : "Edit"}
          </button>
        </div>

        <div className="profile-grid">
          <div className="input-box">
            <label>FULL NAME</label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter Full Name"
              onChange={handleChange}
              readOnly = {!isEditing}
            />
          </div>

          <div className="input-box">
            <label>EMAIL</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              disabled
            />
          </div>

          <div className="input-box">
            <label>PHONE</label>
            <input
              type="phone"
              name="phone"
              value={formData.phone}
              placeholder="Enter Phone number"
              maxLength="10" 
              onChange={handleChange}
              readOnly = {!isEditing}
            />
          </div>
          <div className="input-box">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled = {!isEditing}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Trans">Trans</option>
            </select>
          </div>
          <div className="input-box">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              placeholder="Enter DOB" 
              onChange={handleChange}
              readOnly = {!isEditing}
            />
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD */}
      <div className="profile-card">
        <h3>🔑 Change Password</h3>
        <div className="password-section">
          <div className="password-group">
            <label>Current Password</label>
            <div className="input-wrapper">
              <input 
                type={showCurrent ? "text" : "password"}
                placeholder="••••••" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <span onClick={() => setShowCurrent(!showCurrent)}>
                {showCurrent ? "🙈" : "👁"}
              </span>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <label>New Password</label>
              <div className="input-wrapper">
                <input 
                  type={showNew ? "text" : "password"}
                  placeholder="••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span onClick={() => setShowNew(!showNew)}>
                  {showNew ? "🙈" : "👁"}
                </span>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <div className="input-wrapper">
                <input 
                  type= {showConfirm ? "text" : "password"}
                  placeholder="••••••" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? "🙈" : "👁"}
                </span>
                
              </div>
            </div>
          </div>

          {error && <p className="error">{error}</p>}
          <p className="hint">
            Use at least 6 characters with a mix of letters, numbers, and symbols.
          </p>

          <button className="primary-btn" onClick={handleUpdate}>
            Update Password
          </button>
        </div>
      </div>

      {/* ADDRESSES */}
      <div className="profile-card">
        <div className="card-header">
          <h3>📍 Saved Addresses</h3>
          <button className="add-btn" onClick={() => setOpen(true)}>+ Add</button>
          {open &&(
            <AddressForm 
              onClose={() => setOpen(false)}
              onSave ={handleSaveAddress}
            />
          )}
        </div>

        <div className="profile-grid">
          {addresses.length === 0 && <p>No address added</p>}
          {addresses.map((addr, index) => (
            <div className="address-box" key={index}>
              <div className="box-top">
                <h4>
                  {addr.fullName}
                  {addr.isDefault && (
                    <span className="add-badge">DEFAULT</span>
                  )}
                </h4>
                <span
                  className="delete-btn"
                  onClick={() => handleDeleteAddress(index)}
                >
                 <Trash2 size={16} />
                </span>
              </div>
              <p className="main-text">{addr.flat}</p>
              <p className="sub-text">{addr.area}</p>
              <p className="sub-text">
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="sub-text">📞 {addr.mobile}</p>
              {!addr.isDefault && (
                <p 
                  className="set-default"
                  onClick={() => handleSetDefault(index)}
                >
                  Set as default
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      
      <div className="profile-card">
        <div className="card-header">
          <h3>💳 Payment Methods</h3>
          <button className="add-btn" onClick={() => setOpenPayment(true)}>+ Add</button>

          {openPayment && (
            <PaymentForm
              onClose={() => setOpenPayment(false)}
              onSave={handleSavePayment}
            />
          )}
        </div>

        <div className="profile-grid">
          {payments.map((card, index) => (
            <div className="payment-box" key={index}>
              <div className="box-top">
                <div className="card-left">
                  {card.brand === "visa" && (
                    <img src="https://img.icons8.com/color/48/visa.png" alt="visa" />
                  )}
                  {card.brand === "mastercard" && (
                    <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="mc" />
                  )}
                  {card.brand === "rupay" && (
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/RuPay.svg" alt="rupay" />
                  )}
                  {card.brand === "amex" && (
                    <img src="https://img.icons8.com/color/48/amex.png" alt="amex" />
                  )}
                  {card.brand === "discover" && (
                    <img src="https://img.icons8.com/color/48/discover.png" alt="discover" />
                  )}
                
                  <h4>
                    {card.brand?.toUpperCase()}
                    {card.isDefault && (
                      <span className="add-badge">DEFAULT</span>
                    )}
                  </h4>
                </div>
                <span
                  className="delete-btn"
                  onClick={() => handleDeletePayment(index)}>
                  <Trash2 size={16} />
                </span>
              </div>
              <p className="card-number">
                **** **** **** {card.cardNumber.slice(-4)}
              </p>
              <p className="sub-text">Exp {card.expiry}</p>

              {!card.isDefault && (
                <p 
                  className="set-default"
                  onClick={() => handleSetDefaultPayment(index)}
                >
                  Set as default
                </p>
              )}
            </div>
          ))}
          
        </div>
      </div>

    </div>
    
  );
};

export default Account;