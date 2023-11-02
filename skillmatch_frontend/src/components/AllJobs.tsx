import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./all-jobs/JobCard";
import { Job } from "./all-jobs/JobCard";

import NavBar from "./all-jobs/NavBar";
import { Alert, AlertTitle, Box, Container } from "@mui/material";
import { setMaxIdleHTTPParsers } from "http";
import { blue } from "@mui/material/colors";
import zIndex from "@mui/material/styles/zIndex";

const AllJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8081/job")
      .then((res) => setJobs(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (title: string) => setAlert(true);
  const handleDelete = (title: string) => setAlert(true);

  return (
    <>
      <NavBar />
      <Container sx={{ paddingTop: "70px" }}>
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
      </Container>
    </>
  );
};

export default AllJobs;
