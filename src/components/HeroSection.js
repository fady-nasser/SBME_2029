import React from 'react';
import heartbeatLine from './Vector 1.png';
const HeroSection = () => {
  return (
    <div className="section hero-section" data-section="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Hi! <p className="wave"><img src="https://emojiisland.com/cdn/shop/products/Waving_Hand_Sign_Emoji_Icon_ios10_grande.png?v=1571606113" alt="Waving hand" /></p>
        </h1>
        <div className="hero-subtitle">We Are The <span className="year-highlight">2029</span> Class of</div>
        <div className="department-line">Systems and Biomedical Engineering</div>
        <div className="university-line">of Cairo University</div>
        
        <div className="image-gallery">
          <div className="gallery-image"></div>
          <div className="gallery-image"></div>
          <div className="gallery-image"></div>
          <div className="heartbeat-container">
            <img src={heartbeatLine} alt="Heartbeat line" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;