# 🌿 Veg Aroma — Restaurant Management System

A full-stack-ready **React + Vite** restaurant app with two completely separate panels:

## 🎯 Two Panels

### 👨‍🍳 Customer Panel (`/menu`)
- **Table selection** — pick your table before ordering
- **Full menu** with category tabs, live search, images
- **Cart** — add/remove items, qty controls, bill preview with GST
- **Order placement** — place order without page reload (React state)
- **Real-time order tracking** — animated stepper (Pending → Preparing → Ready → Served)
- **Live notifications** — pop-up alerts when admin changes order status

### ⚙️ Admin Panel (`/admin`)
- **Dashboard** — today's revenue, orders, table occupancy, popular items
- **Live Orders** — filter by status, update orders (Pending → Preparing → Ready → Served)
- **🖨️ Bill Printing** — one-click print bill to thermal/any printer per table
- **Table Management** — visual grid, occupied/available, clear table
- **Menu Management** — add/edit/delete items, upload images, toggle availability, mark popular
- **Order History** — full log with revenue stats, search by order ID/table/dish

---

## 🚀 Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Open browser
```
http://localhost:3000        → Landing (choose Customer or Admin)
http://localhost:3000/menu   → Customer Panel
http://localhost:3000/admin  → Admin Panel
```

---

## 📦 Tech Stack
- **React 18** + **Vite 5**
- **React Router v6** — client-side routing (NO page reloads)
- **React Hot Toast** — toast notifications
- **Lucide React** — icons
- **CSS Modules** — scoped styling, no class collisions
- **Context API + useReducer** — global state (cart, orders, tables, notifications)

---

## 🏗️ Project Structure

```
src/
├── App.jsx                    # Root router
├── main.jsx                   # Entry point
├── index.css                  # Global styles + CSS variables
│
├── context/
│   └── AppContext.jsx         # Global state (orders, cart, tables, menu)
│
├── data/
│   └── menuData.js            # All 90+ menu items with categories
│
├── pages/
│   ├── RootSelector.jsx       # Landing page — choose Customer or Admin
│   │
│   ├── customer/
│   │   ├── CustomerApp.jsx    # Customer routing
│   │   ├── TableSelect.jsx    # Table picker
│   │   ├── MenuPage.jsx       # Full menu with categories + search
│   │   ├── CartPage.jsx       # Cart review + order placement
│   │   └── OrderStatus.jsx    # Real-time order tracking
│   │
│   └── admin/
│       ├── AdminApp.jsx       # Admin routing
│       ├── AdminDashboard.jsx # Stats + overview
│       ├── AdminOrders.jsx    # Live orders + status management + printing
│       ├── AdminTables.jsx    # Table status management
│       ├── AdminMenu.jsx      # Menu CRUD (add/edit/delete/toggle)
│       └── AdminHistory.jsx   # Full order history + earnings
│
└── components/
    ├── customer/
    │   ├── MenuItemCard.jsx   # Dish card with qty controls
    │   ├── CartBar.jsx        # Sticky bottom cart bar
    │   └── CustomerNotification.jsx  # Real-time status notification
    │
    └── admin/
        └── AdminLayout.jsx   # Sidebar + topbar layout
```

---

## 🔑 Key Features

### No Page Reloads
All state is managed with **React Context + useReducer**. Placing an order, updating status, adding menu items — none of these cause page reloads.

### Real-Time Notifications
When admin updates an order status (Preparing/Ready/Served), a notification automatically appears on the customer's order tracking page — no WebSocket needed, all via shared React state.

### Bill Printing
Admin can click **🖨️ Print Bill** on any order. Opens a formatted receipt in a new window and triggers browser print dialog — works with any printer including thermal.

### Menu Management
Admin can:
- Upload a photo from device
- Set name, price, category, description
- Toggle availability on/off instantly
- Mark as "Popular" (shows ⭐ badge on customer side)

---

## 🔮 Future Enhancements
- Backend API (Node.js + MongoDB)
- WebSocket for true real-time sync across devices
- QR code generation per table
- Multiple payment gateway integration
- Role-based auth (admin login)
- Analytics dashboard with charts
