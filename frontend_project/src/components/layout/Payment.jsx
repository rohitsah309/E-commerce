import React from "react";
import { useContext } from "react";
import { CartContext } from "../cart/CartContext";
import "./Payment.css";

const PaymentStep = ({ total }) => {
  const { cart, removePurchasedItems } = useContext(CartContext);

  const handleRazorpay = () => {
    const options = {
      key: "rzp_test_SdsxaNYsNwTjSf",
      amount: total * 100, 
      currency: "INR",
      name: "Voltex",
      description: "Order Payment",
      handler: function (response) {
        console.log(response)
        removePurchasedItems(cart);
        window.location.href = "/success";
      },
      theme: {
        color: "#00ffc3",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-card">
      <h2>Payment Method</h2>

      <button className="pay-btn" onClick={handleRazorpay}>
        Pay ₹{total} with Razorpay
      </button>
    </div>
  );
};

export default PaymentStep;