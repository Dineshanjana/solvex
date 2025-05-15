import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import '../css/EnterpriseLanding.css';

const EnterpriseLanding = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    })
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -15 },
    visible: i => ({
      opacity: 1,
      scale: 1,
      rotate: [-12 + (i * -6)],
      transition: {
        delay: 0.5 + (i * 0.1),
        duration: 0.6,
        type: "spring",
        stiffness: 100
      }
    })
  };
  
  const pulseVariant = {
    initial: { scale: 1 },
    pulse: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(65, 232, 179, 0.6)",
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Initialize animations on component mount
  useEffect(() => {
    const badges = document.querySelectorAll('.award-badge');
    badges.forEach((badge, index) => {
      badge.style.transform = `rotate(${-6 * (index + 1)}deg)`;
    });
  }, []);

  return (
    <div className="enterprise-container">
      <div className="content-wrapper">
        <div className="main-grid">
          <motion.div 
            className="content-left"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="glow-accent" variants={fadeIn} custom={0}></motion.div>
            
            <motion.h1 
              className="hero-title"
              variants={fadeIn}
              custom={1}
            >
              <span className="gradient-text">AI-Powered</span> social media management at enterprise scale
            </motion.h1>
            
            <motion.p 
              className="hero-description"
              variants={fadeIn}
              custom={2}
            >
              Transform your social strategy with our intelligent platform. From automated content generation to predictive analytics and customer engagement, our AI tools help your team deliver exceptional results across all channels.
            </motion.p>
            
            <motion.div 
              className="cta-group"
              variants={fadeIn}
              custom={3}
            >
              <motion.button 
                className="demo-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial="initial"
                animate="pulse"
                variants={pulseVariant}
              >
                Request a demo
                <span className="button-icon">→</span>
              </motion.button>
              
              <motion.a 
                href="#" 
                className="watch-video"
                whileHover={{ color: "var(--accent)" }}
              >
                <span className="video-icon">▶</span> Watch how it works
              </motion.a>
            </motion.div>
            
            <motion.div 
              className="stats-row"
              variants={fadeIn}
              custom={4}
            >
              {[
                { number: "93%", text: "time saved on content creation" },
                { number: "47%", text: "increase in engagement" },
                { number: "3.5x", text: "ROI for enterprises" }
              ].map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-text">{stat.text}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div 
            className="image-container"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="image-backdrop"></div>
            <motion.img 
              src="/api/placeholder/600/400" 
              alt="AI-powered social media dashboard" 
              className="main-image"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
            
            <motion.div 
              className="floating-interface"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="analytics-card">
                <div className="card-header">
                  <span className="card-icon">📈</span>
                  <span className="card-title">Engagement Trends</span>
                </div>
                <div className="trend-line"></div>
                <div className="trend-line"></div>
                <div className="trend-line trend-line-accent"></div>
              </div>
            </motion.div>
            
            <motion.div 
              className="badges-container"
              initial="hidden"
              animate="visible"
            >
              {['Top 50 Enterprise', 'Top 50 Marketing', 'Top 100 Satisfaction'].map((title, i) => (
                <motion.div 
                  key={i} 
                  className="award-badge"
                  variants={badgeVariants}
                  custom={i}
                >
                  <div className="badge-software">BEST SOFTWARE</div>
                  <div className="badge-year">2025</div>
                  <div className="badge-title">{title}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          className="bottom-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div 
            className="cta-particles"
            animate={{ 
              background: [
                "radial-gradient(circle at 20% 50%, var(--accent) 0%, transparent 20%)",
                "radial-gradient(circle at 80% 30%, var(--accent) 0%, transparent 20%)"
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          ></motion.div>
          
          <h2 className="cta-title">
            Ready to <span className="gradient-text">revolutionize</span> your social media strategy?
          </h2>
          
          <motion.button 
            className="trial-button"
            whileHover={{ scale: 1.05, boxShadow: "var(--glow)" }}
            whileTap={{ scale: 0.98 }}
          >
            Start your free trial
            <span className="button-icon">→</span>
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="trusted-by"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="trusted-text">Trusted by leading enterprises</p>
          <div className="logo-row">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="logo-placeholder"></div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EnterpriseLanding;