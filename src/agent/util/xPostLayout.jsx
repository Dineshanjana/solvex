import React, { useEffect, useState } from 'react';
import { MessageCircle, Repeat2, Heart, Share, X, BarChart2 } from 'lucide-react';
import './xPostLayout.css';
import axios from 'axios';

const XPostLayout = ({ post, onClose }) => {
  const [publishLoading, setPublishLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch X profile from API
    const fetchProfile = async () => {
      try {
        console.log(true);
        const id = localStorage.getItem("tw_id");
        const res = await axios.get(`http://localhost:5000/api/profile/fetch-profile-x/${id}`);
        setProfile(res.data.profile);
        console.log("data is",res.data);
      } catch (error) {
        console.error('Failed to fetch X profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!post || !profile) return null;

  const handlePublish = async () => {
    setPublishLoading(true);
    try {
      console.log(profile.id);
      const res = await axios.post('http://localhost:5000/api/profile/create-post-x', {
        id: profile.id,
        imageUrl: post.image,
        caption: post.caption,
        hashtags: post.hashtags.join(' ')
      }, { withCredentials: true });

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
  const handleRetweet = () => setRetweeted(!retweeted);
  const handleBookmark = () => setBookmarked(!bookmarked);

  const formatDate = () => {
    const now = new Date();
    return `${now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} · ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content x-layout">
        <div className="modal-header x-header">
          <div className="x-logo">
   
          </div>
          <button className="close-button x-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="x-post-container">

          <div className="x-post-content">
            <div className="x-post-user">
              <div className="x-user-info">
                <div className="x-user-avatar">
                  <img src={profile.picture || '/default-profile.png'} alt={profile.name} />
                </div>
                <div className="x-user-names">
                  <span className="x-display-name">{profile.name}</span>
                  <span className="x-username">@{profile.username}</span>
                </div>
              </div>
              <div className="x-post-time">{formatDate()}</div>
            </div>

            <p className="x-post-text">{post.caption}</p>
            
            {post.hashtags.length > 0 && (
              <div className="x-hashtags">
                {post.hashtags.map((tag, index) => (
                  <span key={index} className="x-tag">{tag}</span>
                ))}
              </div>
            )}

            {post.image && (
              <div className="x-image-container">
                <img src={post.image} alt="Post content" />
              </div>
            )}

            <div className="x-post-stats">
              <div className="x-stat">
                <span className="x-stat-number">0</span>
                <span className="x-stat-label">Reposts</span>
              </div>
              <div className="x-stat">
                <span className="x-stat-number">0</span>
                <span className="x-stat-label">Quotes</span>
              </div>
              <div className="x-stat">
                <span className="x-stat-number">0</span>
                <span className="x-stat-label">Likes</span>
              </div>
              <div className="x-stat">
                <span className="x-stat-number">0</span>
                <span className="x-stat-label">Bookmarks</span>
              </div>
              <div className="x-stat">
                <span className="x-stat-number">0</span>
                <span className="x-stat-label">Views</span>
              </div>
            </div>

            <div className="x-divider"></div>

            <div className="x-actions">
              <button className="x-action-button">
                <MessageCircle size={18} />
              </button>
              <button className={`x-action-button ${retweeted ? 'retweeted' : ''}`} onClick={handleRetweet}>
                <Repeat2 size={18} />
              </button>
              <button className={`x-action-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
                <Heart size={18} />
              </button>
              <button className="x-action-button">
                <BarChart2 size={18} />
              </button>
              <button className="x-action-button">
                <Share size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="publish-container x-publish-container">
          <button
            className={`publish-button x-publish-button ${publishLoading ? 'loading' : ''}`}
            onClick={handlePublish}
            disabled={publishLoading}
          >
            {publishLoading ? (
              <span className="loader"></span>
            ) : (
              <>
                <span>Post to X</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default XPostLayout;