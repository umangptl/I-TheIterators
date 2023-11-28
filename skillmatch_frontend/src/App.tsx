import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./components/Dashboard";
import AllJobs from "./components/AllJobs";
import Login from "./components/Login";
import CreatePosting from "./components/CreatePosting";
import JobPosting from "./components/JobPosting";

import JobApplication from "./components/JobApplication";
import { LoginContext } from "./hooks/useLoginContext";
import EditPosting from "./components/EditPosting";
import ScrollToTop from "./components/common/ScrollToTop";
import ApplicantInfo from "./components/ApplicantInfo";
import axios from "axios";
import Confirmation from "./components/Confirmation";
import MyApplication from "./components/MyApplication";
import JobApplicants from "./components/JobApplicants";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const loginContextValue = { isLogin: isLogin, setIsLogin: setIsLogin };

  useEffect(() => {
    const initLogin = async () => {
      axios
        .get("http://localhost:8081/v1/oauth/keepalive", {
          withCredentials: true,
        })
        .then(() => setIsLogin(true))
        .catch((err) => console.log(err));
    };
    initLogin();
  }, []);
  return (
      <>
          <LoginContext.Provider value={loginContextValue}>
              <Router>
                  <ScrollToTop />
                  <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/jobs" element={<AllJobs />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/job/:jobId" element={<JobPosting />} />
                      <Route path="/new-job" element={<CreatePosting />} />
                      <Route
                          path="/my-applications"
                          element={<MyApplication />}
                      />
                      <Route
                          path="/edit-job/:jobId"
                          element={<EditPosting />}
                      />
                      <Route
                          path="/applicants/:jobId"
                          element={<JobApplicants />}
                      />
                      <Route path="/applicants" element={<JobApplicants />} />
                      <Route
                          path="/applicant/:applicantId"
                          element={<ApplicantInfo />}
                      />
                      <Route
                          path="/apply/:jobId"
                          element={<JobApplication />}
                      />
                      <Route
                          path="/confirmation/:message"
                          element={<Confirmation />}
                      />
                  </Routes>
              </Router>
          </LoginContext.Provider>
      </>
  );
}

export default App;
