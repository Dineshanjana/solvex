import React from 'react';
import '../css/TemplateGallery.css';

const TemplateGallery = () => {
  const templates = [
    {
      id: 1,
      title: 'Traveler',
      mainImage: '/traveler-main.jpg',
      accent: '#e6c254',
      description: 'It doesnt matter who you are or what you sell. A Start Page is your canvas to create an online home for your brand, in just a few minutes.',
      buttons: [
        { text: 'A link to anything', icon: '→', color: '#e6c254' }
      ]
    },
    {
      id: 2,
      title: 'Flowers Shop',
      mainImage: '/flowers-main.jpg',
      secondaryImage: '/flowers-secondary.jpg',
      accent: '#18a76a',
      tagline: 'Sell Flowers To Family And Friends',
      buttons: [
        { text: 'Shop flowers', icon: '→', color: '#18a76a' }
      ]
    },
    {
      id: 3,
      title: 'Pizza',
      mainImage: '/pizza-main.jpg',
      secondaryImage: '/pizza-secondary.jpg',
      accent: '#f05a1a',
      logo: '/pizza-logo.png',
      tagline: '100% Homemade Pizza ★',
      description: 'The best pizza and pasta is made with fresh ingredients by the team here at Pizzaa. You can dine in at The Pizzaa restaurant or pick up. Take advantage of one of our specials on two or more large pizzas now.',
      buttons: [
        { text: 'Order Online', icon: '→', color: '#f05a1a' }
      ]
    },
    {
      id: 4,
      title: 'Bakery',
      mainImage: '/bakery-main.jpg',
      accent: '#8c5e31',
      logo: '/bakery-logo.png',
      tagline: 'Fresh Baked Goods Daily',
      buttons: [
        { text: 'View Menu', icon: '→', color: '#8c5e31' }
      ]
    },
    {
      id: 5,
      title: 'Fitness',
      mainImage: '/fitness-main.jpg',
      secondaryImage: '/fitness-secondary.jpg',
      accent: '#4a6fd8',
      tagline: 'Train With Certified Professionals',
      buttons: [
        { text: 'Book a Session', icon: '→', color: '#4a6fd8' }
      ]
    },
    {
      id: 6,
      title: 'Portfolio',
      mainImage: '/portfolio-main.jpg',
      accent: '#454545',
      logo: '/portfolio-logo.png',
      tagline: 'Creative Designer & Developer',
      description: 'Showcase your best work with a clean, modern portfolio template designed to highlight your projects and skills.',
      buttons: [
        { text: 'See My Work', icon: '→', color: '#454545' }
      ]
    },
    {
      id: 7,
      title: 'Salon',
      mainImage: '/salon-main.jpg',
      accent: '#d85a78',
      tagline: 'Professional Hair & Beauty',
      buttons: [
        { text: 'Book Appointment', icon: '→', color: '#d85a78' }
      ]
    },
    {
      id: 8,
      title: 'Podcaster',
      mainImage: '/podcast-main.jpg',
      secondaryImage: '/podcast-secondary.jpg',
      accent: '#3d9ca8',
      tagline: 'Listen To Weekly Episodes',
      buttons: [
        { text: 'Subscribe Now', icon: '→', color: '#3d9ca8' }
      ]
    },
    {
      id: 9,
      title: 'Photography',
      mainImage: '/photography-main.jpg',
      accent: '#212121',
      tagline: 'Capturing Moments That Last Forever',
      description: 'Professional photography services for weddings, events, portraits, and commercial projects.',
      buttons: [
        { text: 'View Gallery', icon: '→', color: '#212121' }
      ]
    }
  ];

  return (
    <div className="template-gallery-container">
      <header className="gallery-header">
        <h1>All templates</h1>
        <div className="underline"></div>
      </header>
      
      <div className="templates-grid">
        {templates.map((template) => (
          <div key={template.id} className="template-card">
            <div className="template-preview">
              {template.mainImage && (
                <div className="template-main-image" style={{ backgroundColor: template.accent }}>
                  {template.logo && <div className="template-logo-container">
                    <div className="template-logo" style={{ backgroundImage: `url(${template.logo})` }}></div>
                  </div>}
                  
                  {template.tagline && <h2 className="template-tagline">{template.tagline}</h2>}
                </div>
              )}
              
              {template.buttons && template.buttons.map((button, index) => (
                <button 
                  key={index} 
                  className="template-button"
                  style={{ backgroundColor: button.color }}
                >
                  {button.text} <span className="button-icon">{button.icon}</span>
                </button>
              ))}
              
              {template.secondaryImage && (
                <div className="template-secondary-image"></div>
              )}
              
              {template.description && (
                <p className="template-description">{template.description}</p>
              )}
            </div>
            
            <h3 className="template-title">{template.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;