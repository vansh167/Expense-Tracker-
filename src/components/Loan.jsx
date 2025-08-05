import React, { useState, useEffect } from 'react';
import '../style/LoanManagement.css';

const LoanManagement = () => {
  const [formData, setFormData] = useState({
    loanType: '',
    term: '',
    interestRate: '',
    loanAmount: '',
    emi: '',
    startDate: '',
    endDate: '',
  });

  const [loanHistory, setLoanHistory] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateFlatEMI = (principal, annualRate, months) => {
    const interest = principal * (annualRate / 100) * (months / 12);
    const totalPayable = principal + interest;
    return totalPayable / months;
  };

  useEffect(() => {
    const principal = parseFloat(formData.loanAmount);
    const annualRate = parseFloat(formData.interestRate);
    const months = parseInt(formData.term);

    if (!isNaN(principal) && !isNaN(annualRate) && !isNaN(months) && months > 0) {
      const emi = calculateFlatEMI(principal, annualRate, months);
      setFormData((prev) => ({
        ...prev,
        emi: emi.toFixed(2),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        emi: '',
      }));
    }
  }, [formData.loanAmount, formData.interestRate, formData.term]);

  useEffect(() => {
    const { startDate, term } = formData;
    if (startDate && term) {
      const start = new Date(startDate);
      const end = new Date(start.setMonth(start.getMonth() + parseInt(term)));
      const endDate = end.toISOString().split('T')[0];

      setFormData((prev) => ({
        ...prev,
        endDate,
      }));
    }
  }, [formData.startDate, formData.term]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoanHistory((prevHistory) => [...prevHistory, { ...formData }]);

    setFormData({
      loanType: '',
      term: '',
      interestRate: '',
      loanAmount: '',
      emi: '',
      startDate: '',
      endDate: '',
    });
  };

  return (
    <div className="container" style={{ marginLeft: '25%', maxWidth: '75vw' }}>
      <div className="formPanel">
        <h2>Apply for Loan</h2>
        <form id="loanForm" onSubmit={handleSubmit}>
          <label>
            Loan Type (e.g. Home):
            <input
              type="text"
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Term (in months):
            <input
              type="number"
              name="term"
              value={formData.term}
              onChange={handleChange}
              min="1"
              required
            />
          </label>

          <label>
            Interest Rate (% annual):
            <input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </label>

          <label>
            Loan Amount (in ₹):
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
              required
            />
          </label>

          <label>
            EMI (auto-calculated):
            <input type="number" name="emi" value={formData.emi} readOnly />
          </label>

          <label>
            Starting Date:
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Ending Date (auto-filled):
            <input type="date" name="endDate" value={formData.endDate} readOnly />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Loan History */}
      <div className="historyPanel" style={{ marginTop: '2rem' }}>
        <h2>Loan History</h2>
        {loanHistory.length === 0 && <p>No loans submitted yet.</p>}

        {loanHistory.map((loan, index) => (
          <div key={index} className="submitted-grid" style={{ marginBottom: '1rem' }}>
            <div className="submitted-item">
              <div className="label">Loan Type</div>
              <div className="value">{loan.loanType}</div>
            </div>

            <div className="submitted-item">
              <div className="label">Term</div>
              <div className="value">
                {loan.term} <span className="small-text">months</span>
              </div>
            </div>

            <div className="submitted-item">
              <div className="label">Interest Rate</div>
              <div className="value">{loan.interestRate}%</div>
            </div>

            <div className="submitted-item">
              <div className="label">Loan Amount</div>
              <div className="value">₹{parseFloat(loan.loanAmount).toFixed(2)}</div>
            </div>

            <div className="submitted-item">
              <div className="label">EMI</div>
              <div className="value">₹{loan.emi}</div>
            </div>

            <div className="submitted-item">
              <div className="label">Start Date</div>
              <div className="value">{loan.startDate}</div>
            </div>

            <div className="submitted-item">
              <div className="label">End Date</div>
              <div className="value">{loan.endDate}</div>
            </div>

            <div className="submitted-item">
              <button>💳Pay EMI</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanManagement;
