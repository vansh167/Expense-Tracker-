import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserContext, UserProvider } from './components/UserContext';
import Home from './components/Home';
import ExpenseTracker from './components/ExpenseTracker';
import Sidebar from './components/Sidebar';
import Settings from './components/settings';
import Calculator from './components/calcu';
import ProfileSettings from './components/ProfileSettings';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './style/App.css';
import '../src/components/ProfileSettings';
import LoanManagement from './components/Loan';

const initialIncomeCategories = ['Salary', 'Freelance', 'Investments'];
const initialExpenseCategories = ['Food', 'Transport', 'Shopping', 'Bills'];

const App = () => {
  const { user } = useContext(UserContext);
  const userKey = user?.email || 'guest';

  const [transactions, setTransactions] = useState(() => {
    const data = localStorage.getItem(`${userKey}_transactions`);
    return data ? JSON.parse(data) : [];
  });

  const [incomeCategories, setIncomeCategories] = useState(() => {
    const data = localStorage.getItem(`${userKey}_incomeCategories`);
    return data ? JSON.parse(data) : initialIncomeCategories;
  });

  const [expenseCategories, setExpenseCategories] = useState(() => {
    const data = localStorage.getItem(`${userKey}_expenseCategories`);
    return data ? JSON.parse(data) : initialExpenseCategories;
  });

  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem(`${userKey}_currency`) || 'INR';
  });

  const [userProfile, setUserProfile] = useState(() => {
    const data = localStorage.getItem(`${userKey}_userProfile`);
    return data ? JSON.parse(data) : { name: '', email: userKey };
  });

  const [darkMode, setDarkMode] = useState(false);

  // Update document theme
  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem(`${userKey}_transactions`, JSON.stringify(transactions));
  }, [transactions, userKey]);

  useEffect(() => {
    localStorage.setItem(`${userKey}_incomeCategories`, JSON.stringify(incomeCategories));
  }, [incomeCategories, userKey]);

  useEffect(() => {
    localStorage.setItem(`${userKey}_expenseCategories`, JSON.stringify(expenseCategories));
  }, [expenseCategories, userKey]);

  useEffect(() => {
    localStorage.setItem(`${userKey}_currency`, currency);
  }, [currency, userKey]);

  useEffect(() => {
    localStorage.setItem(`${userKey}_userProfile`, JSON.stringify(userProfile));
  }, [userProfile, userKey]);

  // ✅ Updated addTransaction with balance validation
  const addTransaction = (newTxn) => {
    const income = transactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    // Prevent invalid expense
    if (newTxn.type === 'Expense' && newTxn.amount > balance) {
      alert('❌ Not enough balance to add this expense.');
      return;
    }

    setTransactions(prev => [...prev, newTxn]);
  };

  const deleteTransaction = (index) => {
    setTransactions(prev => prev.filter((_, i) => i !== index));
  };
 const LoanManagment =({})
  // If not logged in
  if (!user) {
    return (
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    );
  }
const income = transactions
  .filter(t => t.type === 'Income')
  .reduce((sum, t) => sum + t.amount, 0);

const expense = transactions
  .filter(t => t.type === 'Expense')
  .reduce((sum, t) => sum + t.amount, 0);

const balance = income - expense;

  return (
    <div className="app-container">
      <Sidebar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                transactions={transactions}
                deleteTransaction={deleteTransaction}
                addTransaction={addTransaction} // ✅ added
                currency={currency}
              />
            }
          />
          <Route
            path="/expense-tracker"
            element={
              <ExpenseTracker
                addTransaction={addTransaction}
                incomeCategories={incomeCategories}
                expenseCategories={expenseCategories}
                currency={currency}
              />
            }
          />
          <Route 
          path="/loan"
           element={<LoanManagement
  onAddTransaction={addTransaction}
  currentUserEmail={user?.email}
  currentBalance={balance}
/>
}
          />

        
          <Route
            path="/calculator"
            element={<Calculator transactions={transactions} />}
          />
          <Route
            path="/settings"
            element={
              <Settings
                incomeCategories={incomeCategories}
                setIncomeCategories={setIncomeCategories}
                expenseCategories={expenseCategories}
                setExpenseCategories={setExpenseCategories}
              />
            }
          />
   <Route
  path="/payment"
  element={
    <ProfileSettings
      currency={currency}
      setCurrency={setCurrency}
      userProfile={userProfile}
      setUserProfile={setUserProfile}
      addTransaction={addTransaction}
      transactions={transactions}
      balance={balance}
    />
  }
/>

          <Route
            path="/payment"
            element={
              <ProfileSettings
                currency={currency}
                setCurrency={setCurrency}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
};

const WrappedApp = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

export default WrappedApp;
