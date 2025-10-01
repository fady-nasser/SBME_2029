// src/Tasks.js
import React, { useEffect, useState } from "react";
import Papa from "papaparse"; // library for parsing CSV
import Marquee from "./Marquee";
import useCachedCSV from "./utils/useCachedCSV";
function Tasks() {
  // const [tasks, setTasks] = useState([]);
  // const [loading, setLoading] = useState(false);

  // Load CSV
  // useEffect(() => {
  //   setLoading(true);
  //   fetch("https://docs.google.com/spreadsheets/d/1Ep5hi5ED-y5LsS6dJE5_Tw3i69SPhneHR2ZDJbtGbgA/export?format=csv")
  //     .then((response) => response.text())
  //     .then((csvText) => {
  //       const parsed = Papa.parse(csvText, { header: true });
  //       let taskData = parsed.data.map((task) => ({
  //         title: task.title,
  //         subject: task.subject,
  //         dueDate: new Date(task.dueDate),
  //         detailsLink: task.detailsLink,
          
  //       }));

  //       // Sort by due date
  //       taskData = taskData.sort((a, b) => a.dueDate - b.dueDate);
  //       setTasks(taskData);
  //       setLoading(false);
  //     });
  // }, []);
    const CSV_URL = "https://docs.google.com/spreadsheets/d/1Ep5hi5ED-y5LsS6dJE5_Tw3i69SPhneHR2ZDJbtGbgA/export?format=csv"
    const { data, loading, error, lastUpdated } = useCachedCSV(CSV_URL, {
      cacheKey: "tasks",
    });

  // Countdown helper
  const getCountdown = (dueDate) => {
    const now = new Date();
    const diff = dueDate - now;
    if (diff <= 0) return "Expired";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);

    return `${days}d ${hours}h ${minutes}m left`;
  };

  const tasks = (data || []).map((task) => ({
          title: task.title,
          subject: task.subject,
          dueDate: new Date(task.dueDate),
          detailsLink: task.detailsLink,
  })).sort((a,b) => a.dueDate-b.dueDate);

  return (
    <div style={{marginTop:"20px"}}>
      {/* <Marquee text="TASKS" /> */}
    <div style={{marginTop:"20px", display: "flex", alignItems: "center", flexDirection: "column"}}>
    
    <br/>
    {data?(<div className="task-list">
    
          {tasks.map((task, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
          }}
          className="announcement"
        >
            
          <h3>{task.title}</h3>
          <p>{task.subject}</p>
          <p> {task.dueDate.toDateString()}</p>
            <a href={task.detailsLink} target="_blank" rel="noreferrer">
            View Details &gt;
          </a>
          <br />
          <br />
          <p className="countdown">{getCountdown(task.dueDate)}</p>

        </div>
      ))}
      </div>):(
        !loading && <p>No data found</p>
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
}

export default Tasks;
