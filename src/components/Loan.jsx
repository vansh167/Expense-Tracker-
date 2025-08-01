import React, { useState } from 'react';
import '../style/LoanManagement.css';
const LoanManagement = () => {
  // State for loans data
  const [loans, setLoans] = useState([
    {
      id: 1,
      applicant: 'John Doe',
      type: 'Personal',
      amount: 5000,
      term: '12 months',
      payMode: 'Monthly',
      status: 'Pending',
      statusHistory: [{ status: 'Pending', date: new Date() }],
      detailsVisible: false,
    },
    {
      id: 2,
      applicant: 'Jane Smith',
      type: 'Home',
      amount: 250000,
      term: '30 years',
      payMode: 'Quarterly',
      status: 'Approved',
      statusHistory: [{ status: 'Approved', date: new Date() }],
      detailsVisible: false,
    },
  ]);

  // New loan input state
  const [newLoan, setNewLoan] = useState({
    applicant: '',
    type: '',
    amount: '',
    term: '',
    payMode: '',
  });

  // Edit loan state
  const [editLoanId, setEditLoanId] = useState(null);
  const [editLoanData, setEditLoanData] = useState({
    applicant: '',
    type: '',
    amount: '',
    term: '',
    payMode: '',
  });

  // Sorting & filtering state
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPayMode, setFilterPayMode] = useState('');

  // Handle add loan input changes
  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditLoanData((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewLoan((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Add new loan
  const addLoan = () => {
    const { applicant, type, amount, term, payMode } = newLoan;

    if (!applicant.trim() || !type.trim() || !amount || !term.trim() || !payMode.trim()) {
      alert('Please fill all fields.');
      return;
    }

    const newEntry = {
      id: Date.now(),
      applicant: applicant.trim(),
      type: type.trim(),
      amount: Number(amount),
      term: term.trim(),
      payMode: payMode.trim(),
      status: 'Pending',
      statusHistory: [{ status: 'Pending', date: new Date() }],
      detailsVisible: false,
    };

    setLoans((prev) => [newEntry, ...prev]);
    setNewLoan({ applicant: '', type: '', amount: '', term: '', payMode: '' });
  };

  // Start editing loan
  const startEdit = (loan) => {
    setEditLoanId(loan.id);
    setEditLoanData({
      applicant: loan.applicant,
      type: loan.type,
      amount: loan.amount,
      term: loan.term,
      payMode: loan.payMode,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditLoanId(null);
    setEditLoanData({ applicant: '', type: '', amount: '', term: '', payMode: '' });
  };

  // Save edited loan
  const saveEdit = (id) => {
    const { applicant, type, amount, term, payMode } = editLoanData;

    if (!applicant.trim() || !type.trim() || !amount || !term.trim() || !payMode.trim()) {
      alert('Please fill all fields.');
      return;
    }

    setLoans((prev) =>
      prev.map((loan) =>
        loan.id === id
          ? {
              ...loan,
              applicant: applicant.trim(),
              type: type.trim(),
              amount: Number(amount),
              term: term.trim(),
              payMode: payMode.trim(),
            }
          : loan
      )
    );

    cancelEdit();
  };

  // Toggle loan details visibility
  const toggleDetails = (id) => {
    setLoans((prev) =>
      prev.map((loan) =>
        loan.id === id ? { ...loan, detailsVisible: !loan.detailsVisible } : loan
      )
    );
  };

  // Change loan status and update history
  const changeStatus = (id, newStatus) => {
    setLoans((prev) =>
      prev.map((loan) => {
        if (loan.id === id) {
          const updatedHistory = [...loan.statusHistory, { status: newStatus, date: new Date() }];
          return { ...loan, status: newStatus, statusHistory: updatedHistory };
        }
        return loan;
      })
    );
  };

  // Sorting handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter & sort loans for display
  let filteredLoans = loans;

  if (filterStatus) {
    filteredLoans = filteredLoans.filter(
      (loan) => loan.status.toLowerCase() === filterStatus.toLowerCase()
    );
  }

  if (filterPayMode) {
    filteredLoans = filteredLoans.filter(
      (loan) => loan.payMode.toLowerCase() === filterPayMode.toLowerCase()
    );
  }

  if (sortField) {
    filteredLoans = [...filteredLoans].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      // For strings, compare case-insensitive
      if (typeof aVal === 'string') aVal = aVal.toLowerCase();
      if (typeof bVal === 'string') bVal = bVal.toLowerCase();

      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Format date nicely
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
  };

  return (
    <div
      style={{
    maxWidth: 1200,
    marginLeft: '22%',     // Add 25% left margin
    marginTop: 30,
    marginBottom: 30,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 20,
    backgroundColor: '#eaf2f8',  // Light blue background for coloring
    borderRadius: 10,
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    color: '#2c3e50',  // Dark text color for contrast
  }}
    >
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Loan Management System</h1>

      {/* Add New Loan */}
      <div
        style={{
          marginBottom: 30,
          backgroundColor: '#fff',
          padding: 20,
          borderRadius: 10,
          boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 12,
          justifyContent: 'space-between',
        }}
      >
        <input
          type="text"
          name="applicant"
          placeholder="Applicant Name"
          value={newLoan.applicant}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="type"
          placeholder="Loan Type"
          value={newLoan.type}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newLoan.amount}
          onChange={handleInputChange}
          style={inputStyle}
          min="0"
        />
        <input
          type="text"
          name="term"
          placeholder="Term (e.g. 12 months)"
          value={newLoan.term}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <input
          type="text"
          name="payMode"
          placeholder="Pay Mode (Monthly, Quarterly, Lump Sum)"
          value={newLoan.payMode}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <button
          onClick={addLoan}
          style={{
            backgroundColor: '#3498db',
            color: 'white',
            padding: '10px 25px',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.3s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2980b9')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#3498db')}
        >
          Add Loan
        </button>
      </div>

      {/* Filters */}
      <div
        style={{
          marginBottom: 20,
          display: 'flex',
          gap: 15,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <label style={{ fontWeight: 600, color: '#34495e' }}>
          Filter by Status:{' '}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={selectStyle}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>

        <label style={{ fontWeight: 600, color: '#34495e' }}>
          Filter by Pay Mode:{' '}
          <select
            value={filterPayMode}
            onChange={(e) => setFilterPayMode(e.target.value)}
            style={selectStyle}
          >
            <option value="">All</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Lump Sum">Lump Sum</option>
          </select>
        </label>
      </div>

      {/* Loans Table */}
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: '#fff',
          boxShadow: '0 1px 6px rgba(0,0,0,0.1)',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        <thead style={{ backgroundColor: '#2c3e50', color: 'white' }}>
          <tr>
            <th style={thStyle} onClick={() => handleSort('applicant')}>
              Applicant {sortField === 'applicant' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th style={thStyle} onClick={() => handleSort('type')}>
              Type {sortField === 'type' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th style={thStyle} onClick={() => handleSort('amount')}>
              Amount {sortField === 'amount' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th style={thStyle} onClick={() => handleSort('term')}>
              Term {sortField === 'term' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th style={thStyle} onClick={() => handleSort('payMode')}>
              Pay Mode {sortField === 'payMode' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th style={thStyle} onClick={() => handleSort('status')}>
              Status {sortField === 'status' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th style={{ ...thStyle, cursor: 'default' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredLoans.length === 0 && (
            <tr>
              <td colSpan={7} style={{ padding: 20, textAlign: 'center', color: '#7f8c8d' }}>
                No loans found.
              </td>
            </tr>
          )}
          {filteredLoans.map((loan) => {
            const {
              id,
              applicant,
              type,
              amount,
              term,
              payMode,
              status,
              detailsVisible,
              statusHistory,
            } = loan;

            const isEditing = editLoanId === id;

            return (
              <React.Fragment key={id}>
                <tr
                  style={{
                    borderBottom: '1px solid #ddd',
                    backgroundColor: isEditing ? '#ecf0f1' : 'white',
                    transition: 'background-color 0.3s',
                  }}
                >
                  <td style={tdStyle}>
                    {isEditing ? (
                      <input
                        name="applicant"
                        value={editLoanData.applicant}
                        onChange={(e) => handleInputChange(e, true)}
                        style={editInputStyle}
                      />
                    ) : (
                      applicant
                    )}
                  </td>

                  <td style={tdStyle}>
                    {isEditing ? (
                      <input
                        name="type"
                        value={editLoanData.type}
                        onChange={(e) => handleInputChange(e, true)}
                        style={editInputStyle}
                      />
                    ) : (
                      type
                    )}
                  </td>

                  <td style={tdStyle}>
                    {isEditing ? (
                      <input
                        name="amount"
                        type="number"
                        value={editLoanData.amount}
                        onChange={(e) => handleInputChange(e, true)}
                        style={editInputStyle}
                        min="0"
                      />
                    ) : (
                      `$${amount.toLocaleString()}`
                    )}
                  </td>

                  <td style={tdStyle}>
                    {isEditing ? (
                      <input
                        name="term"
                        value={editLoanData.term}
                        onChange={(e) => handleInputChange(e, true)}
                        style={editInputStyle}
                      />
                    ) : (
                      term
                    )}
                  </td>

                  <td style={tdStyle}>
                    {isEditing ? (
                      <input
                        name="payMode"
                        value={editLoanData.payMode}
                        onChange={(e) => handleInputChange(e, true)}
                        style={editInputStyle}
                      />
                    ) : (
                      payMode
                    )}
                  </td>

                  <td style={{ ...tdStyle, color: getStatusColor(status), fontWeight: '600' }}>
                    {status}
                  </td>

                  <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => saveEdit(id)}
                          style={actionButtonStyle('#27ae60')}
                          title="Save"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={actionButtonStyle('#c0392b')}
                          title="Cancel"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(loan)}
                          style={actionButtonStyle('#2980b9')}
                          title="Edit"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleDetails(id)}
                          style={actionButtonStyle('#8e44ad')}
                          title={detailsVisible ? 'Hide Details' : 'Show Details'}
                        >
                          {detailsVisible ? 'Hide' : 'Details'}
                        </button>
                        <select
                          value={status}
                          onChange={(e) => changeStatus(id, e.target.value)}
                          style={{
                            marginLeft: 10,
                            padding: '5px 8px',
                            borderRadius: 6,
                            border: '1px solid #bdc3c7',
                            fontSize: 14,
                            cursor: 'pointer',
                          }}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </>
                    )}
                  </td>
                </tr>

                {detailsVisible && (
                  <tr style={{ backgroundColor: '#f4f6f8' }}>
                    <td colSpan={7} style={{ padding: 15 }}>
                      <h4 style={{ margin: '5px 0 10px 0', color: '#34495e' }}>Status History:</h4>
                      <ul style={{ margin: 0, paddingLeft: 20, color: '#555' }}>
                        {statusHistory.map((history, index) => (
                          <li key={index}>
                            <strong>{history.status}</strong> at {formatDate(history.date)}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Helper for consistent input styling
const inputStyle = {
  flex: '1 1 180px',
  padding: 10,
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 16,
  minWidth: 150,
  boxSizing: 'border-box',
};

// Table header style
const thStyle = {
  padding: '12px 15px',
  cursor: 'pointer',
  userSelect: 'none',
  textAlign: 'left',
  fontWeight: '700',
  fontSize: 15,
};

// Table cell style
const tdStyle = {
  padding: '12px 15px',
  borderTop: '1px solid #eee',
  fontSize: 15,
  verticalAlign: 'middle',
};

// Editable input style in table rows
const editInputStyle = {
  width: '100%',
  padding: 6,
  fontSize: 14,
  borderRadius: 4,
  border: '1px solid #ccc',
  boxSizing: 'border-box',
};

// Button styles for actions
const actionButtonStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: 'white',
  border: 'none',
  padding: '6px 12px',
  borderRadius: 5,
  cursor: 'pointer',
  fontWeight: '600',
  marginRight: 8,
  transition: 'background-color 0.3s',
});

// Get color by status
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return '#27ae60';
    case 'pending':
      return '#f39c12';
    case 'rejected':
      return '#c0392b';
    default:
      return '#34495e';
  }
};

// Select styling for filter dropdowns
const selectStyle = {
  padding: 8,
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 15,
  minWidth: 130,
  cursor: 'pointer',
};

export default LoanManagement;
