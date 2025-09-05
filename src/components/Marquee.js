import React from 'react';

const Marquee = ({ text }) => {
  const repeatedText = Array(50).fill(text).join(' – ');
  
  return (
    <div className="marquee">
      <div className="marquee-content">
        {repeatedText}
      </div>
      <div className="marquee-content">
        {repeatedText}
      </div>
    </div>
  );
};

export default Marquee;