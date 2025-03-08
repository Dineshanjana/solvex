// IntegrationsSection.jsx
import React from 'react';
import './IntegrationsSection.css';

const integrationLogos = [
  { name: "TikTok", logo: "/images/tiktok-logo.png" },
  { name: "Instagram", logo: "/images/instagram-logo.png" },
  { name: "X", logo: "/images/x-logo.png" },
  { name: "LinkedIn", logo: "/images/linkedin-logo.png" },
];

const IntegrationsSection = () => {
  return (
    <div className="integrations-container">
      <div className="content-section">
        <h2 className="heading">Trusted partnerships & integrations across leading platforms</h2>
        <p className="description">
          Sprout builds and maintains strong network partnerships and integrations to help you unify your 
          customer touch points and keep pace with changes in the social landscape.
        </p>
        <a href="#" className="integrations-link">See all integrations</a>
      </div>
      
      <div className="integrations-grid">
        {integrationLogos.map((platform, index) => (
          <div className="integration-card" key={index}>
            <img 
              src={`https://placehold.co/80x80/FFFFFF/000000.png?text=${platform.name}`}
              alt={`${platform.name} logo`} 
              className="integration-logo"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsSection;