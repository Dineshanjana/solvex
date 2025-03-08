// MetricsShowcase.jsx
import React from 'react';
import './MetricsShowcase.css';

const MetricsShowcase = () => {
  return (
    <div className="metrics-container">
      <div className="metrics-wrapper">
        {/* First Metric */}
        <div className="metric-column">
          <div className="metric-content">
            <h2 className="metric-heading">80%+</h2>
            <p className="metric-description">
              reduction in average <span className="highlight">time to</span><br />
              <span className="highlight">first response</span>
            </p>
            <div className="logo-container">
              <img 
                src="https://placehold.co/150x40/ffffff/ffffff.png?text=Grammarly" 
                alt="Grammarly logo" 
                className="client-logo"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="vertical-divider"></div>

        {/* Second Metric */}
        <div className="metric-column">
          <div className="metric-content">
            <h2 className="metric-heading">1,002%</h2>
            <p className="metric-description">
              increase in total <span className="highlight">social</span><br />
              <span className="highlight">engagements</span>
            </p>
            <div className="logo-container">
              <img 
                src="https://placehold.co/150x40/ffffff/ffffff.png?text=TREK" 
                alt="Trek logo" 
                className="client-logo"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="vertical-divider"></div>

        {/* Third Metric */}
        <div className="metric-column">
          <div className="metric-content">
            <h2 className="metric-heading">2x</h2>
            <p className="metric-description">
              increase in <span className="highlight">average client</span><br />
              <span className="highlight">retainer</span>
            </p>
            <div className="logo-container">
              <img 
                src="https://placehold.co/150x40/ffffff/ffffff.png?text=DIGITAL+NATIVES" 
                alt="Digital Natives logo" 
                className="client-logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsShowcase;