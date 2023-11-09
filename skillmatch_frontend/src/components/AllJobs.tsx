import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import JobList from "./all-jobs/JobList";
import NavBar from "./common/NavBar";
import { useLoginContext } from "../hooks/useLoginContext";

const AllJobs = () => {
  const { isLogin, setIsLogin } = useLoginContext();
  const navigate = useNavigate();
  console.log(isLogin);

  useEffect(() => {
    console.log(isLogin);
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  return (
    <>
      <NavBar />
      <JobList />
    </>
  );
};

export default AllJobs;
