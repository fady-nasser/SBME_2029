import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import Marquee from "./Marquee";
import useCachedCSV from "./utils/useCachedCSV";
import { useNavigate } from 'react-router-dom';


const Exams = () => {
  const [exams, setExams] = useState([]);
    const navigate = useNavigate();
  
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // local testing Papa.parse("/SBME_2029/data/Exams.csv", {
  //   setLoading(true);
  //   Papa.parse("https://docs.google.com/spreadsheets/d/17dGZZBqY3ce5I6VzNeSXBN0FPqIs38pp2mdt1sbHQPo/export?format=csv", {
  //     download: true,
  //     header: true,
  //     complete: (result) => {
  //       setExams(result.data);
  //       setLoading(false);
  //     },
  //   });
  // }, []);

    const CSV_URL = "https://docs.google.com/spreadsheets/d/17dGZZBqY3ce5I6VzNeSXBN0FPqIs38pp2mdt1sbHQPo/export?format=csv"
    const { data, loading, error, lastUpdated } = useCachedCSV(CSV_URL, {
      cacheKey: "exams",
    });

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
          {/* <Marquee text="EXAMS" /> */}
    <div style={{marginTop:"20px", display: "flex", alignItems: "center", flexDirection: "column"}}>
    <br/>
    {data?(
            <div className="task-list">
      {loading ? (
        <div>Loading...</div>
      ) : (
        data.map((exam, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
            }}
            className="announcement"
          >
            <h3>{exam.SubjectCode} {exam.Title}</h3>
            <p>{new Date(exam.Date).toDateString()} — {exam.StartTime}</p>
            <p>Duration: {exam.Duration}</p>
            <p style={{display: "inline"}}>
              <span>Covers lectures:</span>{" "}
              {(exam.CoveredLectures ? exam.CoveredLectures.split(",") : []).map((lec, i, arr) => (
                <span key={i}>
                  <a style={{color: "blue", textDecoration: "underline", cursor:"pointer"}} onClick={() => navigate("/lectures?sub="+ exam.SubjectCode+"&lec=" +  lec.substring(3))} target="_blank" rel="noreferrer">{lec}</a>
                  {i < arr.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p>{exam.Hall}</p>
            <br/>
            <p style={{display: "inline"}}>
              Resources:{" "}
              {(exam.ResourcesLinks ? exam.ResourcesLinks.split(",") : []).map((link, i, arr) => (
                <span key={i}>
                  <a href={link} target="_blank" rel="noreferrer">PDF {i + 1}</a>
                  {i < arr.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <br/>
            <br/>
            <p className="countdown">{getCountdown(exam.Date)}</p>
          </div>
        )))}
      </div>
    ):(!loading && <p>No data found</p>
      )}
                  {loading && !data && <p>Loading...</p>}
    {error && !data && <p>Error: {error}</p>}
    {lastUpdated && (
      <p style={{fontSize: "14px", color: "#ccc"}}>Last Update: {new Date(lastUpdated).toLocaleString()}</p>
    )}



        </div>
    <br />
    <br />
    </div>
  );
};

export default Exams;
