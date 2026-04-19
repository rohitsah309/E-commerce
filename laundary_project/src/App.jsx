import { useState } from "react";
import OrderForm from "../components/OrderForm";
import OrderList from "../components/OrderList";
import Dashboard from "../components/Dashboard";

function App() {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  const updateStatus = (id, status) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status } : o
    );
    setOrders(updated);
  };

  const dashboard = {
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
    statusCount: {
      RECEIVED: orders.filter(o => o.status === "RECEIVED").length,
      PROCESSING: orders.filter(o => o.status === "PROCESSING").length,
      READY: orders.filter(o => o.status === "READY").length,
      DELIVERED: orders.filter(o => o.status === "DELIVERED").length,
    }
  };

  return (
    <div style={{ padding: "20px" }} className="container">
      <h1>Laundry Management System</h1>

      <Dashboard data={dashboard} />

      <OrderForm addOrder={addOrder} />

      <OrderList
        orders={orders}
        updateStatus={updateStatus}
      />
    </div>
  );
}

export default App;