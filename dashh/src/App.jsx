import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FrontPage from './components/FrontPage.jsx';
import IdeaBoard from './pages/IdeaBoard.jsx'
import SocialMediaDashboard from './pages/SocialMediaDashboard.jsx'
import TemplateGallery from './pages/TemplateGallery.jsx';
import './App.css';

function App() {
  const [currentTab, setCurrentTab] = useState('Publish');
  const [activeSubTab, setActiveSubTab] = useState('Queue');
  
  return (
    <div className="app">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="app-content">
        <Sidebar />
        <FrontPage activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />
      </div>
      {/* <IdeaBoard/> */}
      {/* <SocialMediaDashboard/> */}
      {/* <TemplateGallery/> */}
    </div>
  );
}

export default App;