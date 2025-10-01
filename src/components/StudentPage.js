import React from "react";
import Schedule from "./Schedule";
import Announcements from "./Announcements";
import Marquee from './Marquee';
import Exams from "./Exams";
import Lectures from "./Lectures";

const StudentPage = () => {
  return (
    <div className="student-page">
      
      {/* Schedule Section */}

      <div className="section-schedule">  <h2>Today's Schedule</h2>
      <Schedule />
      <br/>
      </div>
    
            <div className="section announcements-section" data-section="announcements">
              <Marquee text="IMPORTANT" />
              <br/>
              {/* Announcements */}
              <Announcements />

            </div>
      
    </div>
  );
};

export default StudentPage;
