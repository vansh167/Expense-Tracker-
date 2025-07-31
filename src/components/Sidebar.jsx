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
} from 'react-icons/fi';
import { AiOutlineCalendar } from 'react-icons/ai'; // single icon for combined feature
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
            <FiBarChart2 className="sidebar-icon" />  Add Entry
          </Link>
        </li>
        <li>
          <Link to="/calculator" className="sidebar-link">
            <AiOutlineCalendar className="sidebar-icon" />
            Finance Planner
          </Link>
        </li>
        <li>
          <Link to="/settings" className="sidebar-link">
            <FiSettings className="sidebar-icon" /> Settings
          </Link>
        </li>
        <li>
          <Link to="/profile" className="sidebar-link">
            <FiUser className="sidebar-icon" /> Payment
          </Link>
        </li>
        <li>
      
          <button onClick={handleLogout} className="sidebar-l ink logout-button" style={{ width: '#', backgroundColor:" #1565c0", color: 'white', border: 'none', borderRadius: '12px', padding: '10px 15px' }}>
            <FiLogOut className="sidebar-icon"/> Logout
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
