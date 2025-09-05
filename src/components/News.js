import React, { useEffect, useState } from "react";
import Papa from "papaparse"; // library for parsing CSV
import Marquee from "./Marquee";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    Papa.parse("/SBME_2029/data/News.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setNews(result.data);
      },
    });
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <Marquee text="NEWS" />
      <br />
      <div className="task-list">
        {news.map((item, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default News;
