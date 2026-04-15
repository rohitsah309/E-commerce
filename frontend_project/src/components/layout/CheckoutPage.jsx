import React, { useContext, useState } from "react";
import "./CheckoutPage.css";
import { CartContext } from "../cart/CartContext";
import ShippingForm from "./ShippingForm"
import Payment from "./Payment";
const CheckoutPage = () => {
  const { cart } = useContext(CartContext);
  const [step, setStep] = useState(1);

  const total =
    cart?.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) || 0;

  return (
    <div className="checkout-container">
      <div className="steps">
        <div className={`step ${step === 1 ? "active" : ""}`}>
          <div className="circle">1</div>
          <span>Shipping</span>
        </div>

        <div className="line"></div>

        <div className={`step ${step === 2 ? "active" : ""}`}>
          <div className={`circle ${step !== 2 && "inactive"}`}>2</div>
          <span>Payment</span>
        </div>
      </div>

      <div className="checkout-content">

        {step === 1 ? (
          <ShippingForm onNext={() => setStep(2)} />
        ) : (
          <Payment total={total} />
        )}


        <div className="summary-card">
            <h3>Order Summary</h3>

             {cart?.map((item) => (
            <div className="product" key={item.id}>
                <div className="product-left">
                    <img src={item.image} alt="" />
                    <div>
                        <p className="product-name">{item.name}</p>
                        <span className="qty">Qty: {item.quantity}</span>
                    </div>
                </div>
                <p className="price">₹{item.price * item.quantity}</p>
                </div>
                ))}

                <div className="divider"></div>

                <div className="summary-line">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                </div>

                <div className="summary-line">
                    <span>Shipping</span>
                    <span className="free">Free</span>
                </div>

                <div className="divider"></div>

                <div className="total">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
            </div>
      </div>
    </div>
  );
};

export default CheckoutPage;