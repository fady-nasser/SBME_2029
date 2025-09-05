// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";  // important for GitHub Pages
// import App from "./App";
// import "./styles/App.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <BrowserRouter basename="/SBME_2029"> 
//     {/* basename must match repo name for GitHub Pages */}
//     <App />
//   </BrowserRouter>
// );

// filepath: c:\Users\User\sbme_2029\src\index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./styles/App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// import React from "react";
// import { createRoot } from "react-dom/client"; // 👈 new import
// import App from "./App";

// const container = document.getElementById("root");
// const root = createRoot(container); // 👈 create root
// root.render(<App />);

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./components/Home";
// import Announcements from "./components/Announcements";
// import Schedule from "./components/Schedule";
// import Exams from "./components/Exams";

// function App() {
//   return (
//     <Router basename="/SBME_2029"> {/* 👈 important for GitHub Pages */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/announcements" element={<Announcements />} />
//         <Route path="/schedule" element={<Schedule />} />
//         <Route path="/exams" element={<Exams />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


