# 💸 Student Expense Tracker

A full-stack web app to track student expenses — built with HTML/CSS/JS frontend, Node.js/Express backend, and MongoDB.

---

## 📁 Project Structure

```
expense-tracker/
├── backend/
│   ├── server.js        ← Express API
│   ├── package.json
│   └── .env             ← MongoDB URI config
└── frontend/
    └── index.html       ← Complete frontend (single file)
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) running locally **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

---

### Step 1 — Start the Backend

```bash
cd backend
npm install
npm start
```

Server runs at: `http://localhost:5000`

To use a custom MongoDB URI, edit `backend/.env`:
```
MONGO_URI=mongodb://localhost:27017/expense-tracker
PORT=5000
```

For MongoDB Atlas, replace with your connection string:
```
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/expense-tracker
```

---

### Step 2 — Open the Frontend

Simply open `frontend/index.html` in your browser.

> No build step needed — it's plain HTML/CSS/JS.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Fetch all expenses |
| POST | `/api/expenses` | Add a new expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| GET | `/api/expenses/stats` | Summary stats |

### POST Body Example
```json
{
  "title": "Chai & Samosa",
  "amount": 30,
  "category": "Food",
  "date": "2025-01-15",
  "note": "Shared with Rahul"
}
```

### Categories
`Food` · `Coffee` · `Travel` · `Shopping` · `Entertainment` · `Other`

---

## ✨ Features
- ✅ Add expenses with title, amount, category, date & note
- ✅ View all expenses with colour-coded categories
- ✅ Filter by category
- ✅ Delete any expense
- ✅ Live stats: total spent, count, top category
- ✅ Responsive layout (works on mobile too)
