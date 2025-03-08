import React, { useState } from 'react';
import './SproutSocialHomepage.css';
import AuthModals from './components/AuthModals';

const SproutSocialHomepage = () => {
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    type: 'login' // 'login' or 'signup'
  });

  const openModal = (type) => {
    setAuthModal({
      isOpen: true,
      type
    });
  };

  const closeModal = () => {
    setAuthModal({
      ...authModal,
      isOpen: false
    });
  };

  return (
    <div className="sprout-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <div className="leaf-icon"></div>
          <span className="brand-name">SolveX</span>
        </div>
        
        <div className="nav-links">
          <a href="#" className="nav-item">Platform</a>
          <a href="#" className="nav-item">Solutions</a>
          <a href="#" className="nav-item no-dropdown">Pricing</a>
          <a href="#" className="nav-item">Resources</a>
        </div>
        
        <div className="auth-buttons">
          <a href="#" className="btn btn-outline">Schedule a demo</a>
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
            Sign up
          </a>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>A powerful solution for social media management</h1>
          <p className="hero-description">
            Our all-in-one social media management platform unlocks the full potential of social 
            to transform not just your marketing strategy—but every area of your organization.
          </p>
          
          <div className="hero-buttons">
            <a 
              href="#" 
              className="btn btn-white"
              onClick={(e) => {
                e.preventDefault();
                openModal('signup');
              }}
            >
              Try 30 days free
            </a>
            <a href="#" className="btn btn-outline-white">See the product</a>
          </div>
          
          <p className="hero-note">No credit card required.</p>
          
          <div className="awards">
            <div className="award-main">
              <svg className="g2-logo" viewBox="0 0 40 40" fill="white">
                <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="2" fill="none"/>
                <text x="10" y="25" fill="white" fontSize="15" fontWeight="bold">G2</text>
              </svg>
              <span className="award-title">#1 Best Overall Software | 2025</span>
            </div>
            
            <div className="award-list">
              <div>Top 50 Products for Enterprise, 2025</div>
              <div>Top 50 Products for Mid Market, 2025</div>
              <div>Top 50 Global Software Companies, 2025</div>
              <div>Top 100 Highest Satisfaction Products, 2025</div>
            </div>
          </div>
        </div>
        
        <div className="hero-images">
          <img 
            src="herosectionimg.png" 
            alt="Sprout Social Dashboard" 
            className="hero-image-main" 
          />
        </div>
      </section>

      {/* Auth Modals */}
      <AuthModals 
        isOpen={authModal.isOpen}
        modalType={authModal.type}
        onClose={closeModal}
      />
    </div>
  );
};

export default SproutSocialHomepage;