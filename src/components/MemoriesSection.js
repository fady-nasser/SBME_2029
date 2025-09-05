import React from 'react';
import Marquee from './Marquee';

const MemoriesSection = () => {
  return (
    <div className="section memories-section" data-section="memories">
      <Marquee text="MEMORIES" />
      
      <div className="memories-content">
        <div className="memory-cards-top">
          <div className="memory-card">
            <div className="memory-title">Dish Party</div>
            <div className="memory-date">25 Sep 2026</div>
            <a href="#" className="memory-link">Photos ↗</a>
          </div>
          
          <div className="memory-card">
            <div className="memory-title">Ramadan Iftar</div>
            <div className="memory-date">15 Feb 2026</div>
            <a href="#" className="memory-link">Photos ↗</a>
          </div>
        </div>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          <div className="timeline-points">
            <div className="timeline-point" data-event="1"></div>
            <div className="timeline-point" data-event="2"></div>
            <div className="timeline-point" data-event="3"></div>
            <div className="timeline-point" data-event="4"></div>
            <div className="timeline-point" data-event="5"></div>
            <div className="timeline-point" data-event="6"></div>
          </div>
        </div>
        
        <div className="memory-cards-bottom">
          <div className="memory-card">
            <div className="memory-title">Ramadan Iftar</div>
            <div className="memory-date">15 Feb 2026</div>
            <a href="#" className="memory-link">Photos ↗</a>
          </div>
          
          <div className="memory-card">
            <div className="memory-title">Ramadan Iftar</div>
            <div className="memory-date">15 Feb 2026</div>
            <a href="#" className="memory-link">Photos ↗</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoriesSection;