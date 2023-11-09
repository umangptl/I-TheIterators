import React, { useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import usePosting from "../../hooks/usePosting";
import { useParams } from "react-router";
import { Alert, AlertTitle, Container, Typography } from "@mui/material";
import useApplicationsByJob from "../../hooks/useApplicationsByJob";
import ActionButton from "../common/ActionButton";

const JobDetails = () => {
  const { jobId } = useParams();
  const { job } = usePosting(jobId as string);
  const { applications } = useApplicationsByJob(jobId as string);
  const [alert, setAlert] = useState(false);

  if (job === null) {
    return <></>;
  }

  const handleEdit = (title: string) => setAlert(true);
  const handleDelete = (title: string) => setAlert(true);
  const handleShowApplications = (title: string) => setAlert(true);

  let postingDate: string;
  if (typeof job?.datePosted !== "undefined") {
    const date = new Date(job.datePosted);
    postingDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  } else {
    postingDate = "00/00/0000";
  }

  let deadlineDate: string;
  if (typeof job?.datePosted !== "undefined") {
    const date = new Date(job.deadline);
    deadlineDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  } else {
    deadlineDate = "00/00/0000";
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={2}>
        <Grid xs={5}>
          <Typography variant="h4">{job?.title}</Typography>
          <Typography variant="h6">{job?.type}</Typography>
          <Typography variant="h6">{job?.location}</Typography>
          {/* <Typography variant="h6">{job?.department}</Typography> */}
          <Typography variant="h6">{job?.experience}</Typography>
        </Grid>
        <Grid xs={7} textAlign={"right"}>
          <Typography variant="h4">Applications</Typography>
          <Typography variant="h6">
            {applications?.length} applicants
          </Typography>
          <Typography variant="h6">Posting date: {postingDate}</Typography>
          <Typography variant="h6">Deadline date: {deadlineDate}</Typography>
          {/* <Typography variant="h6">{job?.department}</Typography> */}
          <Typography variant="h6">{job?.experience}</Typography>
        </Grid>
        <Grid xs={7}>
          <ActionButton
            onClick={() => handleEdit(job?.title as string)}
            sx={{ ml: 0 }}
          >
            Edit posting
          </ActionButton>
          <ActionButton onClick={() => handleDelete(job?.title as string)}>
            Delete posting
          </ActionButton>
        </Grid>
        <Grid xs={5} textAlign={"right"}>
          <ActionButton
            onClick={() => handleShowApplications(job?.title as string)}
          >
            View Applications
          </ActionButton>
        </Grid>
        <Grid xs={12}>
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
          <Typography variant="body1">{job?.description}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobDetails;
