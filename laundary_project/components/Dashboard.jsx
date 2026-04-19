export default function Dashboard({ data }) {
  if (!data) return null;

  return (
    <div className="card">
      <h2>Dashboard</h2>

      <div className="dashboard">
        <div>
          <h3>{data.totalOrders}</h3>
          <p>Orders</p>
        </div>

        <div>
          <h3>₹{data.totalRevenue}</h3>
          <p>Revenue</p>
        </div>

        <div>
          <p>Received: {data.statusCount.RECEIVED}</p>
          <p>Processing: {data.statusCount.PROCESSING}</p>
          <p>Ready: {data.statusCount.READY}</p>
          <p>Delivered: {data.statusCount.DELIVERED}</p>
        </div>
      </div>
    </div>
  );
}