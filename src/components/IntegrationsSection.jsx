
import React from 'react';
import '../css/IntegrationsSection.css';
import {
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Twitter,
  ArrowRight
} from 'lucide-react';


const integrationPlatforms = [
  { name: "Instagram", icon: <Instagram size={40} /> },
  { name: "X", icon: <Twitter size={40} /> },
  { name: "LinkedIn", icon: <Linkedin size={40} /> },
  { name: "Facebook", icon: <Facebook size={40} /> },
  { name: "YouTube", icon: <Youtube size={40} /> },
];

const IntegrationsSection = () => {
  return (
    <div className="integrations-container">
      <div className="content-section">
        <h2 className="heading">Seamless integration with your favorite platforms</h2>
        <p className="description">
          SocialAI<span style={{ color: 'var(--accent)' }}>Agent</span> connects with leading social media networks, 
          giving you a unified command center to manage all your online presence with the power of AI.
        </p>
        <a href="#" className="integrations-link">
          Explore all integrations <ArrowRight size={16} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
        </a>
      </div>
      
      <div className="integrations-grid">
        {integrationPlatforms.map((platform, index) => (
          <div className="integration-card" key={index}>
            <div className="integration-logo">
            {platform.icon}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntegrationsSection;