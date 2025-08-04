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

  const [submittedData, setSubmittedData] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Calculate EMI automatically
  useEffect(() => {
    const { loanAmount, interestRate, term } = formData;
    if (loanAmount && interestRate && term) {
      const principal = parseFloat(loanAmount);
      const monthlyRate = parseFloat(interestRate) / 12 / 100;
      const months = parseInt(term);

      const emi =
        monthlyRate === 0
          ? principal / months
          : (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);

      setFormData((prev) => ({
        ...prev,
        emi: emi.toFixed(2),
      }));
    }
  }, [formData.loanAmount, formData.interestRate, formData.term]);

  // Calculate end date automatically
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

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ ...formData });

    // Clear form
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
        <form id="loanForm" onSubmit={handleSubmit}>
          <label>
            Loan Type:
            <input
              type="text"
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Term (months):
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
            Interest Rate (%):
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
            Loan Amount:
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
            EMI:
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
            Ending Date:
            <input type="date" name="endDate" value={formData.endDate} readOnly />
          </label>

          <button type="submit">Submit</button>
        </form>
      </div>

      <div className="historyPanel">{/* Future loan history */}</div>

 
  {submittedData && (
    <div className="submitted-grid">
      <div className="submitted-item">
        <div className="label">Loan Type</div>
        <div className="value">{submittedData.loanType}</div>
      </div>

      <div className="submitted-item">
        <div className="label">Term</div>
        <div className="value">
          {submittedData.term} <span className="small-text">months</span>
        </div>
      </div>

      <div className="submitted-item">
        <div className="label">Interest Rate</div>
        <div className="value">{submittedData.interestRate}%</div>
      </div>

      <div className="submitted-item">
        <div className="label">Loan Amount</div>
        <div className="value">₹{parseFloat(submittedData.loanAmount).toFixed(2)}</div>
      </div>

      <div className="submitted-item">
        <div className="label">EMI</div>
        <div className="value">₹{submittedData.emi}</div>
      </div>

      <div className="submitted-item">
        <div className="label">Start Date</div>
        <div className="value">{submittedData.startDate}</div>
      </div>

      <div className="submitted-item">
        <div className="label">End Date</div>
        <div className="value">{submittedData.endDate}</div>
      </div>
    </div>
  )}
</div>

    
  );
};

export default LoanManagement;
