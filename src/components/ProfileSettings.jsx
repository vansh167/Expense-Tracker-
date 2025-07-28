import React, { useState, useEffect } from 'react';
import '../style/ProfileSettings.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileSettings = ({ currency, setCurrency, userProfile, setUserProfile }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setName(userProfile.name || '');
    setEmail(userProfile.email || '');
    setPhone(userProfile.phone || '');
    setDob(userProfile.dob || '');
    setBio(userProfile.bio || '');
    setImage(userProfile.image || null);
    setPreview(userProfile.image || null);
  }, [userProfile]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSave = () => {
    if (!name.trim()) return toast.error('Name is required');
    if (!validateEmail(email)) return toast.error('Enter a valid email');

    const updatedProfile = { name, email, phone, dob, bio, image };
    setUserProfile(updatedProfile);

    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    localStorage.setItem('currency', currency);

    toast.success('Profile updated successfully!');
  };

  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>

      <div className="section">
        <label>Profile Picture:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {preview && <img src={preview} alt="Profile" className="profile-preview" />}
      </div>

      <div className="section">
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />

        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" />

        <label>Phone Number:</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 890" />

        <label>Date of Birth:</label>
        <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />

        <label>Bio:</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Write something about yourself..." />
      </div>

      <div className="section">
        <label>Preferred Currency:</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="INR">INR ₹</option>
          <option value="USD">USD $</option>
          <option value="EUR">EUR €</option>
          <option value="GBP">GBP £</option>
        </select>
        <p className="currency-preview">Preview: {currency} {currency === 'INR' ? '₹10,000' : currency === 'USD' ? '$10,000' : currency === 'EUR' ? '€10,000' : '£10,000'}</p>
      </div>

      <button className="save-btn" onClick={handleSave}>Save Profile</button>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default ProfileSettings;
