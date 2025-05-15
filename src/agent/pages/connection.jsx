import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter, } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { motion, AnimatePresence } from "framer-motion";
import SocialMediaCard from '../components/SocialMediaCard';
import SuccessModal from "../components/SuccessModal";
import { jwtDecode } from "jwt-decode";
import "./connection.css";

const PageLoader = () => {
  return (
    <div className="loader-container">
      <div className="modern-loader">
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
      </div>
      <p className="loader-text">Loading your data...</p>
    </div>
  );
};

const ProfileCard = ({ profile, platform }) => {
  let platformColor;
  
  switch (platform) {
    case "LinkedIn":
      platformColor = "#0077B5";
      break;
    case "X":
      platformColor = "#000000";
      break;
    default:
      platformColor = "#41e8b3";
  }
  
  return (
    <div className="slx-profile-card">
      <div className="slx-profile-header">
        <div className="slx-profile-picture-container">
          <img src={profile.picture || '/default-profile-icon.png'} alt={`${profile.name} profile`} className="slx-profile-picture" />
        </div>
      </div>
      <div className="slx-profile-content">
        <h3 className="slx-profile-name">{profile.name}</h3>
        {profile.username && <p className="slx-profile-username">@{profile.username}</p>}
        {profile.email && <p className="slx-profile-email">{profile.email}</p>}
        
        <div className="slx-profile-status">
          <span className="slx-status-indicator active"></span>
          <span className="slx-status-text">Connected</span>
        </div>
      </div>
    </div>
  );
};

