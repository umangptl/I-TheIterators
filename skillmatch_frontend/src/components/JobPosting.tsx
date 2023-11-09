import { Button } from "@mui/material";
import NavBar from "./common/NavBar";
import JobDetails from "./job-posting/JobDetails";

// Gerardo
export default function JobPosting() {
  return (
    <>
      <NavBar />
      <JobDetails />
      <Button component="a"></Button>
    </>
  );
}
