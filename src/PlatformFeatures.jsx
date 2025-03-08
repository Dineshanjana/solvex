import React from 'react';
import './PlatformFeatures.css';
import { Mail, Send, BarChart2, Headphones, Users, Award, CheckCircle } from 'lucide-react';

const PlatformFeatures = () => {
  const platformFeatures = [
    { id: 1, name: 'Engagement', icon: <Mail size={20} /> },
    { id: 2, name: 'Publishing', icon: <Send size={20} /> },
    { id: 3, name: 'Analytics', icon: <BarChart2 size={20} /> },
    { id: 4, name: 'Listening', icon: <Headphones size={20} /> },
    { id: 5, name: 'Advocacy', icon: <Users size={20} /> },
    { id: 6, name: 'Influencer Marketing', icon: <Award size={20} /> },
  ];

  return (
    <div className="platform-container">
      {/* Platform Navigation Menu */}
      <div className="platform-nav">
        {platformFeatures.map(feature => (
          <div key={feature.id} className={`platform-nav-item ${feature.id === 1 ? 'active' : ''}`}>
            <div className="platform-icon">{feature.icon}</div>
            <span className="platform-name">{feature.name}</span>
          </div>
        ))}
      </div>

      {/* Engagement Feature Section */}
      <div className="feature-showcase">
        <div className="feature-dashboard">
          <img 
            src="cardimg.png" 
            alt="Sprout Social Engagement Dashboard" 
            className="dashboard-image"
          />
        </div>

        <div className="feature-content">
          <h1 className="feature-title">Surprise and delight your customers</h1>
          
          <p className="feature-description">
            Automate tasks to accelerate response times with a unified inbox, so you can spend more time connecting with customers on a human level.
          </p>
          
          <div className="feature-benefits">
            <div className="benefit-item">
              <CheckCircle className="benefit-icon" />
              <p className="benefit-text">
                Resolve customer questions faster with AI-enhanced agent replies
              </p>
            </div>
            
            <div className="benefit-item">
              <CheckCircle className="benefit-icon" />
              <p className="benefit-text">
                Control a smarter inbox with automated routing and chatbots
              </p>
            </div>
            
            <div className="benefit-item">
              <CheckCircle className="benefit-icon" />
              <p className="benefit-text">
                Prioritize your most important messages with AI-powered message classifications
              </p>
            </div>
          </div>
          
          <a href="#" className="explore-link">Explore our engagement features</a>
        </div>
      </div>
    </div>
  );
};

export default PlatformFeatures;