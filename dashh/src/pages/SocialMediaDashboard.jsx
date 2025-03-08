import React from 'react';
import '../css/SocialMediaDashboard.css';

const SocialMediaDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-section">
          <div className="sidebar-item active">
            <div className="icon home-icon"></div>
            <span>Home</span>
          </div>
        </div>

        <div className="sidebar-section">
          <h3>Channels</h3>
          <div className="sidebar-item">
            <div className="icon facebook-icon"></div>
            <span>Facebook</span>
          </div>
          <div className="sidebar-item">
            <div className="icon instagram-icon"></div>
            <span>Instagram</span>
          </div>
          <div className="sidebar-item">
            <div className="icon twitter-icon"></div>
            <span>Twitter / X</span>
          </div>
          <div className="sidebar-item">
            <div className="icon linkedin-icon"></div>
            <span>LinkedIn</span>
          </div>
        </div>

        <div className="sidebar-section">
          <h3>Tools</h3>
          <div className="sidebar-item">
            <div className="icon tags-icon"></div>
            <span>Tags</span>
            <span className="badge">New</span>
          </div>
          <div className="sidebar-item">
            <div className="icon reports-icon"></div>
            <span>Reports</span>
          </div>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-item">
            <div className="icon settings-icon"></div>
            <span>Manage Channels</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="content-header">
          <h1>Good evening!</h1>
          <p>Get a handle on who your followers are. Make sure to check out our <a href="#" className="audience-link">Audience</a> tab</p>
        </div>

        <div className="scrollable-content">
          {/* First card - already visible in the image */}
          <div className="card">
            <div className="card-header">
              <h2>Totals</h2>
              <button className="add-button">+</button>
            </div>
            <div className="card-content empty-state">
              <div className="wave-graphic"></div>
              <p>Connect Facebook, Instagram, Twitter, or (and!) LinkedIn Pages to begin analyzing your marketing efforts.</p>
            </div>
          </div>

          {/* Second card - already visible in the image */}
          <div className="card">
            <div className="card-header">
              <h2>Looking to succeed at social?</h2>
              <button className="add-button">+</button>
            </div>
            <div className="card-content with-image">
              <div className="content-left">
                <p><a href="#" className="buffer-link">Buffer Library.</a></p>
              </div>
              <div className="content-right">
                <div className="promo-image"></div>
                <div className="promo-content">
                  <h3>Your Social Media Content Calendar and Ideas List for Every Official (and Non-Official) Holiday of 2024</h3>
                  <button className="read-more-button">Read More</button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional card 1 */}
          <div className="card">
            <div className="card-header">
              <h2>Engagement Overview</h2>
              <button className="add-button">+</button>
            </div>
            <div className="card-content empty-state">
              <div className="chart-placeholder"></div>
              <p>Connect your social accounts to see engagement metrics across all your channels in one place.</p>
            </div>
          </div>

          {/* Additional card 2 */}
          <div className="card">
            <div className="card-header">
              <h2>Recent Posts</h2>
              <button className="add-button">+</button>
            </div>
            <div className="card-content empty-state">
              <div className="posts-icon"></div>
              <p>Your recently published posts will appear here for quick access and performance tracking.</p>
            </div>
          </div>

          {/* Additional card 3 */}
          <div className="card">
            <div className="card-header">
              <h2>Recommended Tools</h2>
              <button className="add-button">+</button>
            </div>
            <div className="card-content with-image">
              <div className="content-left">
                <p><a href="#" className="buffer-link">Analytics Pro</a></p>
              </div>
              <div className="content-right">
                <div className="tools-image"></div>
                <div className="promo-content">
                  <h3>Unlock deeper insights with our advanced analytics tools and custom reporting features</h3>
                  <button className="read-more-button">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDashboard;