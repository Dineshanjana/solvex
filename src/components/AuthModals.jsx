import React, { useState } from 'react';
import '../css/AuthModals.css';
import OtpVerification from './otpverification';
import axios from 'axios';

const AuthModals = ({ isOpen, modalType, onClose }) => {
  const [activeTab, setActiveTab] = useState(modalType || 'login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: ''
  });

  const [showOtpVerification, setShowOtpVerification] = useState(false);

  if (!isOpen) return null;

  if(showOtpVerification) {
    return (
      <OtpVerification 
      email={formData.email}
      onClose={() => {
        setShowOtpVerification(false);
        onClose();
      }}
      onSuccess={(data) => {
        alert('Account verified successfully!');
        localStorage.setItem('token', data.token);
        setShowOtpVerification(false);
        onClose();
      }}
    />
    )
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let response;
      if (activeTab === 'signup') {
        response = await axios.post('http://localhost:5000/api/auth/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          company: formData.company
        });

        setShowOtpVerification(true);
        return; // Don't close modal yet

      } else if (activeTab === 'login') {
        response = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
      }
  
      const data = response.data;
      localStorage.setItem('token', data.token);
      alert(`Success: ${data.message || 'Authentication successful'}`);
      onClose();
    } catch (error) {
      console.error('Error:', error.response?.data?.message || error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };
  

  return (
    <div className="slx-auth-modal-overlay" onClick={onClose}>
      <div className="slx-auth-modal" onClick={e => e.stopPropagation()}>
        <div className="slx-auth-modal-backdrop"></div>
        
        <button className="slx-auth-close-button" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        
        <div className="slx-auth-modal-tabs">
          <button 
            className={`slx-auth-tab-button ${activeTab === 'login' ? 'slx-auth-active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button 
            className={`slx-auth-tab-button ${activeTab === 'signup' ? 'slx-auth-active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
          <div className="slx-auth-tab-indicator" style={{ left: activeTab === 'login' ? '0%' : '50%' }}></div>
        </div>

        <div className="slx-auth-modal-content">
          {activeTab === 'login' ? (
            <form onSubmit={handleSubmit} className="slx-auth-form">
              <h2>Welcome back</h2>
              <p className="slx-auth-form-subtitle">Log in to access your SolveX account</p>
              
              <div className="slx-auth-form-group">
                <label htmlFor="email">Email</label>
                <div className="slx-auth-input-container">
                  <svg className="slx-auth-input-icon" viewBox="0 0 24 24">
                    <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" />
                  </svg>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                  />
                </div>
              </div>
              
              <div className="slx-auth-form-group">
                <div className="slx-auth-password-header">
                  <label htmlFor="password">Password</label>
                  <a href="#" className="slx-auth-forgot-password">Forgot password?</a>
                </div>
                <div className="slx-auth-input-container">
                  <svg className="slx-auth-input-icon" viewBox="0 0 24 24">
                    <path d="M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10C20,8.9,19.1,8,18,8z M12,17c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17,12,17z M9,8V6c0-1.66,1.34-3,3-3s3,1.34,3,3v2H9z" />
                  </svg>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Your password"
                    required
                  />
                </div>
              </div>
              
              <button type="submit" className="slx-auth-submit-button">
                <span>Log In</span>
                <svg className="slx-auth-button-icon" viewBox="0 0 24 24">
                  <path d="M4,12a1,1,0,0,1,1-1H19.586l-4.293-4.293a1,1,0,0,1,1.414-1.414l6,6a1,1,0,0,1,0,1.414l-6,6a1,1,0,0,1-1.414-1.414L19.586,13H5A1,1,0,0,1,4,12Z" />
                </svg>
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="slx-auth-form">
              <h2>Create your account</h2>
              <p className="slx-auth-form-subtitle">Start your 30-day free trial today</p>
              
              <div className="slx-auth-form-group">
                <label htmlFor="name">Full Name</label>
                <div className="slx-auth-input-container">
                  <svg className="slx-auth-input-icon" viewBox="0 0 24 24">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                  </svg>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>
              
              <div className="slx-auth-form-group">
                <label htmlFor="signup-email">Email</label>
                <div className="slx-auth-input-container">
                  <svg className="slx-auth-input-icon" viewBox="0 0 24 24">
                    <path d="M20,4H4C2.9,4,2,4.9,2,6v12c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.1,4,20,4z M20,8l-8,5L4,8V6l8,5l8-5V8z" />
                  </svg>
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    required
                  />
                </div>
              </div>
              
              <div className="slx-auth-form-group">
                <label htmlFor="signup-password">Password</label>
                <div className="slx-auth-input-container">
                  <svg className="slx-auth-input-icon" viewBox="0 0 24 24">
                    <path d="M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10C20,8.9,19.1,8,18,8z M12,17c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17,12,17z M9,8V6c0-1.66,1.34-3,3-3s3,1.34,3,3v2H9z" />
                  </svg>
                  <input
                    type="password"
                    id="signup-password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    required
                  />
                </div>
                <p className="slx-auth-password-hint">Must be at least 8 characters long</p>
              </div>
              
              <button type="submit" className="slx-auth-submit-button">
                <span>Sign Up</span>
                <svg className="slx-auth-button-icon" viewBox="0 0 24 24">
                  <path d="M4,12a1,1,0,0,1,1-1H19.586l-4.293-4.293a1,1,0,0,1,1.414-1.414l6,6a1,1,0,0,1,0,1.414l-6,6a1,1,0,0,1-1.414-1.414L19.586,13H5A1,1,0,0,1,4,12Z" />
                </svg>
              </button>
                        
              <p className="slx-auth-terms-text">
                By signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModals;