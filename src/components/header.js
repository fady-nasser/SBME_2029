import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const goToStudent = () => {
    navigate('/student');
  };
  return (

    <div className="header">
      <div className="nav">
        <span>Achievements</span>
        <span>Class</span>
        <span>Story</span>
      </div>
      <div className="student-badge" onClick={goToStudent}>I'm A Student</div>
    </div>
  );
};

export default Header;