import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderStudent = () => {
  const [color, setColor] = useState(localStorage.getItem("theme-color") || '#800080');

  const navigate = useNavigate();

  const goToGuest = () => {
    navigate('/');
  };
  useEffect(() => {
    document.documentElement.style.setProperty("--theme-color", color);
    localStorage.setItem("theme-color", color);
  },[color]);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  }

  return (
    <div className="header">
      <div className="nav">
        <span onClick={() => navigate('/')} style={(window.location.hash === '' || window.location.hash === '#/') ? { color: "var(--theme-color)", fontWeight: "bold" } : {}}><i className='fa-solid fa-house'></i> Home</span>
        
        <span onClick={() => navigate('/study')} style={window.location.hash === "#/study" ? { color: "var(--theme-color)", fontWeight: "bold" } : {}}><i className='fa-solid fa-book'></i>Study</span>
        <span onClick={() => navigate('/tasks')} style={window.location.hash === "#/tasks" ? { color: "var(--theme-color)", fontWeight: "bold" } : {}}><i className='fa-solid fa-list'></i>Tasks</span>

        <span onClick={() => navigate('/exams')} style={window.location.hash === "#/exams" ? { color: "var(--theme-color)", fontWeight: "bold" } : {}}><i className='fa-solid fa-file-circle-question'></i>Exams</span>
        <span onClick={() => navigate('/news')} style={window.location.hash === "#/news" ? { color: "var(--theme-color)", fontWeight: "bold" } : {}}><i className='fa-solid fa-newspaper'></i> News</span>
      </div>
      <div className="left-nav">
        <input type='color' value={color} onChange={handleColorChange}></input>
        {/* <div className="student-badge" onClick={goToGuest} style={{visibility: "hidden"}}>I'm A Guest</div> */}
      </div>
      
      <div className="add-btn" style={window.location.hash.includes("#/lectures") ? { display: "none"} : {}}>
        {/* create 4 cases according to which page are we in the add btn would change the ref link */}
        <a  href={window.location.hash === '#/tasks' ? 'https://forms.gle/FgVjGMRHV41pK26V8' :
          window.location.hash === '#/exams' ? 'https://forms.gle/8xXr1eYGYEQa6W596' :
          window.location.hash === '#/news' ? 'https://forms.gle/hmU4VdxGnSqLCEDs7' :
          (window.location.hash === '' || window.location.hash === '#/') ? 'https://forms.gle/FA8i688GTiZw2qat8' :
          window.location.hash === '#/study' ? 'https://forms.gle/Ls6fzPz22ATmwVUy7' :
          ''

          
        }
        
        target="_blank" rel="noreferrer">
          +
        </a>
      </div>
    </div>

    
  );
};

export default HeaderStudent;