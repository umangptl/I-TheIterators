import React, { useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./components/Dashboard";
import AllJobs from "./components/AllJobs";
import JobApplication from "./components/JobApplication";
import JobPosting from "./components/JobPosting";
import Login from "./components/Login";
import EditPosting from "./components/EditPosting";

function App() {
  const [token, setToken] = useState(); // user token
  return (
    <div>
      <Router>
        <nav className="flex items-center justify-between flex-wrap">
          <Link className="bg-blue" to="/">
            Home
          </Link>
          <Link to="/jobs">Jobs</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jobs" element={<AllJobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/job" element={<Dashboard />} />
          {/* <Route path="/new-job" element={<JobLists />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
