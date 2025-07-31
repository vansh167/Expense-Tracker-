import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const PieActiveArc = ({ transactions }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  // Extract unique categories from transactions
  const categories = ['All', ...new Set(transactions.map((t) => t.category))];

  // Filter transactions based on selected category
  const filteredTransactions =
    selectedCategory === 'All'
      ? transactions
      : transactions.filter((t) => t.category === selectedCategory);

  // Calculate totals
  const totalIncome = filteredTransactions
    .filter((t) => t.type === 'Income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter((t) => t.type === 'Expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // Pie chart data
  const data = [
    { label: 'Income', value: totalIncome, color: '#58bd5be5' },  // green
    { label: 'Expense', value: totalExpense, color: '#fd5c53e8' }, // red
  ];

  return (
    <div style={{ marginTop: '30px' }}>
      <h3 style={{ marginLeft: '86px' }}>Income or Expense</h3>

      {/* Dropdown to filter category */}
      <div style={{ marginBottom: '10px', marginLeft: '20px' }}>
        <label htmlFor="category-select">Category: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, idx) => (
            <option key={category + idx} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <PieChart
        series={[
          {
            data,
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            valueFormatter: ({ value }) => `$${value.toFixed(2)}`,
            highlightScope: { faded: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        width={300}
        height={250}
      />
    </div>
  );
};

export default PieActiveArc;
