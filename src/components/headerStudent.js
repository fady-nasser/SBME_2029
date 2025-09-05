import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderStudent = () => {
  const navigate = useNavigate();

  const goToGuest = () => {
    navigate('/');
  };

  return (
    <div className="header">
      <div className="nav">
        <span onClick={() => navigate('/student')}>Home</span>
                <span onClick={() => navigate('/study')}>Study</span>
        <span onClick={() => navigate('/tasks')}>Tasks</span>

        <span onClick={() => navigate('/exams')}>Exams</span>
        <span onClick={() => navigate('/news')}>News</span>
      </div>
      <div className="student-badge" onClick={goToGuest}>I'm A Guest</div>
    </div>
  );
};

export default HeaderStudent;