import React, { useState, useRef, useEffect } from 'react';
import '../css/OtpVerification.css'; 

const OtpVerification = ({ email, onClose, onSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef([]);
  
  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown <= 0) return;
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown]);

  // Handle OTP input change
  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    
    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle key press for navigation between inputs
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle OTP paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    if (!/^\d+$/.test(pastedData)) return;
    
    const digits = pastedData.slice(0, 6).split('');
    const newOtp = [...otp];
    
    digits.forEach((digit, index) => {
      if (index < 6) newOtp[index] = digit;
    });
    
    setOtp(newOtp);
    
    // Focus appropriate field after paste
    if (digits.length < 6) {
      inputRefs.current[digits.length].focus();
    }
  };

  // Submit OTP to server
  const verifyOtp = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp: otpString
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify OTP');
      }
      
      // Success - call the success callback
      onSuccess(data);
      
    } catch (error) {
      setError(error.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    if (countdown > 0) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }
      
      // Reset countdown
      setCountdown(30);
      setError('');
      
    } catch (error) {
      setError(error.message || 'Failed to resend OTP');
    }
  };

  return (
    <div className="slx-auth-modal-overlay" onClick={onClose}>
      <div className="slx-auth-modal slx-auth-otp-modal" onClick={e => e.stopPropagation()}>
        <div className="slx-auth-modal-backdrop"></div>
        
        <button className="slx-auth-close-button" onClick={onClose}>
          <svg viewBox="0 0 24 24" width="16" height="16">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        
        <div className="slx-auth-modal-content">
          <div className="slx-auth-otp-header">
            <h2>Verify Your Email</h2>
            <p className="slx-auth-form-subtitle">
              We've sent a 6-digit code to<br />
              <span className="slx-auth-email-highlight">{email}</span>
            </p>
          </div>
          
          <div className="slx-auth-otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : null}
                autoFocus={index === 0}
                aria-label={`Digit ${index + 1}`}
                className="slx-auth-otp-input"
              />
            ))}
          </div>
          
          {error && <div className="slx-auth-otp-error">{error}</div>}
          
          <button 
            className="slx-auth-submit-button slx-auth-otp-verify-button" 
            onClick={verifyOtp}
            disabled={loading}
          >
            {loading ? (
              <div className="slx-auth-spinner"></div>
            ) : (
              <>
                <span>Verify Account</span>
                <svg className="slx-auth-button-icon" viewBox="0 0 24 24">
                  <path d="M4,12a1,1,0,0,1,1-1H19.586l-4.293-4.293a1,1,0,0,1,1.414-1.414l6,6a1,1,0,0,1,0,1.414l-6,6a1,1,0,0,1-1.414-1.414L19.586,13H5A1,1,0,0,1,4,12Z" />
                </svg>
              </>
            )}
          </button>
          
          <div className="slx-auth-resend-container">
            <button 
              className={`slx-auth-resend-button ${countdown > 0 ? 'slx-auth-disabled' : ''}`}
              onClick={resendOtp}
              disabled={countdown > 0}
            >
              {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;