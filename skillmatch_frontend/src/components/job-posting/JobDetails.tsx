import React from "react";

import Grid from "@mui/material/Unstable_Grid2";
import usePosting from "../../hooks/usePosting";
import { Job } from "../../hooks/usePosting";
import { useParams } from "react-router";
import { styled } from "@mui/material/styles";
import { Container, Paper, Typography } from "@mui/material";
import useApplicationsByJob from "../../hooks/useApplicationsByJob";

const JobDetails = () => {
  const { jobId } = useParams();
  const { job } = usePosting(jobId as string);
  const { applications } = useApplicationsByJob(jobId as string);

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid xs={5}>
            <Typography variant="h5">{job?.title}</Typography>
            <Typography variant="h5">{job?.type}</Typography>
            <Typography variant="h6">{job?.location}</Typography>
            {/* <Typography variant="h6">{job?.department}</Typography> */}
            <Typography variant="h6">{job?.experience}</Typography>
          </Grid>
          <Grid xs={7} textAlign={"right"}>
            <Typography variant="h5">APPLICATIONS</Typography>
            <Typography variant="h6">
              {applications?.length} applicants
            </Typography>
            <Typography variant="h6">
              Posting date: {job?.datePosted}
            </Typography>
            <Typography variant="h6">Deadline date: {job?.deadline}</Typography>
            {/* <Typography variant="h6">{job?.department}</Typography> */}
            <Typography variant="h6">{job?.experience}</Typography>
          </Grid>
          <Grid xs={12}>
            <Typography variant="body1">{job?.description}</Typography>
          </Grid>
          <Grid xs={12}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default JobDetails;
