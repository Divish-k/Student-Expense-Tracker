const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Expense Schema
const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    enum: ['Food', 'Travel', 'Coffee', 'Shopping', 'Entertainment', 'Other'],
    default: 'Other'
  },
  date: { type: Date, default: Date.now },
  note: { type: String, trim: true }
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

// ── Routes ──────────────────────────────────────────────

// GET all expenses
app.get('/api/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

// POST add expense
app.post('/api/expenses', async (req, res) => {
  try {
    const { title, amount, category, date, note } = req.body;
    if (!title || amount == null) {
      return res.status(400).json({ error: 'Title and amount are required' });
    }
    const expense = new Expense({ title, amount, category, date, note });
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add expense' });
  }
});

// DELETE expense
app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// GET summary stats
app.get('/api/expenses/stats', async (req, res) => {
  try {
    const expenses = await Expense.find();
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    const byCategory = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {});
    res.json({ total, count: expenses.length, byCategory });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
