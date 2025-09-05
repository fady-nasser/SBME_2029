import React from 'react';
import Marquee from './Marquee';

const AchievementsSection = () => {
  return (
    <div className="section achievements-section" data-section="achievements">
      <Marquee text="ACHIEVEMENTS" />
      
      <div className="achievements-content">
        <div className="achievement-item">
          <div className="achievement-image"></div>
          <div className="achievement-text">1ST PLACE WINNER IN _____</div>
          <div className="achievement-date">5 Oct 2028</div>
          <div className="achievement-students">Students: X, Y, Z</div>
        </div>
        
        <div className="achievement-item">
          <div className="achievement-image"></div>
          <div className="achievement-text">1ST PLACE WINNER IN _____</div>
          <div className="achievement-date">5 Oct 2028</div>
          <div className="achievement-students">Students: X, Y, Z</div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;