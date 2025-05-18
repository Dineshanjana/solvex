import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthModals from './AuthModals';
import Navbar from './Navbar';
import '../css/HeroSection.css';

const HeroSection = () => {
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    type: 'login'
  });

  // Multiple taglines for typing animation
  const taglines = [
    "Intelligence that evolves with your business",
    "Automate your social media strategy",
    "Engage with data-driven insights",
    "Convert followers into customers"
  ];
  
  const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseDuration = 1500;

  useEffect(() => {
    let timeout;
    const currentTagline = taglines[currentTaglineIndex];
    
    // Handle pausing at the end of typing
    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }
    
    // Handle typing
    if (!isDeleting && typedText.length < currentTagline.length) {
      timeout = setTimeout(() => {
        setTypedText(currentTagline.slice(0, typedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } 
    
    // Handle pause when typing is complete
    if (!isDeleting && typedText.length === currentTagline.length) {
      setIsPaused(true);
      return () => clearTimeout(timeout);
    }
    
    // Handle deleting
    if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => {
        setTypedText(currentTagline.slice(0, typedText.length - 1));
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    }
    
    // Move to next tagline when deletion is complete
    if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
      setCurrentTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }
    
    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentTaglineIndex, isPaused]);

  const openModal = (type) => {
    setAuthModal({
      isOpen: true,
      type
    });
  };

  const closeModal = () => {
    setAuthModal((prev) => ({
      ...prev,
      isOpen: false
    }));
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 50, 
        delay: 0.5 
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 50,
        delay: 0.7
      }
    }
  };

  const notificationVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { delay: 1.5, type: "spring", stiffness: 200 }
    }
  };

  return (
    <div className="ai-agent-container">
      {/* Decorative gradient orbs */}
      <div className="gradient-orb gradient-orb-1"></div>
      <div className="gradient-orb gradient-orb-2"></div>
      <div className="gradient-orb gradient-orb-3"></div>
      
      {/* Navbar */}
      <Navbar openModal={openModal} />

      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="badge-container">
            <motion.div variants={itemVariants} className="new-badge">
              <span className="pulse"></span>
              NEW AI AGENT PLATFORM
            </motion.div>
          </div>

          <motion.h1 variants={itemVariants} className="hero-title">
            <span className="hero-title-static">Supercharge your social with </span>
            <div className="hero-title-dynamic-container">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={currentTaglineIndex}
                  className="hero-title-dynamic"
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {typedText}<span className="cursor">|</span>
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-description">
            Our AI-powered social media management platform transforms your entire organization.
          
          </motion.p>

          <motion.div variants={itemVariants} className="hero-buttons">
            <motion.a 
              href="#" 
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                openModal('signup');
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start free trial
            </motion.a>
            <motion.a 
              href="#" 
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              See it in action
            </motion.a>
          </motion.div>

          <motion.p variants={itemVariants} className="hero-note">
            {/* No credit card required • 30-day free trial */}
          </motion.p>

          <motion.div variants={itemVariants} className="trust-indicators">
            <div className="trust-icons">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <motion.div 
                  key={index}
                  className="user-icon"
                  initial={{ scale: 0, x: -20 * index }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1) }}
                >
                  <div className="user-avatar">
                    <span>{String.fromCharCode(65 + index)}</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="trust-text">Join 30,000+ businesses using our AI platform</div>
          </motion.div>

          <motion.div variants={itemVariants} className="awards">
            <div className="award-main">
              <motion.svg 
                className="g2-logo" 
                viewBox="0 0 40 40" 
                fill="white"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1 }}
              >
                <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="2" fill="none" />
                <text x="10" y="25" fill="white" fontSize="15" fontWeight="bold">G2</text>
              </motion.svg>
              <span className="award-title">#1 Best AI Social Platform | 2025</span>
            </div>

            <div className="award-list">
              <div>Top AI Tool for Enterprise, 2025</div>
              <div>Top AI Product for Mid Market, 2025</div>
              <div>Best AI Social Media Solution, 2025</div>
              <div>Highest Customer Satisfaction, 2025</div>
            </div>
          </motion.div>
        </motion.div>

        <div className="hero-visuals">
          <motion.div 
            className="hero-dashboard"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="dashboard-header">
              <div className="dashboard-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="dashboard-title">AI Social Dashboard</div>
            </div>
            <div className="dashboard-content">
              <img 
                src="herosectionimg.png" 
                alt="AI Agent Dashboard" 
                className="dashboard-image" 
              />
            </div>
          </motion.div>

          <motion.div 
            className="floating-card card-analytics"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="card-icon analytics-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 20V10M12 20V4M6 20v-6" />
              </svg>
            </div>
            <div className="card-content">
              <div className="card-title">Engagement up</div>
              <div className="card-value">+47%</div>
            </div>
          </motion.div>

          <motion.div 
            className="floating-card card-sentiment"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.9 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="card-icon sentiment-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z" />
              </svg>
            </div>
            <div className="card-content">
              <div className="card-title">Sentiment score</div>
              <div className="card-value">9.2/10</div>
            </div>
          </motion.div>

          <motion.div 
            className="floating-card card-conversion"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 1.1 }}
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="card-icon conversion-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v16m-6-8h12" />
              </svg>
            </div>
            <div className="card-content">
              <div className="card-title">ROI increase</div>
              <div className="card-value">+128%</div>
            </div>
          </motion.div>

          <motion.div 
            className="ai-notification"
            variants={notificationVariants}
            initial="initial"
            animate="animate"
            whileHover={{ y: -5, transition: { duration: 0.3 } }}
          >
            <div className="notification-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 16a4 4 0 100-8 4 4 0 000 8z" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            </div>
            <div className="notification-content">
              <div className="notification-title">AI Assistant</div>
              <div className="notification-message">Optimal posting time detected: Wednesday at 2pm</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Auth Modals */}
      <AuthModals 
        isOpen={authModal.isOpen}
        modalType={authModal.type}
        onClose={closeModal}
      />
    </div>
  );
};

export default HeroSection;