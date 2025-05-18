import React, { useEffect, useState, useRef } from 'react';
import { ThumbsUp, MessageCircle, Share2, Facebook, X, ChevronDown } from 'lucide-react';
import './fullPostLayout.css';
import NoPageModal from './NoPageModal';
import axios from 'axios';

const FacebookPostLayout = ({ post, onClose }) => {
  const [publishLoading, setPublishLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [activePages, setActivePages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Fetch active pages from API
    const fetchPages = async () => {
      try {
        const res = await axios.get('http://localhost:5000/auth/facebook/fetch-active-pages');
        if (res.data?.data?.length > 0) {
          setActivePages(res.data.data);
          setSelectedPage(res.data.data[0]); // default to first page
        }
      } catch (error) {
        console.error('Failed to fetch active pages:', error);
      }
    };
    fetchPages();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 if (!post || !selectedPage) return null;

  const handlePublish = async () => {
    if (!selectedPage || !selectedPage.AccessToken) {
      alert("No page access token available.");
      return;
    }
    setPublishLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/auth/facebook/create-post', {
        pageId: selectedPage.PageId,
        imageUrl: post.image,
        caption: post.caption,
        hashtags: post.hashtags.join(' '),
        accessToken: selectedPage.AccessToken
      },
        { withCredentials: true }
      );

      if (res.data?.success) {
        alert('Post published successfully!');
        onClose();
      } else {
        console.error('Unexpected response:', res.data);
        alert('Post could not be published.');
      }
    } catch (error) {
      console.error('Error publishing post:', error.response?.data || error.message);
      alert('Failed to publish post.');
    } finally {
      setPublishLoading(false);
    }

  };

  const handleLike = () => setLiked(!liked);
  const handleBookmark = () => setBookmarked(!bookmarked);
  const formatDate = () => {
    const now = new Date();
    return `${now.toLocaleString('default', { month: 'long' })} ${now.getDate()} at ${now.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content facebook-layout">
        <div className="modal-header">
          <div className="facebook-logo">
            <Facebook size={24} color="var(--fb-blue)" />
            <span>Facebook</span>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="facebook-post-container">
          <div className="facebook-post-header">
            {/* Page Selector Dropdown */}
            <div className="page-selector-dropdown" ref={dropdownRef}>
              <button
                className="selected-page"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                <div className="page-preview">
                  <div className="profile-picture">
                    <img src={selectedPage.picture || '/default-profile.png'} alt={selectedPage.name} />
                  </div>
                  <div className="page-info">
                    <div className="page-name">{selectedPage.name}</div>
                    <div className="page-category">{selectedPage.category}</div>
                  </div>
                </div>
                <ChevronDown size={16} className={`dropdown-chevron ${dropdownVisible ? 'active' : ''}`} />
              </button>

              {dropdownVisible && (
                <div className="dlxf-dropdown-menu pages-dropdown">
                  {activePages.map((page) => (
                    <div
                      key={page.id}
                      className={`dropdown-item ${selectedPage.id === page.id ? 'selected' : ''}`}
                      onClick={() => {
                        setSelectedPage(page);
                        setDropdownVisible(false);
                      }}
                    >
                      <div className="dropdown-item-image">
                        <img src={page.picture || '/default-profile.png'} alt={page.name} />
                      </div>
                      <div className="dropdown-item-name">{page.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="facebook-post-content">
            <p className="post-text">{post.caption}</p>
            <div className="facebook-hashtags">
              {post.hashtags.map((tag, index) => (
                <span key={index} className="facebook-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="facebook-image-container">
            <img src={post.image} alt={post.title} />
          </div>

          <div className="facebook-divider"></div>

          <div className="facebook-actions">
            <button className={`fl-slx-action-button ${liked ? 'active' : ''}`} onClick={handleLike}>
              <ThumbsUp size={20} />
              <span>Like</span>
            </button>
            <button className="fl-slx-action-button">
              <MessageCircle size={20} />
              <span>Comment</span>
            </button>
            <button className="fl-slx-action-button">
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </div>

          <div className="facebook-divider"></div>
        </div>

        <div className="publish-container">
          <button
            className={`publish-button ${publishLoading ? 'loading' : ''}`}
            onClick={handlePublish}
            disabled={publishLoading}
          >
            {publishLoading ? (
              <span className="loader"></span>
            ) : (
              <>
                <Facebook size={20} />
                <span>Publish to Facebook</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacebookPostLayout;