import React from 'react';
import '../style/Home.css';
import PieActiveArc from './oieActiveAc';
import IncomeExpenseBarChart from './Chat';

const Home = ({ transactions, deleteTransaction, currency }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const income = transactions
    .filter(t => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  const formatCurrency = (amount) => {
    const symbolMap = {
      INR: '₹',
      USD: '$',
      EUR: '€',
      GBP: '£',
    };
    const symbol = symbolMap[currency] || '';
    return `${symbol}${amount.toFixed(2)}`;
  };

  return (
    <div className="home-container">
      <div className="pie-wrapper">
        <PieActiveArc transactions={transactions} />
        <IncomeExpenseBarChart transactions={transactions} />
      </div>

      <h2>Dashboard</h2>

      {/* Summary Boxes */}
      <div className="summary-boxes">
        <div className="summary balance-box">
          <h3>Balance</h3>
          <p>{formatCurrency(balance)}</p>
        </div>
        <div className="summary income-box">
          <h3>Total Income</h3>
          <p>{formatCurrency(income)}</p>
        </div>
        <div className="summary expense-box">
          <h3>Total Expense</h3>
          <p>{formatCurrency(expense)}</p>
        </div>
      </div>

      {/* Header and Delete Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '20px',
          marginBottom: '10px',
        }}
      >
        <h3 style={{ margin: 0 }}>Transaction History</h3>
        <button
          onClick={() => {
            if (selectedIndex !== null) {
              deleteTransaction(selectedIndex);
              setSelectedIndex(null);
            }
          }}
          disabled={selectedIndex === null}
          style={{
            padding: '6px 12px',
            cursor: selectedIndex !== null ? 'pointer' : 'not-allowed',
          }}
        >
          Delete Selected
        </button>
      </div>

      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className="transaction-history">
          {transactions.map((txn, index) => (
            <li
              key={index}
              className={`txn ${txn.type.toLowerCase()}`}
              onClick={() => setSelectedIndex(index)}
              style={{
                cursor: 'pointer',
                backgroundColor: selectedIndex === index ? '#e0e0e0' : 'transparent',
              }}
            >
              <div className="txn-row">
                <span className="txn-type">{txn.type}</span>
                <span className="txn-category">{txn.category}</span>
                <span className="txn-amount">
                  {txn.type === 'Expense' ? '-' : '+'}
                  {formatCurrency(txn.amount)}
                </span>
              </div>
              <div className="txn-description">{txn.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
