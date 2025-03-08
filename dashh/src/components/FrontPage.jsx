import React, { useState } from 'react';
import "../css/FrontPage.css";


import { BiPlus, BiCalendarAlt, BiListUl } from 'react-icons/bi';
import { IoCalendarOutline } from 'react-icons/io5';
import { TbMap2 } from 'react-icons/tb';
import { RiArrowDropDownLine } from 'react-icons/ri';

const FrontPage = ({ activeSubTab, setActiveSubTab }) => {
  const subTabs = [
    { id: 'Queue', count: 0 },
    { id: 'Drafts', count: 0 },
    { id: 'Approvals', count: 0 },
    { id: 'Sent', count: 0 }
  ];
  
  return (
    <div className="frontpage">
      <div className="frontpage-header">
        <div className="frontpage-title">
          <div className="grid-icon">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h2>All Channels</h2>
        </div>
        
        <div className="frontpage-actions">
          <button className="feedback-button">
            <span>💬</span>
            Share Feedback
          </button>
          
          <div className="view-controls">
            <button className="view-button active">
              <BiListUl />
              List
            </button>
            <button className="view-button">
              <BiCalendarAlt />
              Calendar
            </button>
          </div>
          
          <button className="new-post-button">
            <BiPlus />
            New Post
          </button>
        </div>
      </div>
      
      <div className="tab-controls">
        <div className="sub-tabs">
          {subTabs.map(tab => (
            <button 
              key={tab.id}
              className={`sub-tab ${activeSubTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveSubTab(tab.id)}
            >
              {tab.id} <span className="count">{tab.count}</span>
            </button>
          ))}
        </div>
        
        <div className="filters">
          <button className="filter-button">
            <div className="grid-icon small">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            Channels
            <RiArrowDropDownLine />
          </button>
          
          <button className="filter-button">
            <span>#</span>
            Tags
            <RiArrowDropDownLine />
          </button>
          
          <button className="filter-button">
            <TbMap2 />
            Calcutta
            <RiArrowDropDownLine />
          </button>
        </div>
      </div>
      
      <div className="empty-state">
        <div className="empty-icon">
          <IoCalendarOutline />
        </div>
        <h3>No posts scheduled</h3>
        <p>Connect a channel to start scheduling posts</p>
        <button className="connect-button">
          <BiPlus />
          Connect a Channel
        </button>
      </div>
    </div>
  );
};

export default FrontPage;