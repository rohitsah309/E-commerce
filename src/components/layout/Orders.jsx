import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./Orders.css"

const Orders = () => {

  const [openIndex, setOpenIndex] = useState(null);
  
  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });

  useEffect(() => {
    const handleStorage = () => {
      const data = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(data);
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const getStep = (order, step) => {
    const flow = ["Processing", "Packed", "Shipped", "Out for Delivery", "Delivered"];

    const current = flow.indexOf(order.status);
    const stepIndex = flow.indexOf(step);

    if (order.status === "Delivered") return "done";
    if (stepIndex < current) return "done";
    if (stepIndex === current) return "active";
    return "";
  };

  const withAutoStatus = (list) => {
    return list.map((order) => {
      const created = order.createdAt || Date.now();
      const diff = Date.now() - created;

      const DAY = 24 * 60 * 60 * 1000;
      let status = "Processing";
      if (diff > 5 * DAY) status = "Delivered";
      else if (diff > 4 * DAY) status = "Out for Delivery";
      else if (diff > 2 * DAY) status = "Shipped";
      else if (diff > 1 * DAY) status = "Packed";

      return { ...order, status };
    });
  };

  const displayOrders = withAutoStatus(orders);

  const totalOrders = displayOrders.length;
  
  const deliveredOrders = displayOrders.filter(
    (o) => o.status === "Delivered"
  ).length;

  const inTransitOrders = displayOrders.filter(
    (o) => o.status === "Shipped" || o.status === "Packed"
  ).length;

  const totalSpent = displayOrders.reduce((sum, o) => {
    return sum + (o.total || 0);
  }, 0);


  const getDeliveryText = (deliveryDate) => {
    if (!deliveryDate) return "";

    const today = new Date();
    const delivery = new Date(deliveryDate);

  
    today.setHours(0,0,0,0);
    delivery.setHours(0,0,0,0);

    const diffTime = delivery - today;
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const formattedDate = delivery.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

    if (daysLeft > 1) {
      return `Arriving by ${formattedDate} • ${daysLeft} days left`;
    } else if (daysLeft === 1) {
      return `Arriving by ${formattedDate} • Tomorrow`;
    } else if (daysLeft === 0) {
      return `Out for Delivery 🚚`;
    } else {
      return `Delivered on ${formattedDate}`;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) => [...prev]);
    }, 60000); 

    return () => clearInterval(interval);
  }, []);



  const generateInvoice = (order) => {
    const doc = new jsPDF();
        // 🔹 STORE INFO
    doc.setFontSize(18);
    doc.setTextColor(0, 255, 213);
    doc.text("Voltex", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Pune, Maharashtra, India", 14, 26);
      doc.text("GSTIN: 27ABCDE1234F1Z5", 14, 32);

    // 🔹 INVOICE TITLE
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("INVOICE", 150, 20);

    // 🔹 ORDER DETAILS
    doc.setFontSize(11);
    doc.text(`Order ID: ${order.id}`, 14, 45);
    doc.text(`Order Date: ${order.date}`, 14, 52);
    doc.text(`Status: ${order.status}`, 14, 59);

    doc.text(
      `Delivery: ${new Date(order.estimatedDelivery).toLocaleDateString("en-IN")}`,
      14,
      66
    );

    // 🔹 CUSTOMER (optional placeholder)
    doc.text("Bill To:", 14, 80);
    doc.text("Customer Name", 14, 86);
    doc.text("India", 14, 92);

    // 🔹 TABLE DATA
    const tableData = order.items.map((item) => [
      item.name,
      item.quantity || 1,
      `Rs ${Number(item.price).toLocaleString()}`,
      `Rs ${(item.price * (item.quantity || 1)).toLocaleString()}`
    ]);

    // 🔹 TABLE
    autoTable(doc, {
      startY: 100,
      head: [["Item", "Qty", "Price", "Total"]],
      body: tableData,
      theme: "grid",
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [0, 255, 213],
        textColor: 0,
      },
    });

    // 🔹 TOTAL
    const finalY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(12);
    doc.text(
      `Subtotal: Rs ${Number(order.total).toLocaleString()}`,
      140,
      finalY
    );
    doc.text("Shipping: FREE", 140, finalY + 7);

    doc.setFontSize(14);
    doc.setTextColor(0, 150, 136);
    doc.text(
      `Total: Rs ${order.total.toLocaleString()}`,
      14,
      finalY + 18
    );

    // 🔹 FOOTER
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(
      "Thank you for shopping with Voltex!",
      14,
      finalY + 35
    );

    // 🔹 DOWNLOAD
    doc.save(`${order.id}-invoice.pdf`);
  };






  return (
    <div className="orders-page">
      <h1>
        My <span>Orders</span>
      </h1>

      <div className="stats">
        <div className="box green">
          {totalOrders}
          <br/>
          <span>Total Orders</span>
        </div>
        <div className="box purple">
          {deliveredOrders}
          <br/>
          <span>Delivered</span>
        </div>
        <div className="box yellow">
          {inTransitOrders}
          <br/>
          <span>In Transit</span>
        </div>
        <div className="box pink">
          ₹{totalSpent.toLocaleString()}
          <br/>
          <span>Total Spent</span>
        </div>
      </div>

      {displayOrders.map((order, i) => (
        <div className="order-container" key={i}>
          <div
            className="order-row"
            onClick={() =>setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="left">
              <div className="id-date">
                <p className="order-id">{order.id}</p>
                <p className="date">{order.date}</p>
              </div>
            </div>

            <div className="products">
              {order.items.map((item, index) => (
                <div key={index} className="product-chip">
                  <img src={item.image} alt="" />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>

            <div className="right">
              <p className="price">
                ₹{(
                order.total ||
                Number(order.price?.replace(/[₹,]/g, "") || 0)
                ).toLocaleString()}
              </p>
              <span className={`status ${(order.status || "processing").toLowerCase()}`}>
                {order.status}
              </span>
            </div>
          </div>
          {openIndex === i && (
            <div className="order-details">
               <div className="details-header">
                  <span>ITEM</span>
                  <span>SKU</span>
                  <span>QTY</span>
                  <span>AMOUNT</span>
                </div>
    
              {order.items.map((item, idx) => (
                <div key={idx} className="details-row">
                  <div className="item-info">
                    <img src={item.image} alt="" />
                    <div>
                      <p className="item-name">{item.name}</p>
                      <p className="sku">SKU-{idx + 1001}</p>
                    </div>
                  </div>
              
                  <div className="sku-col">SKU-{idx + 1001}</div>
                  <div className="qty">x{item.quantity || 1}</div>
                  <div className="amount">
                    ₹{Number(item.price).toLocaleString()}
                  </div>
                </div>
              ))}
  
              <div className="tracking">
                <p className="tracking-title">// Shipment Tracking</p>

                <div className="timeline-steps">

                  <div className={`step ${getStep(order, "Processing")}`}>
                    <div className="dot"></div>
                    <span>Order Placed</span>
                  </div>

                  <div className={`line ${["done","active"].includes(getStep(order, "Packed")) ? "done" : ""}`}></div>

                  <div className={`step ${getStep(order, "Packed")}`}>
                    <div className="dot"></div>
                    <span>Packed</span>
                  </div>

                  <div className={`line ${["done","active"].includes(getStep(order, "Shipped")) ? "done" : ""}`}></div>

                  <div className={`step ${getStep(order, "Shipped")}`}>
                    <div className="dot"></div>
                    <span>Shipped</span>
                  </div>

                  <div className={`line ${["done","active"].includes(getStep(order, "Out for Delivery")) ? "done" : ""}`}></div>

                  <div className={`step ${getStep(order, "Out for Delivery")}`}>
                    <div className="dot"></div>
                    <span>Out for Delivery 🚚</span>
                  </div>

                  <div className={`line ${["done","active"].includes(getStep(order, "Delivered")) ? "done" : ""}`}></div>

                  <div className={`step ${getStep(order, "Delivered")}`}>
                    <div className="dot"></div>
                    <span>Delivered</span>
                  </div>
                </div>
              </div>

              <div className="bottom-bar">

 
                <div className="order-actions">
                  <button
                    className="btn-outline"
                    onClick={() => generateInvoice(order)}

                  >
                    VIEW INVOICE
                  </button>
                </div>

  
                <div className="summary-box">
                  <div className="row">
                    <span>
                      {order.status === "Delivered" ? "Order Delivered" : "Estimated Delivery"}
                    </span>
                    <span className="delivery-text">
                       {order.status === "Delivered"
                          ? `Delivered on ${new Date(order.estimatedDelivery).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}`
                          : getDeliveryText(order.estimatedDelivery)}
                    </span>
                  </div>
                  <div className="row">
                    <span>Subtotal</span>
                    <span>₹{order.total.toLocaleString()}</span>
                  </div>

                  <div className="row">
                    <span>Shipping</span>
                    <span className="free">FREE</span>
                  </div>

                  <div className="row total">
                    <span>Total</span>
                    <span className="total-price">
                      ₹{order.total.toLocaleString()}
                    </span>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>
       
      ))}
    </div>
    
  );
};

export default Orders;