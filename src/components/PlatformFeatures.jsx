import React, { useState, useEffect } from 'react';
import { Brain, MessageSquare, BarChart2, Clock, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import '../css/PlatformFeatures.css';
const AIAgentPlatform = () => {
  const [activeFeature, setActiveFeature] = useState(1);
  

  const platformFeatures = [
    { 
      id: 1, 
      name: 'AI Assistant', 
      icon: <Brain size={20} />,
      description: "Let AI craft perfect responses and create engaging content",
      benefits: [
        "Generate tailored responses with context-aware AI agents",
        "Create personalized content that resonates with your audience",
        "Optimize messaging tone and style for each platform"
      ]
    },
    { 
      id: 2, 
      name: 'Smart Engagement', 
      icon: <MessageSquare size={20} />,
      description: "Build meaningful connections with automated intelligence",
      benefits: [
        "Deploy AI agents that understand customer sentiment",
        "Auto-categorize and prioritize urgent messages",
        "Handle routine questions with conversational AI"
      ]
    },
    { 
      id: 3, 
      name: 'Predictive Analytics', 
      icon: <BarChart2 size={20} />,
      description: "Forecast trends and optimize your strategy with AI insights",
      benefits: [
        "Predict content performance before publishing",
        "Identify emerging trends in your audience data",
        "Receive AI-recommended strategy adjustments"
      ]
    },
    { 
      id: 4, 
      name: 'Time Optimizer', 
      icon: <Clock size={20} />,
      description: "Save hours daily with intelligent workflow automation",
      benefits: [
        "Schedule content with AI-determined optimal timing",
        "Automate repetitive tasks with smart agents",
        "Manage cross-platform posting from one dashboard"
      ]
    },
    { 
      id: 5, 
      name: 'Audience Intelligence', 
      icon: <Users size={20} />,
      description: "Understand and grow your audience with deep AI analysis",
      benefits: [
        "Create detailed AI-generated audience personas",
        "Detect sentiment shifts in community discussions",
        "Target content to specific audience segments"
      ]
    },
    { 
      id: 6, 
      name: 'Performance Boost', 
      icon: <Zap size={20} />,
      description: "Amplify your results with AI-optimized strategies",
      benefits: [
        "A/B test content variations with AI analysis",
        "Automatically improve post performance in real-time",
        "Scale your social media impact without increasing workload"
      ]
    },
  ];

  // Switch the active feature every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveFeature(current => 
        current === platformFeatures.length ? 1 : current + 1
      );
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [platformFeatures.length]);

  const activeFeatureData = platformFeatures.find(feat => feat.id === activeFeature);

  return (
    <div className="platform-container">
      <div className="hero-header">
        <h1 className="company-name">Supercharge your social presence with <span className="highlight">AI</span></h1>

      </div>

      {/* Platform Navigation Menu */}
      <div className="platform-nav">
        {platformFeatures.map(feature => (
          <div 
            key={feature.id} 
            className={`platform-nav-item ${feature.id === activeFeature ? 'active' : ''}`}
            onClick={() => setActiveFeature(feature.id)}
          >
            <div className="platform-icon">{feature.icon}</div>
            <span className="platform-name">{feature.name}</span>
          </div>
        ))}
      </div>

      {/* Feature Showcase */}
      <div className="feature-showcase">
        <div className="feature-dashboard">
          <div className="dashboard-container">
            <div className="dashboard-header">
              <div className="dashboard-circles">
                <span></span><span></span><span></span>
              </div>
              <p>AI Agent Dashboard</p>
            </div>
            <div className="dashboard-content">
              <div className="agent-conversation">
                <div className="message user">
                  <div className="avatar">U</div>
                  <div className="bubble">How's our Instagram engagement this week?</div>
                </div>
                <div className="message agent">
                  <div className="avatar">AI</div>
                  <div className="bubble">
                    <p>Instagram engagement is up 27% from last week! ✨</p>
                    <p>Your video content is performing exceptionally well. Would you like me to draft similar content for next week?</p>
                  </div>
                </div>
                <div className="agent-typing">
                  <div className="typing-indicator"><span></span><span></span><span></span></div>
                </div>
              </div>
              <div className="agent-analytics">
                <div className="analytics-header">
                  <h4>Performance Overview</h4>
                </div>
                <div className="chart-container">
                  <div className="chart-bar" style={{ height: '60%' }}><span>M</span></div>
                  <div className="chart-bar" style={{ height: '45%' }}><span>T</span></div>
                  <div className="chart-bar" style={{ height: '70%' }}><span>W</span></div>
                  <div className="chart-bar" style={{ height: '90%' }}><span>T</span></div>
                  <div className="chart-bar highlight" style={{ height: '85%' }}><span>F</span></div>
                  <div className="chart-bar" style={{ height: '50%' }}><span>S</span></div>
                  <div className="chart-bar" style={{ height: '40%' }}><span>S</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="feature-content">
          <div className="feature-badge">AI-POWERED</div>
          <h1 className="feature-title">{activeFeatureData.name}</h1>
          
          <p className="feature-description">
            {activeFeatureData.description}
          </p>
          
          <div className="feature-benefits">
            {activeFeatureData.benefits.map((benefit, index) => (
              <div className="benefit-item" key={index}>
                <CheckCircle className="benefit-icon" />
                <p className="benefit-text">{benefit}</p>
              </div>
            ))}
          </div>
          
          <button className="action-button">
            Get Started <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIAgentPlatform;