import React from "react";

// always check if any div with the study-card class is clicked, add to him a class of clicked
// const handleCardClick = (event) => {
//   const cards = document.querySelectorAll(".study-card");
//   cards.forEach((card) => card.classList.remove("clicked"));
//   event.currentTarget.classList.add("clicked");
// };

function LectureList({ mode, lectures, onSelectLecture }) {
  if (mode === "subject") {
    // Group by subject
    const subjects = {};
    lectures.forEach((lec) => {
      if (!subjects[lec.Subject]) subjects[lec.Subject] = [];
      subjects[lec.Subject].push(lec);
    });

    return (
      <div className="study-cards">

        {Object.keys(subjects).map((code) => (
          <div onClick={(e)=> e.currentTarget.classList.toggle("clicked")} key={code} className="study-card">
            <h3>{subjects[code][0].Subject}</h3>
            {subjects[code].map((lec, idx) => (
              <div
                key={idx}
                className="lecture-card"
                onClick={() => onSelectLecture(lec)}
              >
                <p>
                  Chapter {lec.Chapter} - Lecture {lec.Lecture}: {lec.LectureTitle}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // By week
  if (mode === "week") {
    const weeks = {};
    lectures.forEach((lec) => {
      if (!weeks[lec.Week]) weeks[lec.Week] = [];
      weeks[lec.Week].push(lec);
    });

    return (
      <div className="study-cards">
        {Object.keys(weeks).map((week) => (
          <div onClick={(e)=> e.currentTarget.classList.toggle("clicked")} key={week} className="study-card">
            <h3>Week {weeks[week][0].Week}</h3>
            {weeks[week].map((lec, idx) => (
              <div
                key={idx}
                className="lecture-card"
                onClick={() => onSelectLecture(lec)}
              >
                <p>
                  {lec.Subject} - Lecture {lec.Lecture}:{" "}
                  {lec.LectureTitle}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default LectureList;
