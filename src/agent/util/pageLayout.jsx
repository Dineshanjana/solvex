//src\agent\util\pageLayout.jsx
import { useState } from 'react';
import { LassoSelect } from 'lucide-react';

import './pageLayout.css';
import FacebookPostLayout from './fullPostLayout';
import LinkedinPostLayout from './LinPostLayout';
import XPostLayout from './xPostLayout';

const PostResult = ({ sectionTitle = "AI Generated Posts", data, loading, platform }) => {
    console.log(platform)
    const [selectedPost, setSelectedPost] = useState(null);

    if (!loading && !data) return null;

    const handlePostClick = (post) => {
        setSelectedPost(post);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
        document.body.style.overflow = ''; // Re-enable scrolling
    };

    return (
        <div className="post-result-wrapper">
            <div className="section-label">{sectionTitle}</div>

            <div className="post-grid-container">
                {loading ? (
                    // Skeleton Loader
                    <div className="post-grid">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="post-card skeleton">
                                <div className="skeleton-image"></div>
                                <div className="skeleton-content">
                                    <div className="skeleton-title"></div>
                                    <div className="skeleton-title" style={{ width: '70%' }}></div>
                                    <div className="skeleton-hashtags">
                                        <div className="skeleton-tag"></div>
                                        <div className="skeleton-tag"></div>
                                        <div className="skeleton-tag"></div>
                                    </div>
                                </div>
                                <div className="skeleton-check"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Actual Content
                    <div className="post-grid">
                        {data?.posts?.map((post, index) => (
                            <div key={index} className="post-card" onClick={() => handlePostClick(post)}>
                                <div className="image-container">
                                    <img src={post.image} alt={post.caption} />
                                    <div className="image-overlay"></div>
                                </div>
                                <div className="post-content">
                                    <h3 className="truncate-title">{post.caption}</h3>
                                    <div className="hashtags">
                                        {post.hashtags?.slice(0, 3).map((tag, idx) => (
                                            <span key={idx} className="hashtag">{tag}</span>
                                        ))}
                                        {post.hashtags?.length > 3 && (
                                            <span className="more-hashtags">+{post.hashtags.length - 3}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="check-mark">
                                    <LassoSelect size={16} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedPost && (
                <>
                    {platform === "facebook" && (
                        <FacebookPostLayout post={selectedPost} onClose={handleCloseModal} />
                    )}
                    {platform === "linkedin" && (
                        <LinkedinPostLayout post={selectedPost} onClose={handleCloseModal} />
                    )}
                    {platform === "twitter" && (
                        <XPostLayout post={selectedPost} onClose={handleCloseModal} />
                    )}

                </>
            )}
        </div>
    );
};

export default PostResult;
