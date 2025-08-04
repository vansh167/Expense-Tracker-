import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiBarChart2,
  FiSettings,
  FiMoon,
  FiSun,
  FiUser,
  FiLogOut,
  FiCreditCard,  // <-- added this
} from 'react-icons/fi';
import { AiOutlineCalendar } from 'react-icons/ai';
import { UserContext } from './UserContext'; 
import '../style/Side.css';

const Sidebar = ({ darkMode, toggleDarkMode }) => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/signin');
  };

  return (
    <div className="sidebar">
      <img src="/images/logo1.png" alt="Logo" className="sidebar-logo" />

      <ul className="sidebar-list">
        <li>
          <Link to="/" className="sidebar-link">
            <FiHome className="sidebar-icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/expense-tracker" className="sidebar-link">
            <FiBarChart2 className="sidebar-icon" /> Add Entry
          </Link>
        </li>
       
        <li>
          <Link to="/payment" className="sidebar-link">
            <FiUser className="sidebar-icon" /> Payment
          </Link>
        </li>
        {/* New Loan Management link */}
        <li>
          <Link to="/loan" className="sidebar-link">
            <FiCreditCard className="sidebar-icon" /> Loan Management
          </Link>
        </li>
         <li>
          <Link to="/calculator" className="sidebar-link">
            <AiOutlineCalendar className="sidebar-icon" /> Finance Planner
          </Link>
        </li>
        <li>
          <Link to="/settings" className="sidebar-link">
            <FiSettings className="sidebar-icon" /> Settings
          </Link>
        </li>
        
        <li>
          <button
            onClick={handleLogout}
            className="sidebar-link logout-button"
            style={{
              backgroundColor: "#1565c0",
              color: "white",
              border: "none",
              borderRadius: "12px",
              padding: "10px 15px",
              // width: "100%",
              cursor: "pointer",
            }}
          >
            <FiLogOut className="sidebar-icon" /> Logout
          </button>
        </li>
      </ul>

      <div className="dark-mode-toggle">
        <button onClick={toggleDarkMode} className="toggle-button">
          {darkMode ? <FiSun /> : <FiMoon />}
          {darkMode ? ' Switch to Light' : ' Switch to Dark'}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
