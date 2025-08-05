import React, { useState } from "react";
import "../style/ProfileSettings.css";
import NotificationBell from "../components/NotificationBell"; // or correct relative path
import jsPDF from "jspdf";
import "jspdf-autotable";


const TransferForm = ({ balance, addTransaction, transactions = [] }) => {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [amount, setAmount] = useState("");
  const [notifications, setNotifications] = useState([]);

  const addNotification = (msg, type = "error") => {
    setNotifications((prev) => [...prev, { msg, type, time: new Date() }]);
  };

  const validateIFSC = (code) => /^[A-Z]{4}0[A-Z0-9]{6}$/i.test(code);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") return addNotification("⚠️ Please enter the name.");
    if (accountNumber.trim() === "") return addNotification("⚠️ Please enter the account number.");
    if (!validateIFSC(ifscCode.trim())) return addNotification("⚠️ Invalid IFSC code format.");
    if (!amount || isNaN(amount) || Number(amount) <= 0)
      return addNotification("⚠️ Enter a valid amount > 0.");

    if (Number(amount) > balance)
      return addNotification(`❌ Insufficient balance. Max available: ₹${balance.toFixed(2)}`);

    const newTxn = {
      id: Date.now(),
      type: "Expense",
      amount: Number(amount),
      description: `Transfer to ${name}`,
      date: new Date().toISOString(),
      isTransfer: true,
      meta: {
        name: name.trim(),
        accountNumber: accountNumber.trim(),
        ifscCode: ifscCode.toUpperCase().trim(),
      },
    };

    addTransaction(newTxn);
    addNotification("✅ Transfer successful!", "success");

    setName("");
    setAccountNumber("");
    setIfscCode("");
    setAmount("");
  };
  const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Recent Transactions", 14, 22);

  const tableColumn = ["Date", "Description", "Amount (₹)"];
  const tableRows = [];

  transactions.slice(-5).reverse().forEach((txn) => {
    const txnData = [
      new Date(txn.date).toLocaleDateString(),
      txn.description,
      `₹${txn.amount.toFixed(2)}`
    ];
    tableRows.push(txnData);
  });

  if (tableRows.length === 0) {
    doc.text("No transactions found.", 14, 30);
  } else {
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });
  }

  doc.save("transactions.pdf");
};


  return (
    <div className="transfer-container">
      <div className="form-section">
        <div className="topbar" style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10,}}>
          <NotificationBell notifications={notifications} />
        </div>

        <h2>Transfer Form</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            Account Number:
            <input type="text" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
          </label>

          <label>
            IFSC Code:
            <input
              type="text"
              value={ifscCode}
              maxLength={11}
              onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            />
          </label>

          <label>
            Amount (₹):
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min="1" />
          </label>

          <button type="submit" className="submit-button">Send</button>
        </form>
      </div>

      <div className="mini-statement">
    <h3>Recent Transactions</h3>
<button onClick={downloadPDF} className="pdf-button">Download PDF</button>
<div/>
        {transactions.length === 0 ? (
          <p className="empty-txn">No transactions yet.</p>
        ) : (
          <ul className="txn-list">
            {transactions.slice(-5).reverse().map((txn) => (
              <li key={txn.id} className="txn-item">
                <div className="txn-left">
                  <strong>{txn.description}</strong>
                  <span className="txn-date">{new Date(txn.date).toLocaleDateString()}</span>
                </div>
                <div className="txn-amount">₹{txn.amount.toFixed(2)}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TransferForm;
