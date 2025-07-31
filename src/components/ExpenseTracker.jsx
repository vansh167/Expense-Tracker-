import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/Expense.css';

const ExpenseTracker = ({ addTransaction, incomeCategories, expenseCategories }) => {
  const categories = {
    Income: incomeCategories,
    Expense: expenseCategories,
  };

  const paymentMethods = [
    { label: '💵 Cash', value: 'Cash' },
    { label: '💳 Card', value: 'Card' },
    { label: '🔁 UPI', value: 'UPI' },
    { label: '🏦 Bank Transfer', value: 'Bank Transfer' },
  ];

  const [form, setForm] = useState({
    type: 'Expense',
    category: '',
    amount: '',
    description: '',
    date: null, // Changed from empty string to null for DatePicker
    paymentMethod: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'type') {
      setForm({ ...form, type: value, category: '' });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // New handler for react-datepicker date change
  const handleDateChange = (date) => {
    setForm({ ...form, date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Required fields check
    if (!form.category || !form.amount || !form.date || !form.paymentMethod) return;

    const newTransaction = {
      ...form,
      amount: parseFloat(form.amount),
      date: form.date.toISOString(), // convert Date object to ISO string
    };

    addTransaction(newTransaction);

    // Reset form
    setForm({
      type: 'Expense',
      category: '',
      amount: '',
      description: '',
      date: null,
      paymentMethod: '',
    });
  };

  return (
    <div className="tracker-container">
      <h2>Track Your Income and Expenses</h2>
      <p className="sub-text">
        Log each transaction, choose a payment method, and stay on top of your finances.
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
          Date:<br />
          <DatePicker
            selected={form.date}
            onChange={handleDateChange}
            dateFormat="MM-dd-yyyy"
            timeFormat='HH:mm'
            placeholderText="Select a date"
            maxDate={new Date()}
            required
          />
        </label>

        <label>
          Payment Method
          <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required>
            <option value="">-- Select Payment Method --</option>
            {paymentMethods.map((method, idx) => (
              <option key={idx} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
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
