import React, { useEffect, useState } from "react";

import Papa from "papaparse";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    Papa.parse("/SBME_2029/data/announcement.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setAnnouncements(result.data);
      },
    });
  }, []);

  return (
    <div>
      {announcements.map((a, index) => (
        <div className="announcement" key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid gray" }}>
          <p><b>{a.Date}</b>{a.Message}</p>
        </div>
      ))}
    </div>
  );
};

export default Announcements;
