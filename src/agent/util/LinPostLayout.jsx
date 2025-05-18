import React, { useEffect, useState } from 'react';
import { ThumbsUp, MessageSquare, Repeat, Send, X } from 'lucide-react';
import './LinPostLayout.css';
import axios from 'axios';

const LinkedinPostLayout = ({ post, onClose }) => {
    const [publishLoading, setPublishLoading] = useState(false);
    const [linId, setLinId ] = useState("");
    const [liked, setLiked] = useState(false);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        // Fetch LinkedIn profile from API
        const fetchProfile = async () => {
            try {
                const id = localStorage.getItem("li_id");
                setLinId(id);
                const res = await axios.get(`http://localhost:5000/api/profile/fetch-profile-linkedin/${id}`);
                setProfile(res.data.profile);
            } catch (error) {
                console.error('Failed to fetch LinkedIn profile:', error);
            }
        };
        fetchProfile();
    }, []);

    if (!post || !profile) return null;



    const handlePublish = async () => {
        if (!profile) {
            alert("No profile available.");
            return;
        }
        setPublishLoading(true);
        try {
            console.log(post.image);
            const res = await axios.post('http://localhost:5000/api/profile/create-post-linkedin', {
                id: linId,
                imageUrl: post.image,
                caption: post.caption,
                hashtags: post.hashtags.join(' '),
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

    const formatDate = () => {
        const now = new Date();
        return `${now.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}`;
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content linkedin-layout">
                <div className="modal-header linkedin-header">
                    <div className="linkedin-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#0a66c2">
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                        </svg>
                    </div>
                    <button className="close-button linkedin-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="linkedin-post-container">

                    <div className="linkedin-post-content">
                        <div className="linkedin-post-author">
                            <div className="author-image">
                                <img src={profile.picture || '/default-profile.png'} alt={profile.name} />
                            </div>
                            <div className="author-info">
                                <div className="author-name-container">
                                    <h3 className="author-name">{profile.name}</h3>
                                    <span className="connection-degree">• 1st</span>
                                </div>
                                <div className="post-meta">
                                    <span className="post-date">{formatDate()}</span>
                                    <span className="post-visibility">• <span className="globe-icon">🌎</span></span>
                                </div>
                            </div>
                        </div>

                        <div className="post-content">
                            <p className="linkedin-post-text">{post.caption}</p>

                            {post.hashtags.length > 0 && (
                                <div className="linkedin-hashtags">
                                    {post.hashtags.map((tag, index) => (
                                        <span key={index} className="linkedin-tag">{tag}</span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {post.image && (
                            <div className="linkedin-image-container">
                                <img src={post.image} alt="Post content" />
                            </div>
                        )}

                        <div className="linkedin-engagement">
                            <div className="reaction-summary">
                                <div className="reaction-icons">
                                    <span className="reaction-icon like">👍</span>
                                    <span className="reaction-icon celebrate">🎉</span>
                                    <span className="reaction-icon support">❤️</span>
                                </div>
                                <span className="reaction-count">0</span>
                            </div>
                            <div className="comment-share-counts">
                                <span>0 comments</span>
                                <span>•</span>
                                <span>0 reposts</span>
                            </div>
                        </div>

                        <div className="linkedin-divider"></div>

                        <div className="linkedin-actions">
                            <button className={`linkedin-action-button ${liked ? 'active' : ''}`} onClick={handleLike}>
                                <ThumbsUp size={18} />
                                <span>Like</span>
                            </button>
                            <button className="linkedin-action-button">
                                <MessageSquare size={18} />
                                <span>Comment</span>
                            </button>
                            <button className="linkedin-action-button">
                                <Repeat size={18} />
                                <span>Repost</span>
                            </button>
                            <button className="linkedin-action-button">
                                <Send size={18} />
                                <span>Send</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="publish-container linkedin-publish-container">
                    <button
                        className={`publish-button linkedin-publish-button ${publishLoading ? 'loading' : ''}`}
                        onClick={handlePublish}
                        disabled={publishLoading}
                    >
                        {publishLoading ? (
                            <span className="loader"></span>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="#ffffff">
                                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                                </svg>
                                <span>Post on LinkedIn</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LinkedinPostLayout;