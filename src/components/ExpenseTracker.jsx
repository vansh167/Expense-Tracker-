import React, { useState } from 'react';
import '../style/Expense.css';

const ExpenseTracker = ({ addTransaction, incomeCategories, expenseCategories }) => {
  const categories = {
    Income: incomeCategories,
    Expense: expenseCategories,
  };

  const [form, setForm] = useState({
    type: 'Expense',
    category: '',
    amount: '',
    description: '',
    date: '',  // <-- added date field here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'type') {
      setForm({ ...form, type: value, category: '' });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Require category, amount, and date
    if (!form.category || !form.amount || !form.date) return;

    const newTransaction = {
      ...form,
      amount: parseFloat(form.amount),
    };

    addTransaction(newTransaction);

    setForm({
      type: 'Expense',
      category: '',
      amount: '',
      description: '',
      date: '',  // reset date field
    });
  };

  return (
    <div className="tracker-container">
      <h2>Track Your Income and Expenses</h2>
      <p className="sub-text">
        Keep your financial records organized by logging each transaction. Select the type, choose a category, and enter the details below.
      </p>

      <form onSubmit={handleSubmit} className="expense-form">
        <label>
          Transaction Type
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </label>

        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">-- Select Category --</option>
            {categories[form.type].map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <label>
          Amount
          <input
            type="number"
            name="amount"
            placeholder="Enter amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description <span className="optional">(optional)</span>
          <input
            type="text"
            name="description"
            placeholder="e.g. Grocery shopping, freelance work"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default ExpenseTracker;
