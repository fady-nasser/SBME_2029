import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Marquee from "./Marquee";

const Exams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    Papa.parse("/SBME_2029/data/Exams.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setExams(result.data);
      },
    });
  }, []);

    // Countdown helper
  const getCountdown = (date) => {
    date = new Date(date);
    const now = new Date();
    
    const diff = date - now;
    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m left`;
  };
  return (
    <div style={{ marginTop: "20px" }}>
          <Marquee text="EXAMS" />
    <br/>
      <div className="task-list">
        {exams.map((exam, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
            }}
            className="announcement"
          >
            <h3>{exam.SubjectCode} Exam</h3>
            <p>{new Date(exam.Date).toDateString()} — {exam.Time}</p>
            <p>Duration: {exam.Duration}</p>
            <p style={{display: "inline"}}>
              <span>Covers lectures:</span>{" "}
              {(exam.CoveredLectures ? exam.CoveredLectures.split(",") : []).map((lec, i, arr) => (
                <span key={i}>
                  <a href={"/lec#" + exam.SubjectCode + lec} target="_blank" rel="noreferrer">{lec}</a>
                  {i < arr.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <br/>
            <p style={{display: "inline"}}>
              Resources:{" "}
              {(exam.ResourcesLinks ? exam.ResourcesLinks.split(",") : []).map((link, i, arr) => (
                <span key={i}>
                  <a href={link} target="_blank" rel="noreferrer">Basmooga {i + 1}</a>
                  {i < arr.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <br/>
            <br/>
            <p className="countdown">{getCountdown(exam.Date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
