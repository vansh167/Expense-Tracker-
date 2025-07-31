import React, { useState } from "react";
import "../style/ProfileSettings.css";

const TransferForm = ({ balance, addTransaction, transactions = [] }) => {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const validateIFSC = (code) => /^[A-Z]{4}0[A-Z0-9]{6}$/i.test(code);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") return setMessage("⚠️ Please enter the name.");
    if (accountNumber.trim() === "") return setMessage("⚠️ Please enter the account number.");
    if (!validateIFSC(ifscCode.trim())) return setMessage("⚠️ Invalid IFSC code format.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return setMessage("⚠️ Enter a valid amount > 0.");

    if (Number(amount) > balance) {
      return setMessage(`❌ Insufficient balance. Max available: ₹${balance.toFixed(2)}`);
    }

    const newTxn = {
      id: Date.now(),
      type: "Expense",
      amount: Number(amount),
      description: `Transfer to ${name}`,
      date: new Date().toISOString(),
      meta: {
        name: name.trim(),
        accountNumber: accountNumber.trim(),
        ifscCode: ifscCode.toUpperCase().trim(),
      },
    };

    addTransaction(newTxn);
    setMessage("✅ Transfer successful!");

    // Clear inputs
    setName("");
    setAccountNumber("");
    setIfscCode("");
    setAmount("");
  };

  return (
    <div className="transfer-container">
      {/* Left side: Form */}
      <div className="form-section">
        <h2>Transfer Form</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Account Number:
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
          </label>

          <label>
            IFSC Code:
            <input
              type="text"
              value={ifscCode}
              maxLength={11}
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
              required
            />
          </label>

          <label>
            Amount (₹):
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              required
            />
          </label>

          <button type="submit" className="submit-button">Send</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>

      {/* Right side: Mini transactions */}
      <div className="mini-statement">
        <h3>Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p className="empty-txn">No transactions yet.</p>
        ) : (
          <ul className="txn-list">
            {transactions
              .slice(-5)
              .reverse()
              .map((txn) => (
                <li key={txn.id} className="txn-item">
                  <div className="txn-left">
                    <strong>{txn.description}</strong>
                    <span className="txn-date">
                      {new Date(txn.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="txn-amount">
                    ₹{txn.amount.toFixed(2)}
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransferForm;
