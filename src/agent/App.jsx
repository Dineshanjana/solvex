// src/agent/App.jsx
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Create from './pages/create';
import Header from './components/header';
import Connection from './pages/connection';
import Analytics from './pages/Analytics';
import BackgroundAnimation from "./components/BackgroundAnimation"
import "./App.css"

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activepage, setActivePage] = useState("create");
  const [showModal, setShowSuccessModal] = useState(false);
  const [modalType, setModalType] = useState("login");
  const [modalPlatform, setModalPlatform] = useState("Facebook");

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get('success');

    if (success === "true") {
      const token = queryParams.get("token");
      const Id = queryParams.get("id");
      const platform = queryParams.get("platform");

      if (token) {
        localStorage.setItem(`${platform}_access_token`, token);
      }
      if (Id) {
        localStorage.setItem(`${platform}_id`, Id);
      }
      setActivePage("connection");
      setShowSuccessModal(true);
      let platformName;
      switch (platform) {
        case 'fb':
          platformName = "Facebook"
          break;
        case 'ig':
          platformName = "Instagram"
          break;
        case 'tw':
          platformName = "X"
          break;
        case "li":
          platformName = "Linkedlin"
          break;
        default:
          platformName = " "
      }
      setModalPlatform(platformName);
      setModalType("login"); // Set modal type to login for success case

      // Clean up URL params after use
      window.history.replaceState({}, document.title, "/interface");
    }
  }, [location])

  const renderPage = () => {
    switch (activepage) {
      case "create":
        return <Create />
      case "connection":
        return <Connection
          showModal={showModal}
          modalType={modalType}
          setShowSuccessModal={setShowSuccessModal}
          setModalType={setModalType}
          ModalPlatformName={modalPlatform}
        />
      case "analytics":
        return <Analytics />;
      default:
        return <Create />;
    }
  }

  return (
    <div className="content-wrapper">
      <Header />
      <div className={`app-container ${isLoaded ? "loaded" : ""}`}>

        <Sidebar setActivePage={setActivePage} />
        {renderPage()}
      </div>
    </div>
  )
}

export default App