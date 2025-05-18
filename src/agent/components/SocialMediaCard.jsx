import React from 'react';
import { TiTick } from 'react-icons/ti';
import { Eye, PowerOff } from 'lucide-react';
import "../pages/connection.css";

const SocialMediaCard = ({
  platform,
  isConnected,
  url,
  selectedOption,
  onOptionChange,
  activePlatform,
  onPlatformChange
}) => {
  const handleOptionChange = (option) => {
    if (onOptionChange) {
      onOptionChange(option);
    }
  };

  const handleCardClick = () => {
    if (isConnected && onPlatformChange) {
      onPlatformChange(platform.name);
    }
  };

  return (
    <div
      className={`facebook-card ${activePlatform === platform.name ? 'active-card' : ''}`}
      onClick={handleCardClick}
    >
      <div className="fb-card-header">
        <div className="icon-wrapper" style={{ backgroundColor: platform.color }}>
          {platform.icon}
        </div>
        <h2>{platform.name}</h2>
      </div>
      <p className="fb-card-desc">{platform.description}</p>

      <div className="fb-options">
        {isConnected ? (
          <>
            <button
              className={`fb-option-btn ${selectedOption === 'pages' ? 'active' : ''}`}
              onClick={() => handleOptionChange('pages')}
            >
              <Eye size={18} style={{ marginRight: '6px' }} />
              View
            </button>

            <button
              className="fb-deactive"
              onClick={() => handleOptionChange('deactivate')}
            >
              <PowerOff size={18} style={{ marginRight: '6px' }} />
              Deactivate
            </button>

            <span className="connection-tick">
              <TiTick className="isIcon" size={30} />
            </span>
          </>
        ) : (
          <a href={url}>
            <button className="connect-btn">Connect</button>
          </a>
        )}
      </div>
    </div>
  );
};

export default SocialMediaCard;
