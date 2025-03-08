import React, { useState } from 'react';
import '../css/Sidebar.css';
import { BsFacebook, BsInstagram, BsTwitterX, BsYoutube, BsPinterest } from 'react-icons/bs';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { TbSettings, TbBrandTiktok } from 'react-icons/tb';
import { MdOutlineTag } from 'react-icons/md';
import { RiMastodonLine } from 'react-icons/ri';
import { HiOutlineDocument } from 'react-icons/hi';
import { FiGrid } from 'react-icons/fi';
import { AiOutlineGoogle } from 'react-icons/ai';

const Sidebar = () => {
  const [showMoreChannels, setShowMoreChannels] = useState(false);
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Channels</h3>
      </div>
      
      <div className="sidebar-channels">
        <button className="channel-button all-channels active">
          <div className="channel-icon all">
            <div className="grid-icon">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <span>All Channels</span>
        </button>
        
        <button className="channel-button">
          <div className="channel-icon">
            <BsFacebook />
          </div>
          <span>Connect Facebook</span>
        </button>
        
        <button className="channel-button">
          <div className="channel-icon">
            <BsInstagram />
          </div>
          <span>Connect Instagram</span>
        </button>
        
        <button className="channel-button">
          <div className="channel-icon">
            <BsTwitterX />
          </div>
          <span>Connect Twitter / X</span>
        </button>
        
        <button className="show-more-button" onClick={() => setShowMoreChannels(!showMoreChannels)}>
          {showMoreChannels ? <BiChevronUp /> : <BiChevronDown />}
          <span>Show {showMoreChannels ? 'less' : 'more'} channels</span>
        </button>
        
        {showMoreChannels && (
          <div className="more-channels">
            <button className="channel-button">
              <div className="channel-icon">
                <BsYoutube />
              </div>
              <span>Connect YouTube</span>
            </button>
            
            <button className="channel-button">
              <div className="channel-icon">
                <TbBrandTiktok />
              </div>
              <span>Connect TikTok</span>
            </button>
            
            <button className="channel-button">
              <div className="channel-icon">
                <BsPinterest />
              </div>
              <span>Connect Pinterest</span>
            </button>
            
            <button className="channel-button highlighted">
              <div className="channel-icon start-page">
                <HiOutlineDocument />
              </div>
              <span>Connect Start Page</span>
            </button>
            
            <button className="channel-button">
              <div className="channel-icon">
                <FiGrid />
              </div>
              <span>Connect Bluesky</span>
            </button>
            
            <button className="channel-button">
              <div className="channel-icon">
                <AiOutlineGoogle />
              </div>
              <span>Connect Google Business...</span>
            </button>
            
            <button className="channel-button">
              <div className="channel-icon">
                <RiMastodonLine />
              </div>
              <span>Connect Mastodon</span>
            </button>
          </div>
        )}
      </div>
      
      <div className="sidebar-footer">
        <button className="manage-button">
          <MdOutlineTag />
          <span>Manage Tags</span>
        </button>
        <button className="manage-button">
          <TbSettings />
          <span>Manage Channels</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;