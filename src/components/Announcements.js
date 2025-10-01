import React, { useEffect, useState } from "react";

import Papa from "papaparse";
import useCachedCSV from "./utils/useCachedCSV";


const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   Papa.parse("https://docs.google.com/spreadsheets/d/11Eb8rNSR7mk92Ee66t0bP9WEw5xTl7Czml6JyTkPb5Y/export?format=csv", {
  //     download: true,
  //     header: true,
  //     complete: (result) => {
  //       setAnnouncements(result.data);
  //       setLoading(false);
        
  //     },
      
  //     // display "loading" in the div while fetching

  //   });
  // }, []);

  const CSV_URL = "https://docs.google.com/spreadsheets/d/11Eb8rNSR7mk92Ee66t0bP9WEw5xTl7Czml6JyTkPb5Y/export?format=csv"
  const { data, loading, error, lastUpdated } = useCachedCSV(CSV_URL, {
    cacheKey: "announcements",
  });
  return (
    <div className="announcement-list">
      {data? (
        
        data.map((a, index) => (
          <div className="announcement" key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid gray" }}>
            <p><b>{a.Timestamp}</b>{a.Message}</p>
          </div>
        ))
      
      ):(
        !loading && <p>No data found</p>
      )}
      
          {loading && !data && <p>Loading...</p>}
    {error && !data && <p>Error: {error}</p>}
    {lastUpdated && (
      <p style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0 20px 0", fontSize: "14px", color: "#ccc"}}>Last Update: {new Date(lastUpdated).toLocaleString()}</p>
    )}


    </div>
  );
};

export default Announcements;
