import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./all-jobs/JobCard";

import NavBar from "./all-jobs/NavBar";
import { Alert, AlertTitle, Container, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Job } from "../models/Job";

const AllJobs: React.FC<{ isLogin: boolean }> = ({ isLogin }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (!isLogin) navigate('/login');
    axios
      .get("http://localhost:8081/job", { withCredentials: true })
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));
  }, [isLogin]);

  const handleEdit = (title: string) => setAlert(true);
  const handleDelete = (title: string) => setAlert(true);

  return (
    <div >
      <NavBar/>
      <Container sx={{padding: "2%", mt: 5}}>
        <Stack spacing={2} alignItems={"stretch"} justifyContent={"center"} sx={{px: 12}}>
          {alert && (
            <Alert
              severity="warning"
              sx={{ position: "sticky", top: 80, zIndex: "1" }}
              onClose={() => setAlert(false)}
            >
              <AlertTitle>Warning</AlertTitle>
              Not implemented yet!
            </Alert>
          )}
          {jobs.map((job) => (
            <JobCard
              job={job}
              key={job.jobId}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Stack>
      </Container>
    </div>
  );
};

export default AllJobs;
