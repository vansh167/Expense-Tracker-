import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const IncomeExpenseBarChart = ({ transactions }) => {
  const categories = [...new Set(transactions.map(t => t.category))];

  const incomeData = categories.map(cat =>
    transactions
      .filter(t => t.type === 'Income' && t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const expenseData = categories.map(cat =>
    transactions
      .filter(t => t.type === 'Expense' && t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  console.log('Categories:', categories);
  console.log('Income Data:', incomeData);
  console.log('Expense Data:', expenseData);

  return (
    <div style={{ marginTop: 30 }}>
      <h3 style={{ marginLeft: 20 }}>Income & Expense by Category</h3>
      <BarChart
        xAxis={[{ data: categories }]}
        series={[
          { type: 'bar', data: incomeData, color: '#4caf50', label: 'Income' },
          { type: 'bar', data: expenseData, color: '#f44336', label: 'Expense' },
        ]}
        width={600}
        height={400}
        barLabel="value"
      />
    </div>
  );
};

export default IncomeExpenseBarChart;
