import React from "react";
import { useContext } from "react";
import { CartContext } from "../cart/CartContext";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const PaymentStep = ({ total }) => {
  const { cart, removePurchasedItems } = useContext(CartContext);

  const navigate = useNavigate();

  const placeOrder = (cartItems) => {
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

      const now = new Date();

      const orderId =
        "ORD-" + Math.random().toString(36).substring(2, 8).toUpperCase();

        const estimated = new Date(now);
          estimated.setDate(now.getDate() + 5);


    const newOrder = {
      id: orderId,
      date: now.toLocaleDateString(),
      createdAt: now.getTime(),
      estimatedDelivery: estimated.toLocaleDateString(),


      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image, 
      })),

      total: cartItems.reduce((sum, item) => {
        return sum + item.price * item.quantity;
        }, 0),

      status: "Processing",
    };

    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    );
     return newOrder;
  };



  const handleRazorpay = () => {
    const options = {
      key: "rzp_test_SdsxaNYsNwTjSf",
      amount: total * 100, 
      currency: "INR",
      name: "Voltex",
      description: "Order Payment",
      handler: function (response) {
        console.log(response)
        const order = placeOrder(cart);
        removePurchasedItems(cart);
        navigate("/success", { state: order });
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