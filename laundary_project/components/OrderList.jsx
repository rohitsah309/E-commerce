export default function OrderList({ orders, updateStatus }) {
  return (
    <div className="card">
      <h2>Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          className="order-card"
          style={{ marginBottom: "15px", padding: "10px" }}
        >
          <p>
            <b>{order.customerName}</b> ({order.phone})
          </p>

          <ul>
            {order.items.map((item, i) => (
              <li key={i}>
                {item.type} × {item.quantity}
              </li>
            ))}
          </ul>

          <p>Total: ₹{order.total}</p>

          {/* ✅ STATUS WITH COLOR */}
          <p className={`status ${order.status}`}>
            Status: {order.status}
          </p>

          {/* ✅ DROPDOWN WITH CURRENT VALUE */}
          <select
            value={order.status}
            onChange={(e) => updateStatus(order.id, e.target.value)}
          >
            <option value="RECEIVED">RECEIVED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="READY">READY</option>
            <option value="DELIVERED">DELIVERED</option>
          </select>
        </div>
      ))}
    </div>
  );
}