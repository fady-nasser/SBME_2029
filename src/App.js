import React, { useEffect } from 'react';
import ProgressBar from './components/progressBar';  
import Header from './components/header';  
import HeaderStudent from './components/headerStudent';            
import HeroSection from './components/HeroSection';
import AchievementsSection from './components/AchievementsSection';
import ClassSection from './components/ClassSection';
import MemoriesSection from './components/MemoriesSection';
import './styles/App.css';


import { Routes, Route } from "react-router-dom";


import Study from "./components/Study";
import Exams from "./components/Exams";
import Tasks from "./components/Tasks";
import Announcements from "./components/Announcements";
import StudentPage from './components/StudentPage';
import News from './components/News';
import CardGrid from './components/CardGrid';
import LectureDetail from './components/LectureDetail';
import LecturePage from './components/LecturePage';
function App() {
  // Scroll Progress Bar
  const updateProgressBar = () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.width = scrollPercent + '%';
    }
  };

  // Navigation Smooth Scroll
  const initializeNavigation = () => {
    const navItems = document.querySelectorAll('.nav span');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        const sectionName = this.textContent.toLowerCase();
        let targetSection;
        
        switch(sectionName) {
          case 'achievements':
            targetSection = document.querySelector('.achievements-section');
            break;
          case 'class':
            targetSection = document.querySelector('.class-section');
            break;
          case 'story':
            targetSection = document.querySelector('.memories-section');
            break;
          default:
            targetSection = document.querySelector('.hero-section');
        }
        
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  };

  useEffect(() => {
    // Initialize navigation after component mounts
    initializeNavigation();
    
    // Add scroll event listener
    window.addEventListener('scroll', updateProgressBar);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', updateProgressBar);
    };
  }, []);

  return (
    <div className="App" style={{ width: '100%', overflowX: 'hidden' }}>

      <Routes>
        {/* Landing page (outsiders) */}
        <Route
          path="/guest"
          element={
            <>
                    <ProgressBar />
              <Header />
              <HeroSection />
              <AchievementsSection />
              <ClassSection />
              <MemoriesSection />
            </>
          }
        />
        {/* Student-only pages */}
        <Route path="/" element={<><HeaderStudent /><StudentPage /></>} />
        <Route path="/tasks" element={<><HeaderStudent /><Tasks /></>} />
        <Route path="/study" element={<><HeaderStudent /><Study /></>} />
        <Route path="/exams" element={<><HeaderStudent /><Exams /></>} />
        <Route path="/news" element={<><HeaderStudent /><News /></>} />

        {/* Lecture details */}
        <Route path="/lectures"
               element={<LecturePage />}
        />
      </Routes>
    </div>
  );
}

export default App;


