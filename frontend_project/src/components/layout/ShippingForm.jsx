import { useState } from "react";
import "./ShippingForm.css"
const ShippingForm = ({ onNext }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {

    if (!form.firstName || !form.address || !form.city) {
      alert("Please fill required fields");
      return;
    }

    onNext();
  };

  return (
    <div className="shipping-card">
      <h2>Shipping Details</h2>

        <div className="row">
            <div>
                <label>FIRST NAME *</label>
                <input name="firstName" placeholder="Enter First Name" onChange={handleChange} />
            </div>

            <div>
                <label>LAST NAME *</label>
                <input name="lastName" placeholder="Enter Last Name" onChange={handleChange} />
            </div>
        </div>

        <label>ADDRESS *</label>
        <input name="address" placeholder="Full Address" onChange={handleChange} />

        <div className="row">
            <div>
                <label>CITY *</label>
                <input name="city" placeholder="Enter City" onChange={handleChange} />
            </div>

            <div>
                <label>STATE</label>
                <input name="state" placeholder="Enter State" onChange={handleChange} />
            </div>

            <div>
                <label>ZIP *</label>
                <input name="zip" placeholder="Enter Postal Code" onChange={handleChange} />
            </div>
        </div>

        <label>PHONE (OPTIONAL)</label>
        <input name="phone" placeholder="+91 7272727272" onChange={handleChange} />
        <button className="continue-btn" onClick={handleSubmit}>
            Continue →
        </button>
    </div>
  );
};


export default ShippingForm