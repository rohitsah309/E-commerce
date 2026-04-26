import React, { useState } from "react";
import "./PaymentForm.css";



const PaymentForm = ({ onClose, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
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
    onSave({
      ...form,
      cardNumber: form.cardNumber.replace(/\s/g, ""),
      brand: form.brand
    });
    onClose();
  };


  const detectBrand = (number) => {
    if (!number) return null;

    if (/^4/.test(number)) return "visa";
    if (/^5[1-5]/.test(number)) return "mastercard";
    if (/^3[47]/.test(number)) return "amex";
    if (/^6/.test(number)) return "discover";
    if (/^60|^65|^81|^82|^508/.test(number)) return "rupay";

    return null;
  };


  const [errors, setErrors] = useState({});

  return (
    <div className="pf-overlay">
      <div className="pf-modal">

        <div className="pf-header">
          <div>
            <h2>Add new card</h2>
            <p className="pf-sub">
              Save a payment method for faster checkout.
            </p>
          </div>
          <span className="pf-close" onClick={onClose}>×</span>
        </div>

        <form className="pf-body" onSubmit={handleSubmit}>

          <label>Cardholder name</label>
          <input 
            name="name" placeholder="Enter Cardholder Name" onChange={handleChange} required />

          <label>Card number</label>

          <div className="card-input-wrapper">
            <input 
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={form.cardNumber}
              onChange={(e) => {
                let raw = e.target.value.replace(/\D/g, "").substring(0, 16);
                const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
                const brand = raw.length >= 4 ? detectBrand(raw) : null;
                
                setForm({
                  ...form,
                  cardNumber: formatted,
                  brand,
                });

                  // validation
                if (raw.length > 0 && raw.length < 16) {
                  setErrors((prev) => ({
                    ...prev,
                    cardNumber: "Card number must be 16 digits",
                  }));
                } else if (!brand && raw.length >= 4) {
                  setErrors((prev) => ({
                    ...prev,
                    cardNumber: "Unsupported card",
                  }));
                } else {
                  setErrors((prev) => ({
                    ...prev,
                    cardNumber: "",
                  }));
                }
              }}
              required 
            />

            {form.brand && (
              <div className="card-brand">
                {form.brand === "visa" && (
                  <img src="https://img.icons8.com/color/48/visa.png" alt="visa" />
                )}

                {form.brand === "mastercard" && (
                  <img src="https://img.icons8.com/color/48/mastercard-logo.png" alt="mc" />
                )}

                {form.brand === "rupay" && (
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/RuPay.svg" alt="rupay" />
                )}

                {form.brand === "amex" && (
                  <img src="https://img.icons8.com/color/48/amex.png" alt="amex" />
                )}

                {form.brand === "discover" && (
                  <img src="https://img.icons8.com/color/48/discover.png" alt="discover" />
                )}
              </div>
            )} 
          </div>
          {errors.cardNumber && (
            <p className="input-error">{errors.cardNumber}</p>
          )}
            

          <div className="pf-row">
            <div>
              <label>Expiry (MM/YY)</label>
              <input
                name="expiry"
                placeholder="MM/YY"
                value={form.expiry}
                onChange={(e)=> {
                   let value = e.target.value.replace(/\D/g, "").substring(0, 4);

                  if (value.length >= 3) {
                    value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2");
                  }

                  setForm({ ...form, expiry: value });
                }}
                required
              />
            </div>

            <div>
              <label>CVC</label>
              <input
                name="cvc"
                placeholder="***"
                value={form.cvc}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "").substring(0, 3);
                  setForm({ ...form, cvc: value });
                }}
                required
              />
            </div>
          </div>

          <div className="pf-checkbox">
            <label className="custom-check">
              <input type="checkbox" name="isDefault" onChange={handleChange} />
              <span className="checkmark"></span>
            </label>
            <span>Set as default payment method</span>
          </div>

          <div className="pf-footer">
            <button type="button" className="pf-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="pf-submit">
              + Add card
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PaymentForm;