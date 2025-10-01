import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const goToStudent = () => {
    navigate('/student');
  };
  document.documentElement.style.setProperty("--theme-color", "#800080");
  return (
    
    <div className="header landing">

      <div className="nav">
        {/* make the spans interactive when clicked it scrolls to a section in the page */}
        <span onClick={() => window.scrollTo({ top: document.querySelector('.achievements-section').offsetTop, behavior: 'smooth' })}><i className='fa-solid fa-trophy'></i> Achievements</span>
        <span onClick={() => window.scrollTo({ top: document.querySelector('.class-section').offsetTop, behavior: 'smooth' })}><i className='fa-solid fa-users-rectangle'></i>Class</span>
        <span onClick={() => window.scrollTo({ top: document.querySelector('.memories-section').offsetTop, behavior: 'smooth' })}><i className='fa-solid fa-camera-retro'></i>Story</span>
      </div>
      <div className="student-badge" onClick={goToStudent}>I'm A Student</div>
    </div>
  );
};

export default Header;