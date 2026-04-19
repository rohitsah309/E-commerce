🧺 Mini Laundry Order Management System (Frontend Only)

A simple React-based UI to manage laundry orders including creation, status tracking, and dashboard analytics.

✨ Features Implemented

✅ Order Management
    Create new laundry orders
    Add multiple garments (Shirt, Pants, Saree)
    Quantity selection per item
    Automatic bill calculation


✅ Order Status Tracking
    Status options:
        RECEIVED
        PROCESSING
        READY
        DELIVERED
    Update status using dropdown

✅ Dashboard
    Total orders count
    Total revenue calculation
    Status-wise breakdown

✅ UI Features
    Clean card-based layout
    Responsive design
    Status color indicators
    Real-time updates (no reload required)

👉 Example from App logic:
Orders and dashboard are handled using React state

🤖 AI Usage Report
🔹 Tools Used
ChatGPT (primary)
GitHub Copilot (optional)

🔹 Sample Prompts
"Create React frontend for order management system"
"How to manage state for multiple items in React form"
"Create dashboard from array data in React"
"Add CSS for card-based UI design"


🔹 Where AI Helped
Component structure (App, OrderForm, OrderList, Dashboard)
State management logic
Pricing calculation logic
UI styling (CSS)
Debugging axios and backend issues


🔹 What AI Got Wrong
Initially assumed backend API (axios usage)
Caused connection errors (no backend present)
Some UI lacked proper structure initially


🔹 What I Improved
Fixed status update logic
Added responsive UI and styling
Improved UX (empty state, clean layout)
⚖️ Tradeoffs


🔹 What I Skipped
Backend API (Node.js / database)
Authentication system
Persistent storage (data resets on refresh)
Advanced filtering/search


🔹 What I Would Improve
Add backend with database (MongoDB)
Store data using localStorage or API
Add search & filter functionality
Add authentication (login system)
Improve UI with animations and modern design
Add deployment (Vercel / Render)


🧠 Technical Notes
Built using React (Vite)
Uses useState for data management
Styled using custom CSS
Entry point configured in main.jsx