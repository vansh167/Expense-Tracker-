import React from 'react';
import '../style/LoanManagement.css';


const LoanManagement = () => {
  return (
    <div className="container" style={{ marginLeft: '25%', maxWidth: '75vw' }}>
      {/* Left panel: Form */}
      <div className="formPanel">
        <form id="loanForm">
          <label>
            Loan Type:
            <input type="text" name="loanType" required />
          </label>
          <label>
            Term (months):
            <input type="number" name="term" min="1" required />
          </label>
          <label>
            Interest Rate (%):
            <input type="number" name="interestRate" step="0.01" min="0" required />
          </label>
          <label>
            EMI:
            <input type="number" name="emi" step="0.01" min="0" required />
          </label>
          <label>
            Starting Date:
            <input type="date" name="startDate" required />
          </label>
          <label>
            Ending Date:
            <input type="date" name="endDate" required />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Right panel: Loan History only */}
      <div className="historyPanel">


      </div>
    </div>
    
  );
};

export default LoanManagement;
