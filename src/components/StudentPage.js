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
              <br/>
              {/* Announcements */}
              <Announcements />

            </div>
      
      {/* Exams */}
      {/* <h2>Upcoming Exams</h2>
      <Exams /> */}

      {/* Lectures */}
      {/* <h2>Lectures</h2>
      <Lectures /> */}
    </div>
  );
};

export default StudentPage;
