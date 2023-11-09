import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import JobList from "./all-jobs/JobList";
import NavBar from "./common/NavBar";

const AllJobs: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, []);

  return (
    <>
      <NavBar />
      <JobList />
    </>
  );
};

export default AllJobs;
