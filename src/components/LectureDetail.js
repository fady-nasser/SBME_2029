import React from "react";

function LectureDetail({ lecture, onBack }) {
  
  const resource = lecture.DriveFolderLink

  return (
    <div className="lecture-detail">
      <button onClick={onBack}>← Back</button>
      <h2>
        {lecture.Subject} - {lecture.LectureTitle}
      </h2>
      <p>
        Chapter: {lecture.Chapter} | Lecture {lecture.Lecture}
      </p>
      <p>Reference: {lecture.ReferenceSection}</p>

      {/* Video */}
      {lecture.VideoLink && (
        <div className="video-container">
          <iframe
            width="300"
            height="315"
            src={lecture.VideoLink}
            title={lecture.LectureTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Resources */}
      <h3 style={{marginTop:'10px'}}>PDFs and more</h3>


            <a href={resource} target="_blank" rel="noreferrer">
              Drive &gt;
            </a>

    </div>
  );
}

export default LectureDetail;
