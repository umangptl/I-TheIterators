import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";

import Dashboard from "./components/Dashboard";
import AllJobs from "./components/AllJobs";
import Login from "./components/Login";
import JobPosting from "./components/JobPosting";
import axios from "axios";
import JobApplication from "./components/JobApplication";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const initLogin = async () => {
      axios
      .get("http://localhost:8081/v1/oauth/keepalive", { withCredentials: true })
      .then((res) => setIsLogin(true))
      .catch((err) => console.log(err));
    };
    initLogin();
  }, []);
  return (
    <div>
      <Router>
        <nav className="flex items-center justify-between flex-wrap">
          <Link className="bg-blue" to="/" state={{isLogin:isLogin}}>
            Home
          </Link>
          <Link to="/jobs" state={{isLogin:isLogin}}>Jobs</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard isLogin={isLogin}/>} />
          <Route path="/jobs" element={<AllJobs isLogin={isLogin}/>} />
          <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>} />
          <Route path="/job" element={<JobPosting />} />
          <Route path="/apply" element={<JobApplication />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
