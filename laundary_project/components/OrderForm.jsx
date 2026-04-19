import { useState } from "react";

const prices = {
  Shirt: 50,
  Pants: 80,
  Saree: 100
};

export default function OrderForm({ addOrder }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState([{ type: "Shirt", quantity: 1 }]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let total = 0;

    const updatedItems = items.map(item => {
      const price = prices[item.type];
      total += price * item.quantity;
      return { ...item, price };
    });

    const order = {
      id: Date.now(),
      customerName: name,
      phone,
      items: updatedItems,
      total,
      status: "RECEIVED"
    };

    addOrder(order);

    setName("");
    setPhone("");
    setItems([{ type: "Shirt", quantity: 1 }]);
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Create Order</h2>

      <input
        placeholder="Customer Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />

      {items.map((item, index) => (
        <div key={index}>
          <select
            value={item.type}
            onChange={(e) => {
              const newItems = [...items];
              newItems[index].type = e.target.value;
              setItems(newItems);
            }}
          >
            <option>Shirt</option>
            <option>Pants</option>
            <option>Saree</option>
          </select>

          <input
            type="number"
            value={item.quantity}
            onChange={(e) => {
              const newItems = [...items];
              newItems[index].quantity = Number(e.target.value);
              setItems(newItems);
            }}
          />
        </div>
      ))}

      <button type="button" onClick={() => setItems([...items, { type: "Shirt", quantity: 1 }])}>
        Add Item
      </button>

      <br /><br />
      <button type="submit">Create Order</button>
    </form>
  );
}