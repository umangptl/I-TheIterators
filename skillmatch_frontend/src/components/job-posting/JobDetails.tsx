import { useState } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import usePosting from "../../hooks/usePosting";
import { useParams } from "react-router";
import {
  Alert,
  AlertTitle,
  Button,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import useApplicationsByJob from "../../hooks/useApplicationsByJob";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/system";
import { useLoginContext } from "../../hooks/useLoginContext";
import LinkButton from "../common/LinkButton";

const JobDetails = () => {
  const { jobId } = useParams();
  const { job } = usePosting(jobId as string);
  const { applications } = useApplicationsByJob(jobId as string);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const { isLogin } = useLoginContext();

  if (job === undefined) {
    return <></>;
  }

  const handleDelete = (jobId: string) => {
    apiClient
      .delete("/job/" + jobId)
      .then(() => navigate("/jobs"))
      .catch((err) => {});
  };

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
    <Container maxWidth="md" sx={{padding: 4, background: "#fafaff"}}>
      <Grid container spacing={2}>
        {/* {!isLogin && (
          <Grid xs={12}>
            <Typography variant="h4">{job.title}</Typography>
          </Grid>
        )} */}
        <Grid xs={isLogin ? 7 : 12}>
          <Typography variant="h4">{job.title}</Typography>
          <Typography variant="h6">{job.type}</Typography>
          <Typography variant="h6">{job.location}</Typography>
          {/* <Typography variant="h6">{job?.department}</Typography> */}
          <Typography variant="h6">Experience: {job.experience}</Typography>
        </Grid>
        {isLogin && (
          <Grid xs={5} textAlign={"right"}>
            <Typography variant="h4">Applications</Typography>
            <Typography variant="h6">
              {applications?.length} applicants
            </Typography>
            <Typography variant="h6">Posting date: {postingDate}</Typography>
            <Typography variant="h6">Deadline date: {deadlineDate}</Typography>
            {/* <Typography variant="h6">{job?.department}</Typography> */}
          </Grid>
        )}
        <Grid xs={12} mb={"8px"}>
          <Typography variant="h6">Skills required</Typography>
          {job.skillsRequired.map((skill) => (
            <Chip
              key={skill}
              clickable={false}
              label={skill}
              variant="outlined"
              sx={{ mr: "4px" }}
              size="small"
            ></Chip>
          ))}
        </Grid>
        <Grid xs={7}>
          {isLogin && (
            <Stack direction="row" spacing={2}>
              <LinkButton to={"/edit-job/" + job.jobId}>
                Edit posting
              </LinkButton>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(job.jobId)}
              >
                Delete posting
              </Button>
            </Stack>
          )}
          {!isLogin && (
            <LinkButton to={"/apply/" + job.jobId}>Apply Now</LinkButton>
          )}
        </Grid>

        <Grid xs={5} textAlign={"right"}>
          {isLogin && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleShowApplications(job.jobId)}
            >
              View Applications
            </Button>
          )}
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
          <Typography sx={{ py: 2 }} variant="body1" textAlign="justify">
            {job.description}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobDetails;
