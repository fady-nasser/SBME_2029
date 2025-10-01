import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { Link } from "react-router-dom";

const CardGrid = ({ semester, mode, subject, chapter }) => {
  const [lectures, setLectures] = useState([]);

useEffect(() => {
  Papa.parse("/SBME_2029/data/lectures.csv", {
    header: true,
    download: true,
    complete: (result) => {
      setLectures(result.data);
    },
  });
}, []);

// This will run whenever lectures changes
useEffect(() => {
  console.log("Lectures state updated:", lectures);
  
}, [lectures]); // Dependency array - runs when lectures changes
  // Filter only this semester
  console.log(lectures);
  const semesterLectures = lectures.filter(
    (lec) => {
      return lec.Semester === semester;
    }
  );
  console.log(semesterLectures);


  let cards = [];
console.log(mode === "subject");
  if (mode === "weeks") {
    // Extract unique weeks
    const weeks = [...new Set(semesterLectures.map((lec) => lec.Week))];
    console.log("ahhhhhh" + weeks);
    cards = weeks.map((week) => ({
      key: week,
      text: `Week ${week}`,
      link: `/weeks/${semester}/${week}`,
    }));
  } else if (mode === "subject") {
    // Extract unique subjects
    const subjects = [...new Set(semesterLectures.map((lec) => lec.SubjectName))];
    cards = subjects.map((subj) => ({
      key: subj,
      text: subj,
      link: `/subjects/${semester}/${subj}`,
    }));
  } else if (mode === "chapters" && subject) {
    // Extract chapters for this subject
    const chapters = [
      ...new Set(
        semesterLectures
          .filter((lec) => lec.Subject === subject)
          .map((lec) => lec.Chapter)
      ),
    ];
    cards = chapters.map((ch) => ({
      key: ch,
      text: `Chapter ${ch}`,
      link: `/subjects/${semester}/${subject}/${ch}`,
    }));
  } else if (mode === "lectures") {
    // Case: lectures inside a week OR inside a chapter
    let filtered = semesterLectures;

    if (subject) {
      filtered = filtered.filter((lec) => lec.Subject === subject);
    }
    if (chapter) {
      filtered = filtered.filter((lec) => lec.Chapter === chapter);
    }

    cards = filtered.map((lec, idx) => ({
      key: idx,
      text: `${lec.LectureTitle} (${lec.Subject})`,
      link: `/lectures/${semester}/${lec.Subject}/${lec.Chapter}/${lec.LectureTitle}`,
    }));
  }

  return (
    <div>
      <h2>{mode.toUpperCase()}</h2>
      <div className="grid">
        {cards.map((card) => (
            // change page using window
          <Link to={card.link} key={card.key} className="card">
            {card.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CardGrid;
