import React from "react";
import "./Success.css";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="success-container">


      <div className="success-icon">
        ✔
      </div>

   
      <h1>
        Order Confirmed! <span>🎉</span>
      </h1>

      <p className="subtitle">
        Thank you for your purchase. Your order has been placed successfully.
      </p>


      <div className="order-card">
        <div className="row">
          <span>Order Number</span>
          <span className="highlight">ORD-6DWGEI</span>
        </div>

        <div className="row">
          <span>Status</span>
          <span className="status">📦 Processing</span>
        </div>

        <div className="row">
          <span>Estimated Delivery</span>
          <span>April 21, 2026</span>
        </div>

        <div className="divider"></div>

        <p className="note">
          A confirmation email has been sent to your inbox with tracking details.
        </p>
      </div>


      <div className="actions">
        <button className="btn-outline" onClick={() => navigate("/")}>
          ⬅ Back to Home
        </button>

        <button className="btn-primary" onClick={() => navigate("/products")}>
          Continue Shopping →
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;