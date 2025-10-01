import React from 'react';
import heartbeatLine from './Vector 1.png';
const HeroSection = () => {

   // Countdown helper
  const getCountdown = (date) => {
    date = new Date(date);
    const now = new Date();
    
    const diff = date - now;
    if (diff <= 0) return "Expired";
    // if days more than 365, show in years, days, hours, minutes
    if (diff > 365 * 24 * 60 * 60 * 1000) {
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      return `${years}y ${days}d ${hours}h ${minutes}m left`;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m left}`;
  };
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
        <div className='hero-countdown'>
          <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#800080", fontSize: "1.5rem" }}>Graduation Countdown: </div>
          <div className="countdown" style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#800080", fontSize: "2rem" }}>{getCountdown(new Date("2029-06-01T00:00:00Z"))}</div>
        </div>
      </div>


    </div>
  );
};

export default HeroSection;