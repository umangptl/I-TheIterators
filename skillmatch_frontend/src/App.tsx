import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./components/Dashboard";
import AllJobs from "./components/AllJobs";
import Login from "./components/Login";
import CreatePosting from "./components/CreatePosting";
import JobPosting from "./components/JobPosting";
import axios from "axios";
import { LoginContext } from "./hooks/useLoginContext";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const loginContextValue = { isLogin: isLogin, setIsLogin: setIsLogin };

  useEffect(() => {
    const initLogin = async () => {
      axios
        .get("http://localhost:8081/v1/oauth/keepalive", {
          withCredentials: true,
        })
        .then((res) => setIsLogin(true))
        .catch((err) => console.log(err));
    };
    initLogin();
  }, []);
  return (
    <>
      <LoginContext.Provider value={loginContextValue}>
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
            <Route path="/job/:jobId" element={<JobPosting />} />
            <Route path="/new-job" element={<CreatePosting />} />
          </Routes>
        </Router>
      </LoginContext.Provider>
    </>
  );
}

export default App;
