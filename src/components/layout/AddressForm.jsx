import React, { useState } from "react";
import "./AddressForm.css";

const AddressForm = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    flat: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose(); 
  };

  return (
    <div className="af-overlay">
        <div className="af-modal">
            <div className="af-header">
                <h2>Add new address</h2>
                <span className="af-close" onClick={onClose}>×</span>
            </div>

            <form className="af-body" onSubmit={handleSubmit}>
                <label>Full name</label>
                <input name="fullName" onChange={handleChange} required />
                <label>Mobile number</label>
                <input name="mobile" onChange={handleChange} required />
                <small>May be used to assist delivery</small>
                <label>Pincode</label>
                <input
                    name="pincode"
                    placeholder="6 digits [0-9]"
                    onChange={handleChange}
                    required
                />
                <label>Flat, House no., Building, Company</label>
                <input name="flat" onChange={handleChange} required />

                <label>Area, Street, Sector, Village</label>
                <input name="area" onChange={handleChange} required />

                <label>Landmark</label>
                <input name="landmark" placeholder="E.g. near hospital" onChange={handleChange} />

                <div className="af-row">
                    <div>
                        <label>Town/City</label>
                        <input name="city" onChange={handleChange} required />
                    </div>

                    <div>
                        <label>State</label>
                        <select name="state" onChange={handleChange} required>
                            <option value="">Choose</option>
                            <option>Maharashtra</option>
                            <option>Gujarat</option>
                            <option>Karnataka</option>
                        </select>
                    </div>
                </div>

                <div className="af-checkbox">
                    <label className="custom-check">
                        <input
                            type="checkbox"
                            name="isDefault"
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                        </label>
                    <span>Make as default address</span>
                    
                </div>

                <div className="af-footer">
                    <button type="button" className="af-cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" className="af-submit">
                        Add address
                    </button>
                </div>

            </form>
        </div>
    </div>
  );
};

export default AddressForm;