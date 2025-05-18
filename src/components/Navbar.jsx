import React, { useState, useEffect } from 'react';
import '../css/Navbar.css';
import { Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ openModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    // Check if user is logged in by looking for token in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleUseAgent = () => {
    navigate('/interface');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <div className="leaf-icon"></div>
          <span className="brand-name">SolveX</span>
        </div>
        
        {/* Mobile menu button */}
        <div className="mobile-menu-button" onClick={toggleMobileMenu}>
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <div className={`nav-content ${mobileMenuOpen ? 'show' : ''}`}>
          <div className="nav-links">
            <div className="nav-item-container">
              <a href="#" className="nav-item">Platform</a>
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">Feature 1</a>
                <a href="#" className="dropdown-item">Feature 2</a>
                <a href="#" className="dropdown-item">Feature 3</a>
              </div>
            </div>
            <div className="nav-item-container">
              <a href="#" className="nav-item">Solutions</a>
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">Solution 1</a>
                <a href="#" className="dropdown-item">Solution 2</a>
                <a href="#" className="dropdown-item">Solution 3</a>
              </div>
            </div>
            <a href="#" className="nav-item no-dropdown">Pricing</a>
            <div className="nav-item-container">
              <a href="#" className="nav-item">Resources</a>
              <div className="dropdown-menu">
                <a href="#" className="dropdown-item">Blog</a>
                <a href="#" className="dropdown-item">Documentation</a>
                <a href="#" className="dropdown-item">Support</a>
              </div>
            </div>
          </div>
          
          <div className="auth-buttons">
            {isLoggedIn ? (
              <a 
                href="#" 
                className="btn btn-dark agent-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleUseAgent();
                }}
              >
                <Bot size={18} className="agent-icon" />
                <span>Use Agent</span>
              </a>
            ) : (
              <>
                <a 
                  href="#" 
                  className="btn btn-login"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal('login');
                  }}
                >
                  Log in
                </a>
                <a 
                  href="#" 
                  className="btn btn-dark"
                  onClick={(e) => {
                    e.preventDefault();
                    openModal('signup');
                  }}
                >
                  Start Now
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;