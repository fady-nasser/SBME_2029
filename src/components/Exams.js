import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const Exams = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    Papa.parse("/data/exams.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setExams(result.data);
      },
    });
  }, []);

  return (
    <div>
      {exams.map((exam, index) => (
        <div key={index} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ccc" }}>
          <h4>{exam.SubjectCode} Exam</h4>
          <p>
            {exam.Date} — {exam.StartTime} to {exam.EndTime}
          </p>
          <p><b>Covers lectures:</b> {exam.Covers}</p>
          <p>
            Resources:{" "}
            {exam.Links.split(",").map((link, i) => (
              <a key={i} href={link} target="_blank" rel="noreferrer">[Link {i + 1}] </a>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Exams;
