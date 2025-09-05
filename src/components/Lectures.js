import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const Lectures = () => {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    Papa.parse("/data/lectures.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setLectures(result.data);
      },
    });
  }, []);

  return (
    <div>
      {lectures.map((lec, index) => (
        <div key={index} style={{ border: "1px solid gray", margin: "5px", padding: "10px" }}>
          <h4>{lec.Title} ({lec.Type})</h4>
          <p>Subject: {lec.SubjectCode}</p>
          <p>
            {lec.Date} — {lec.StartTime} to {lec.EndTime}
          </p>
          <p>
            Resources:{" "}
            {lec.Links.split(",").map((link, i) => (
              <a key={i} href={link} target="_blank" rel="noreferrer">[Link {i + 1}] </a>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Lectures;
