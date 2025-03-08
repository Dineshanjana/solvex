import React from 'react';
import './EnterpriseLanding.css';

const EnterpriseLanding = () => {
  return (
    <div className="enterprise-container">
      <div className="content-wrapper">
        <div className="main-grid">
          <div className="content-left">
            <h1 className="hero-title">
              Enterprise solutions for social at scale
            </h1>
            <p className="hero-description">
              Need a comprehensive platform your team will love to use? 
              Sprout is the clear choice. See how you can help impact your 
              entire business, from industry insights and competitive 
              intelligence to customer service, data and analytics.
            </p>
            <button className="demo-button">
              Request a demo
            </button>
          </div>

          <div className="image-container">
            <img 
              src="/api/placeholder/600/400" 
              alt="Professional using platform" 
              className="main-image"
            />
            
            <div className="badges-container">
              {['Top 50 Enterprise', 'Top 50 Marketing', 'Top 100 Satisfaction'].map((title, i) => (
                <div key={i} className="award-badge">
                  <div className="badge-software">BEST SOFTWARE</div>
                  <div className="badge-year">2025</div>
                  <div className="badge-title">{title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bottom-cta">
          <h2 className="cta-title">
            Drive smarter, faster business impact from social media.
          </h2>
          <button className="trial-button">
            Start your free trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseLanding;