import React from 'react';
import Marquee from './Marquee';

const ClassSection = () => {
  // This would typically come from a data file or API
  const students = Array(60).fill({
    name: "Full Name",
    headline: "Interested in ....",
    links: {
      linkedin: "#",
      github: "#",
      cv: "#"
    }
  });

  return (
    <div className="section class-section" data-section="class">
      <Marquee text="CLASS" />
      
      <div className="class-content">
        <div className="student-cards-container">
          {students.map((student, index) => (
            <div key={index} className="student-card">
              <div className="student-info">
                <div className="student-name">{student.name}</div>
                <div className="student-headline">{student.headline}</div>
                <div className="student-links">
                  <a href={student.links.linkedin} className="student-link">LinkedIn &gt;</a>
                  <a href={student.links.github} className="student-link">GitHub &gt;</a>
                  <a href={student.links.cv} className="student-link">CV &gt;</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassSection;