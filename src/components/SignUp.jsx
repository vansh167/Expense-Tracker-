import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import '../style/SignIn.css';
import { FiMail, FiLock } from 'react-icons/fi';

const SignUp = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = form;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find((u) => u.email === email);

    if (userExists) {
      setError("User already exists. Please sign in.");
      return;
    }

    const newUser = { email, password };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    localStorage.setItem(`transactions-${email}`, JSON.stringify([]));
    localStorage.setItem(`userProfile-${email}`, JSON.stringify({ name: '', email }));

    setUser(newUser);
    navigate('/');
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <img src="/images/Title.png" alt="Logo" className="auth-logo" />
        <h2>Create an Account</h2>
        {error && <p className="auth-error">{error}</p>}

        <div className="input-icon">
          <FiMail className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-icon">
          <FiLock className="icon" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="input-icon">
          <FiLock className="icon" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Sign Up</button>

        <p className="auth-footer">
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
