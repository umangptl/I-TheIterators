import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./all-jobs/JobCard";
import { Job } from "./all-jobs/JobCard";

import jobPostings from "./all-jobs/example-data/jobPostings";
import NavBar from "./all-jobs/NavBar";
import { Container } from "@mui/material";

const AllJobs = () => {
  const [jobs, setJobs] = useState<Job[]>(jobPostings);

//   useEffect(() => {
//     axios
//     // .get("https://jsonplaceholder.typicode.com/users")
//       .get("http://localhost:8081/job")
//       .then((res) => console.log(res))
//       .catch((err) => console.log(err));
//   });

  const handleEdit = (title: string) =>
    console.log("Clicked edit on: " + title);
  const handleDelete = (title: string) =>
    console.log("Clicked delete on: " + title);

  return (
    <>
      <NavBar />
      <Container>
        {jobs.map((job) => (
          <JobCard
            details={job}
            key={job.title}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Container>
    </>
  );
};

export default AllJobs;
