import React, { useEffect, useState } from "react";
import Papa from "papaparse"; // library for parsing CSV
import Marquee from "./Marquee";
import useCachedCSV from "./utils/useCachedCSV";

const News = () => {
  const [news, setNews] = useState([]);
    // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   // local testing Papa.parse("/SBME_2029/data/News.csv", {
  //   setLoading(true);
  //   Papa.parse("https://docs.google.com/spreadsheets/d/1ArapLmZiBnMqJii5Uw-Bhl92SlWuBw34zTHcVaAhF40/export?format=csv", {
  //     download: true,
  //     header: true,
  //     complete: (result) => {
  //       setNews(result.data);
  //       setLoading(false);
  //     },
  //   });
  // }, []);
  const CSV_URL = "https://docs.google.com/spreadsheets/d/1ArapLmZiBnMqJii5Uw-Bhl92SlWuBw34zTHcVaAhF40/export?format=csv"
  const { data, loading, error, lastUpdated } = useCachedCSV(CSV_URL, {
    cacheKey: "news",
  });

  return (
    <div style={{ marginTop: "20px" }}>
      {/* <Marquee text="NEWS" /> */}
      <br />

      <div className="task-list">
        {data? (
                
        data.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
            }}
            className="announcement"
          >
            <h3>{item.Title}</h3>
            <p>{new Date(item.Date).toDateString()}</p>
            <br />
 
            <a href={item.Link} target="_blank" rel="noreferrer">More &gt;</a>
          </div>
        ))
        ):(
          !loading && <p>No data found</p>
        )}

                  {loading && !data && <p>Loading...</p>}
    {error && !data && <p>Error: {error}</p>}
    {lastUpdated && (
      <p style={{fontSize: "14px", color: "#ccc"}}>Last Update: {new Date(lastUpdated).toLocaleString()}</p>
    )}

      </div>
    </div>
  );
};

export default News;
