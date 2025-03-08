import React, { useState } from 'react';
import "../css/Navbar.css";
import { FaBuffer, FaUser } from 'react-icons/fa'; // Import FaUser for the user icon
import { IoMdNotifications } from 'react-icons/io';
import { MdOutlineCardGiftcard } from 'react-icons/md';
import { BiPlus } from 'react-icons/bi';

const Navbar = ({ currentTab, setCurrentTab }) => {
  const tabs = ['Create', 'Publish', 'Analyze', 'Engage', 'Start Page'];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">
          {/* <FaBuffer /> */}
          <span>SolveX</span>
        </div>
        <div className="navbar-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`navbar-tab ${currentTab === tab ? 'active' : ''}`}
              onClick={() => setCurrentTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="navbar-right">
        <button className="invite-button">
          <span className="invite-icon">👤</span>
          Invite Your Team
        </button>
        <div className="new-button-container">
          <button className="new-button" onClick={toggleDropdown}>
            <BiPlus />
            New
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item">Upload Image</button>
              <button className="dropdown-item">Create Post</button>
              <button className="dropdown-item">Add Media</button>
            </div>
          )}
        </div>
        <div className="navbar-icons">
          <button className="icon-button">
            <MdOutlineCardGiftcard className="gift-icon" />
          </button>
          <button className="icon-button">
            <IoMdNotifications />
          </button>
          <div className="profile-button-container">
            <button className="profile-button" onClick={toggleProfileDropdown}>
              <div className="profile-avatar">
                <FaUser className="profile-icon" /> {/* Replace "hello" with FaUser icon */}
              </div>
            </button>
            {isProfileDropdownOpen && (
              <div className="profile-dropdown-menu">
                <button className="profile-dropdown-item">Settings <span className="new-indicator">New</span></button>
                <button className="profile-dropdown-item">Channels</button>
                <button className="profile-dropdown-item">Billing</button>
                <button className="profile-dropdown-item">Team</button>
                <button className="profile-dropdown-item">Refer a Friend</button>
                <button className="profile-dropdown-item">Beta Features</button>
                <button className="profile-dropdown-item logout">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;