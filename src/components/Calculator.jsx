import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format, parseISO, isValid } from 'date-fns';
import '../style/Calculator.css';
import { Parser } from 'expr-eval'; // <- added

function safeParseDate(dateString) {
  if (!dateString) return null;
  const parsed = parseISO(dateString);
  return isValid(parsed) ? parsed : null;
}

const sampleTransactions = [
  { id: 1, date: '2025-07-28', type: 'Income', amount: 1000, description: 'Salary', category: 'Job' },
  { id: 2, date: '2025-07-28', type: 'Expense', amount: 200, description: 'Groceries', category: 'Food' },
  { id: 3, date: '2025-07-27', type: 'Expense', amount: 150, description: 'Transport', category: 'Travel' },
  { id: 4, date: '2025-07-26', type: 'Income', amount: 500, description: 'Freelance', category: 'Job' },
];

function Calculator({ transactions = sampleTransactions }) {
  const [expression, setExpression] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const formattedDate = format(selectedDate, 'yyyy-MM-dd');

  const filteredTransactions = transactions.filter(tx => {
    const txDate = safeParseDate(tx.date);
    return txDate && format(txDate, 'yyyy-MM-dd') === formattedDate;
  });

  const totalIncome = filteredTransactions
    .filter(tx => tx.type === 'Income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpense = filteredTransactions
    .filter(tx => tx.type === 'Expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const handleClick = (value) => {
    // ensure expression is always a string
    setExpression(prev => (prev === '0' ? String(value) : prev + String(value)));
  };

  const calculate = () => {
    const expr = expression.trim();
    if (!expr) {
      setExpression('0');
      return;
    }

    try {
      // use expr-eval instead of eval
      const parser = new Parser();
      const result = parser.evaluate(expr);
      // Display result as string; allow further calculations by keeping result as expression
      setExpression(String(result));
    } catch (err) {
      // on parse/eval error, show Error briefly
      setExpression('Error');
      // optional: clear after 1.5s so user can continue — comment out if you don't want this behavior
      setTimeout(() => setExpression(''), 1500);
    }
  };

  const clear = () => setExpression('');

  // Custom styling for calendar tiles (dates)
  const tileClassName = ({ date, view }) => {
    if (view !== 'month') return null;

    const txForDate = transactions.filter(tx => {
      const txDate = safeParseDate(tx.date);
      return txDate && format(txDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    });

    if (txForDate.length === 0) return null;

    // If income > expense for this date, green background, else red
    const incomeSum = txForDate.filter(tx => tx.type === 'Income').reduce((sum, tx) => sum + tx.amount, 0);
    const expenseSum = txForDate.filter(tx => tx.type === 'Expense').reduce((sum, tx) => sum + tx.amount, 0);

    if (incomeSum > expenseSum) return 'calendar-tile-income';
    if (expenseSum > incomeSum) return 'calendar-tile-expense';

    return 'calendar-tile-neutral'; // equal or no transactions
  };

  return (
    <div className="mycalc-container">
      <div className="mycalc-wrapper">
        {/* Calendar Section */}
        <div className="mycalc-calendar-section">
          <h2 className="mycalc-subtitle">📅 Select a Date</h2>
          <p style={{ color: '#2a9d8f', fontWeight: '600', marginBottom: '12px' }}>
            👉 Click any date to view your income and expenses.
          </p>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="mycalc-calendar"
            tileClassName={tileClassName}
            tileContent={({ date, view }) => {
              if (view !== 'month') return null;

              const dayTxns = transactions.filter(tx => {
                const txDate = safeParseDate(tx.date);
                return txDate && format(txDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
              });

              const dayIncome = dayTxns.filter(tx => tx.type === 'Income').reduce((sum, tx) => sum + tx.amount, 0);
              const dayExpense = dayTxns.filter(tx => tx.type === 'Expense').reduce((sum, tx) => sum + tx.amount, 0);

              return (
                <div className="mycalc-tile-info">
                  {dayIncome > 0 && (
                    <div
                      className="mycalc-income-tile"
                      style={{ color: '#2a9d8f', fontWeight: '700', fontSize: '0.8rem' }}
                    >
                      ₹{dayIncome}
                    </div>
                  )}
                  {dayExpense > 0 && (
                    <div
                      className="mycalc-expense-tile"
                      style={{ color: '#e63946', fontWeight: '700', fontSize: '0.8rem' }}
                    >
                      ₹{dayExpense}
                    </div>
                  )}
                </div>
              );
            }}
          />

          <div className="mycalc-transaction-list">
            <h3 className="mycalc-transaction-title">Transactions on {formattedDate}:</h3>
            {filteredTransactions.length > 0 ? (
              <ul className="mycalc-transaction-items">
                {filteredTransactions.map((tx, idx) => (
                  <li
                    key={tx.id || idx}
                    className={`mycalc-transaction-item ${
                      tx.type === 'Income' ? 'transaction-income-bg' : 'transaction-expense-bg'
                    }`}
                  >
                    <span>{tx.description} ({tx.category})</span>
                    <span className="transaction-amount">
                      ₹{tx.amount}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#e76f51', fontWeight: '600' }}>
                No transactions for this date. Try another day!
              </p>
            )}

            {totalIncome > 0 && (
              <button
                onClick={() => handleClick(totalIncome)}
                className="mycalc-btn income"
                title={`Add ₹${totalIncome} (Income) to calculator`}
              >
                ➕ Add ₹{totalIncome}
              </button>
            )}
            {totalExpense > 0 && (
              <button
                onClick={() => handleClick(totalExpense)}
                className="mycalc-btn expense"
                title={`Add ₹${totalExpense} (Expense) to calculator`}
              >
                ➖ Add ₹{totalExpense}
              </button>
            )}
          </div>
        </div>

        {/* Calculator Section */}
        <div className="mycalc-calculator-section">
          <div className="mycalc-calculator-display" aria-live="polite" style={{ fontSize: '2rem' }}>
            {expression || '0'}
          </div>
          <div className="mycalc-calculator-buttons" role="group" aria-label="Calculator buttons">
            {['7', '8', '9', '/',
              '4', '5', '6', '*',
              '1', '2', '3', '-',
              '0', '.', '=', '+'].map((btn) => (
                <button
                  key={btn}
                  className={`mycalc-btn ${btn === '=' ? 'equal' : ['/', '*', '-', '+'].includes(btn) ? 'operator' : ''}`}
                  onClick={() => (btn === '=' ? calculate() : handleClick(btn))}
                  aria-label={btn === '=' ? 'Calculate result' : `Input ${btn}`}
                >
                  {btn}
                </button>
              ))}
            <button
              className="mycalc-btn clear"
              onClick={clear}
              aria-label="Clear calculator"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
