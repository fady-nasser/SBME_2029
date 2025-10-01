import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import LectureList from "./LectureList";
import LectureDetail from "./LectureDetail";
import Marquee from "./Marquee";
import useCachedCSV from "./utils/useCachedCSV";
function Study() {
  const [lectures, setLectures] = useState([]);
  const [semester, setSemester] = useState("3");
  const [mode, setMode] = useState("subject"); // "subject" | "week"
  const [selectedLecture, setSelectedLecture] = useState(null);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   Papa.parse("https://docs.google.com/spreadsheets/d/1WpPBtUuLbCDnhFoH5XlbweLnOV0A7DmXcqYrVaF9c1s/export?format=csv", {
  //     download: true,
  //     header: true,
  //     complete: (result) => {
  //       setLectures(result.data);
  //       setLoading(false);
  //     },
      
  //   });
  // }, []);
      const CSV_URL = "https://docs.google.com/spreadsheets/d/1WpPBtUuLbCDnhFoH5XlbweLnOV0A7DmXcqYrVaF9c1s/export?format=csv"
      const { data, loading, error, lastUpdated } = useCachedCSV(CSV_URL, {
        cacheKey: "study",
      });
  //when mode changes alert
  // useEffect(() => {
  //   console.log("Mode changed to:", mode);
  // }, [mode]);
  // Filter by semester
  const filtered = (data || []).filter((lec) => lec.Semester === semester);

  return (
    <div>
      <br />
      {/* <Marquee text="STUDY" /> */}
       {/* <br />   */}
       {/* <br />  */}
          
      <div className="study-page">
      
      
      <h1>Study</h1>

      {/* Semester selector */}
      <div>
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
          <option value="5">Semester 5</option>
          <option value="6">Semester 6</option>
          <option value="7">Semester 7</option>
          <option value="8">Semester 8</option>
          <option value="9">Semester 9</option>
          <option value="10">Semester 10</option>
        </select>
      </div>
 
      {/* Mode selector */}
      <div className="mode-selector">
        <div style={mode === "subject"?{    backgroundColor: "var(--theme-color)",
    color: "white"}:{}} onClick={() => setMode("subject")}>By Subject</div>
        <div style={mode === "week"?{    backgroundColor: "var(--theme-color)",
    color: "white"}:{}} onClick={() => setMode("week")}>By Week</div>
      </div>


      {data?(
            loading ? (
        <div>Loading...</div>
      ) : (
      selectedLecture ? (
        <LectureDetail lecture={selectedLecture} onBack={() => setSelectedLecture(null)} />
      ) : (
        <LectureList
          mode={mode}
          lectures={filtered}
          onSelectLecture={(lec) => setSelectedLecture(lec)}
        />
      ))


      ):(!loading && <p>No data found</p>
      )}
    
    <br/>
    <br/>
            <div style={{display:"flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                                  {loading && !data && <p>Loading...</p>}
    {error && !data && <p>Error: {error}</p>}
    {lastUpdated && (
      <p style={{fontSize: "14px", color: "#ccc"}}>Last Update: {new Date(lastUpdated).toLocaleString()}</p>
    )}

      </div>
          <br />
    <br />
    </div>
    </div>

  );
}

export default Study;
