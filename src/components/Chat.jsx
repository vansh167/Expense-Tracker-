import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const IncomeExpenseBarChart = ({ transactions, currency = '₹' }) => {
  // Filter out transactions missing category or amount
  const safeTransactions = transactions.filter(
    (t) => t.category && t.amount != null && !isNaN(t.amount)
  );

  const categories = [...new Set(safeTransactions.map(t => t.category))];

  const incomeData = categories.map(cat =>
    safeTransactions
      .filter(t => t.type === 'Income' && t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const expenseData = categories.map(cat =>
    safeTransactions
      .filter(t => t.type === 'Expense' && t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  return (
    <div style={{ marginTop: 30 }}>
      <h3 style={{ marginLeft: 20 }}>Income & Expense by Category</h3>
      <BarChart
        xAxis={[{ data: categories, scaleType: 'band' }]}
        series={[
          { type: 'bar', data: incomeData, color: '#4caf4fb6', label: 'Income' },
          { type: 'bar', data: expenseData, color: '#f44336a9', label: 'Expense' },
        ]}
        width={600}
        height={400}
        barLabel="value"
        tooltip={{
          formatter: (value, label, context) => {
            if (value == null || isNaN(value)) return '-';

            const categoryIndex = context?.point?.index;
            const categoryName = categoryIndex != null ? categories[categoryIndex] : 'Unknown';

            return {
              label: `${label} - ${categoryName}`,
              value: `${currency}${value.toFixed(2)}`,
            };
          },
        }}
      />
    </div>
  );
};

export default IncomeExpenseBarChart;
