import React from 'react';
import '../css/FeaturesSection.css';
import { DollarSign, PieChart, RefreshCw } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <div className="features-container">
      <div className="features-header">
        <h1>Driving business impact should be easier</h1>
        <p className="features-subtitle">
          Sprout's unified social media management platform enables your team to extract real business value, 
          strengthen your market position and drive revenue—quickly.
        </p>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="icon-circle">
            <DollarSign className="feature-icon" />
          </div>
          <h2 className="feature-title">See value faster</h2>
          <p className="feature-description">
            Get the insights your team has been waiting for—now. You won't spend months onboarding, 
            wondering how much of your budget went to learning how to use our platform.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon-circle">
            <PieChart className="feature-icon" />
          </div>
          <h2 className="feature-title">Capture insights with ease</h2>
          <p className="feature-description">
            Accelerate business processes with <a href="#" className="feature-link">AI-powered workflows</a> designed 
            to save marketers valuable time, provide better access to actionable data and allow your team to focus 
            on more strategic and creative thinking.
          </p>
        </div>

        <div className="feature-card">
          <div className="icon-circle">
            <RefreshCw className="feature-icon" />
          </div>
          <h2 className="feature-title">Transition seamlessly</h2>
          <p className="feature-description">
            Elevate your business without rebuilding your tech stack. Our global Salesforce partnership and 
            social network integrations make it easy to work within your current processes.
          </p>
        </div>
      </div>

      <div className="award-banner">
        <div className="award-graphic">
          <img src="/award-graphic.svg" alt="G2 Award Graphic" className="award-image" />
        </div>
        <div className="award-content">
          <h2 className="award-title">Sprout Social is named G2's #1 Best Overall Software Product for 2024</h2>
          <a href="#" className="learn-more-link">Learn more</a>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;