import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import '../style/SignIn.css';
import { FiMail, FiLock } from 'react-icons/fi';

const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (existingUser) {
      setUser(existingUser);
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <img src="/images/Title.png" alt="Logo" className="auth-logo" />
        <h2>Sign In</h2>
        {error && <p className="auth-error">{error}</p>}

        <div className="input-icon">
          <FiMail className="icon" />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-icon">
          <FiLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Sign In</button>

        <p className="auth-footer">
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