const Connection = ({ showModal, modalType, setShowSuccessModal, setModalType, ModalPlatformName }) => {
  const [showSuccessModalLocal, setShowSuccessModalLocal] = useState(showModal);
  const [type, setType] = useState(modalType);
  const [selectedOption, setSelectedOption] = useState("pages");
  const [selectedPages, setSelectedPages] = useState([]);
  const [activePlatform, setActivePlatform] = useState("Facebook"); // Default active platform
  const [connectionStatuses, setConnectionStatuses] = useState({
    Facebook: false,
    Instagram: false,
    LinkedIn: false,
    X: false
  });
  const [Pages, setPages] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [UserId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalPlatform, setModalPlatform] = useState(ModalPlatformName);
  const navigate = useNavigate();
  const location = useLocation();

  // Platforms data
  const platforms = [
    {
      name: "Facebook",
      icon: <FaFacebookF size={28} />,
      description: "Connect your Facebook account",
      color: "#1877F2",
      oauth: true,
      url: `http://localhost:5000/auth/facebook/connect/?userId=${UserId}&intent=FACEBOOK`,
      status: true,
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={28} />,
      description: "Link your Instagram profile",
      color: "#E4405F",
      oauth: true,
      url: `http://localhost:5000/auth/facebook/connect/?userId=${UserId}&intent=INSTAGRAM`,
      status: false,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn size={28} />,
      description: "Link your LinkedIn page",
      color: "#0077B5",
      oauth: true,
      url: `http://localhost:5000/auth/linkedin/connect/?userId=${UserId}`,
      status: true,
    },
    {
      name: "X",
      icon: <FaXTwitter size={28} />,
      description: "Connect your X account",
      color: "#000000",
      oauth: true,
      url: `http://localhost:5000/auth/twitter/connect/?userId=${UserId}`,
      status: true,
    },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decode = jwtDecode(token);
      setUserId(decode.id);
    }

    // Check connection statuses for all platforms
    const fbToken = localStorage.getItem("fb_access_token");
    const igToken = localStorage.getItem("ig_access_token");
    const liToken = localStorage.getItem("li_access_token");
    const twToken = localStorage.getItem("tw_access_token");

    setConnectionStatuses({
      Facebook: !!fbToken,
      Instagram: !!igToken,
      LinkedIn: !!liToken,
      X: !!twToken
    });
  }, []);

  useEffect(() => {
    if (showModal) {
      setShowSuccessModalLocal(true);
      setType(modalType);
    }
  }, [showModal, modalType]);

  useEffect(() => {
    const fetchData = async () => {
      if (connectionStatuses[activePlatform]) {
        if (selectedOption === "pages") {
          if (activePlatform === "Facebook" || activePlatform === "Instagram") {
            await fetchPages(activePlatform);
          } else if (activePlatform === "LinkedIn" || activePlatform === "X") {
            await fetchProfile(activePlatform);
          }
        } else if (selectedOption === "deactivate") {
          await deactivatePlatform(activePlatform);
        }
      }
    };
    fetchData();
  }, [selectedOption, activePlatform, connectionStatuses]);

  const fetchProfile = async (platform) => {
    try {
      setIsLoading(true);
      setProfileData(null);
      
      let endpoint;
      let id;

      if (platform === "LinkedIn") {
        id = localStorage.getItem("li_id");
        console.log("li id :", id);
        endpoint = `http://localhost:5000/api/profile/fetch-profile-linkedin/${id}`;
      } else if (platform === "X") {
        id = localStorage.getItem("tw_id");
        endpoint = `http://localhost:5000/api/profile/fetch-profile-x/${id}`;
      }

      if (!id) {
        setIsLoading(false);
        return;
      }

      const res = await axios.get(endpoint);
      
      setTimeout(() => {
        setProfileData(res.data.profile);
        setIsLoading(false);
      }, 800);

    } catch (err) {
      console.error(`Error fetching ${platform} profile:`, err);
      setIsLoading(false);
    }
  };

  const fetchPages = async (platform) => {
    try {
      setIsLoading(true);
      setPages([]);
      let accessToken, endpoint;

      switch (platform) {
        case "Facebook":
          accessToken = localStorage.getItem("fb_access_token");
          endpoint = 'http://localhost:5000/auth/facebook/get-pages';
          break;
        case "Instagram":
          accessToken = localStorage.getItem("ig_access_token");
          endpoint = 'http://localhost:5000/auth/instagram/get-accounts';
          break;
        default:
          setIsLoading(false);
          return;
      }

      const res = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setTimeout(() => {
        setPages(res.data);
        setIsLoading(false);
      }, 800);

    } catch (err) {
      console.error(`Error fetching ${platform} pages:`, err);
      setIsLoading(false);
    }
  };

  const deactivatePlatform = async (platform) => {
    try {
      let platformId, endpoint, tokenKey;

      switch (platform) {
        case "Facebook":
          platformId = localStorage.getItem("fb_id");
          endpoint = `http://localhost:5000/auth/facebook/logout?id=${platformId}&platform=${platform}`;
          tokenKey = "fb_access_token";
          break;
        case "Instagram":
          platformId = localStorage.getItem("ig_id");
          endpoint = `http://localhost:5000/auth/instagram/logout?id=${platformId}&platform=${platform}`;
          tokenKey = "ig_access_token";
          break;
        case "LinkedIn":
          platformId = localStorage.getItem("li_id");
          endpoint = `http://localhost:5000/auth/linkedin/logout?id=${platformId}&platform=${platform}`;
          tokenKey = "li_access_token";
          break;
        case "X":
          platformId = localStorage.getItem("tw_id");
          endpoint = `http://localhost:5000/auth/twitter/logout?id=${platformId}&platform=${platform}`;
          tokenKey = "tw_access_token";
          break;
        default:
          return;
      }

      const confirmLogout = window.confirm(
        `Are you sure you want to disconnect your ${platform} account?`
      );

      if (!confirmLogout) {
        setSelectedOption("pages"); // Reset to pages view if cancelled
        return;
      }

      setIsLoading(true);
      const res = await axios.post(endpoint);

      if (res.data.success) {
        localStorage.removeItem(tokenKey);
        localStorage.removeItem(`${tokenKey.split('_')[0]}Id`); // Remove ID

        // Update connection status
        setConnectionStatuses(prev => ({
          ...prev,
          [platform]: false
        }));

        setPages([]); // Clear pages
        setProfileData(null); // Clear profile data
        setSelectedOption("pages"); // Reset to pages view
        setType("logout");
        setModalPlatform(platform);
        setShowSuccessModalLocal(true);
        if (setModalType) setModalType("logout");
      }
    } catch (error) {
      console.error(`${platform} logout error:`, error);
      setSelectedOption("pages");
      setIsLoading(false);
      window.alert(
        error.response?.data?.message ||
        `Error disconnecting ${platform} account`
      );
    }
  };

  const closeModal = () => {
    setShowSuccessModalLocal(false);
    if (setShowSuccessModal) setShowSuccessModal(false);
    window.history.replaceState({}, document.title, "/interface");
  };

  const togglePageActive = async (pageId) => {
    const page = Pages.find(p => p.id === pageId);
    const actionType = page.status ? "Deactive" : "Active";

    const confirmToggle = window.confirm(
      `Are you sure you want to ${actionType} the page ${page.name}?`
    );

    if (!confirmToggle || !UserId) return;

    try {
      let endpoint;
      switch (activePlatform) {
        case "Facebook":
          endpoint = 'http://localhost:5000/auth/facebook/toggle-page-status';
          break;
        case "Instagram":
          endpoint = 'http://localhost:5000/auth/instagram/toggle-account-status';
          break;
        default:
          return;
      }

      const res = await axios.post(endpoint, {
        PageId: pageId,
        userId: UserId,
        name: page.name,
        category: page.category || '',
        picture: page.picture || ''
      });

      if (res.status === 200) {
        const updatedPages = Pages.map(p =>
          p.id === pageId ? { ...p, status: res.data.status } : p
        );
        setPages(updatedPages);
        window.alert(res.data.message);
      }
    } catch (error) {
      console.log("Error toggling page:", error);
      window.alert("Error toggling page status");
    }
  };

  const clearSelection = () => {
    setSelectedPages([]);
  };

  const handlePlatformChange = (platform) => {
    setActivePlatform(platform);
    setProfileData(null);
    setPages([]);
  };

  return (
    <div className="connection-page">
      <h1 className="connection-heading">Connect your social media pages</h1>

      <div className="card-grid">
        {platforms.map((platform, index) => {
          if (platform.status) {
            return (
              <SocialMediaCard
                key={index}
                platform={platform}
                isConnected={connectionStatuses[platform.name]}
                url={platform.url}
                selectedOption={selectedOption}
                onOptionChange={setSelectedOption}
                activePlatform={activePlatform}
                onPlatformChange={handlePlatformChange}
              />
            );
          }
        })}
      </div>

      {/* Pages List Section with Loader */}
      {connectionStatuses[activePlatform] && selectedOption === "pages" && (
        <div className="pages-section">
          {(activePlatform === "Facebook" || activePlatform === "Instagram") ? (
            <>
              <h2 className="pages-heading">Select {activePlatform} Pages to Connect</h2>

              {isLoading ? (
                <PageLoader />
              ) : Pages.length > 0 ? (
                <>
                  <div className="pages-grid">
                    {Pages.map(page => (
                      <div
                        key={page.id}
                        className={`page-card`}
                      >
                        <div className="page-card-content">
                          <div className="page-icon">
                            <img className="custom-pg-icon" src={page.picture || '/default-page-icon.png'} alt={`${page.name} icon`} />
                          </div>
                          <div className="slx-page-info">
                            <h3 className="slx-page-name">{page.name}</h3>
                            <p className="page-stats">
                              <span className="slx-page-category">{page.category || activePlatform + ' Page'}</span>
                            </p>
                          </div>
                        </div>

                        {/* Added toggle button for activation */}
                        <div className="page-toggle-section">
                          <div className="page-status">
                            <span className={`status-indicator ${page.status ? 'active' : 'inactive'}`}></span>
                            <span className="status-text">{page.status ? 'Active' : 'Inactive'}</span>
                          </div>
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={page.status}
                              onChange={() => togglePageActive(page.id)}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedPages.length > 0 && (
                    <div className="action-buttons">
                      <button className="connect-pages-btn">
                        Connect {selectedPages.length} {selectedPages.length === 1 ? 'Page' : 'Pages'}
                      </button>
                      <button className="clear-selection-btn" onClick={clearSelection}>
                        Clear Selection
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-pages-message">
                  <svg className="empty-icon" viewBox="0 0 24 24">
                    <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm0 16.5h-15V4.5h15v15z" />
                    <path d="M12 7.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-4.5 6c0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5H7.5z" />
                  </svg>
                  <p>No {activePlatform} pages found for your account</p>
                  <button className="create-page-btn">Create New {activePlatform} Page</button>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="pages-heading">Your {activePlatform} Profile</h2>
              
              {isLoading ? (
                <PageLoader />
              ) : profileData ? (
                <div className="profile-container">
                  <ProfileCard profile={profileData} platform={activePlatform} />
                </div>
              ) : (
                <div className="no-pages-message">
                  <svg className="empty-icon" viewBox="0 0 24 24">
                    <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm0 16.5h-15V4.5h15v15z" />
                    <path d="M12 7.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm-4.5 6c0-2.48 2.02-4.5 4.5-4.5s4.5 2.02 4.5 4.5H7.5z" />
                  </svg>
                  <p>Could not load your {activePlatform} profile</p>
                  <button className="reconnect-btn">Reconnect {activePlatform}</button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <AnimatePresence>
        {showSuccessModalLocal && (
          <SuccessModal onClose={closeModal} type={type} platform={modalPlatform} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Connection;