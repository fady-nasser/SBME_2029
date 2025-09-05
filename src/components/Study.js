import React, { useEffect, useState } from "react";
import { loadCSV } from "./utils/fetchCSV";
import { splitLinks } from "./utils/parseHelpers";

function Study() {
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    async function fetchLectures() {
      const data = await loadCSV("/SBME_2029/data/lectures.csv");
      setLectures(data);
    }
    fetchLectures();
  }, []);

  return (
    <div>
      <h2>Study Materials</h2>
      {lectures.map((lec, idx) => (
        <div key={idx} className="lecture-card">
          <h3>
            {lec.subject_code} Lecture {lec.number} ({lec.type})
          </h3>
          {lec.youtube_link && (
            <iframe
              width="560"
              height="315"
              src={lec.youtube_link}
              title="YouTube lecture"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          )}
          {splitLinks(lec.drive_links).map((link, i) => (
            <a key={i} href={link} target="_blank" rel="noreferrer">
              Resource {i + 1}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Study;
