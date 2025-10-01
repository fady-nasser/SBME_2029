import React from "react";
import { useLocation } from "react-router-dom";
import HeaderStudent from "./headerStudent";
import LectureDetail from "./LectureDetail";
import useCachedCSV from "./utils/useCachedCSV";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Papa from "papaparse";
function LecturePage() {
const { search } = useLocation();
const query = new URLSearchParams(search);
const subject = query.get("sub");
const lecture = query.get("lec");
const [lectures, setLectures] = useState([]);
const [selectedLectures, setSelectedLectures] = useState([]);
const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    Papa.parse("https://docs.google.com/spreadsheets/d/1WpPBtUuLbCDnhFoH5XlbweLnOV0A7DmXcqYrVaF9c1s/export?format=csv", {
      download: true,
      header: true,
      complete: (result) => {
        setLectures(result.data);
        setLoading(false);
      },
      
    });
  }, []);
// const filtered = (data || []).filter((lec) => (lec.Subject === subject && lec.Lecture === lecture));
  const navigate = useNavigate();
  const filtered = (lectures || []).filter((lec) => (lec.Subject.toLowerCase() === subject.toLowerCase() && lec.Lecture === lecture));
console.log((lectures || []).filter((lec) => (lec.Subject === "Medical physics" && lec.Lecture === "3")));
    useEffect(() => {
    setSelectedLectures(filtered[0]);
  }, [loading]);
    return (
        <>
        <HeaderStudent />
        {loading?(<p>Loading...</p>):(
          selectedLectures?(<LectureDetail lecture={selectedLectures} onBack={() =>navigate('/exams')} />):(<p></p>)
        )}

        
        </>
        
    )
}

export default LecturePage;