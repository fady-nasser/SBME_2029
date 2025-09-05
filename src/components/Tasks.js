// src/Tasks.js
import React, { useEffect, useState } from "react";
import Papa from "papaparse"; // library for parsing CSV
import Marquee from "./Marquee";
function Tasks() {
  const [tasks, setTasks] = useState([]);

  // Load CSV
  useEffect(() => {
    fetch("/SBME_2029/data/tasks.csv")
      .then((response) => response.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true });
        let taskData = parsed.data.map((task) => ({
          title: task.title,
          subject: task.subject,
          dueDate: new Date(task.dueDate),
          detailsLink: task.detailsLink,
        }));

        // Sort by due date
        taskData = taskData.sort((a, b) => a.dueDate - b.dueDate);
        setTasks(taskData);
      });
  }, []);

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

  return (
    <div style={{marginTop:"20px"}}>
    <Marquee text="TASKS" />
    <br/>
      
      <div className="task-list">
    
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
      </div>
    
    </div>
  );
}

export default Tasks;
