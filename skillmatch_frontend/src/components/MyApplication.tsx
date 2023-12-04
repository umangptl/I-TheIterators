import React, { useState } from "react";
import {
  TextField,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Grid,
  Paper,
  Divider,
  Chip,
  Box,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import NavBar from "./common/NavBar";
import { Application } from "../hooks/useApplicationsByJob";
import { Job } from "../models/Job";
import EmailIcon from "@mui/icons-material/Email";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { Link } from "react-router-dom";
import LinkButton from "./common/LinkButton";
import apiClient from "../services/api-client";

export default function MyApplication() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [applications, setAppplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Map<string, string>>(new Map());

  const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!isValidEmail) {
      setError("Invalid email address");
      return;
    }

    try {
      const response = await apiClient.get(`/application/applicant/${email}`);

      const jobsResponse = await apiClient.get("/job");

      setAppplications(response.data);

      setJobs(
        jobsResponse.data.reduce((map: any, job: Job) => {
          map.set(job.jobId, job.title);
          return map;
        }, new Map())
      );

      setError("");
    } catch (err) {
      console.error("API Error:", err);
      setError("Error getting applications");
    }
  };

  const getStatusIcon = (status: any) => {
    switch (status) {
      case "SELECTED":
        return <CheckCircleIcon color="primary" />;
      case "REJECTED":
        return <ErrorIcon color="error" />;
      case "PENDING":
        return <HourglassEmptyIcon color="info" />;
      case "SHORTLISTED":
        return <PlaylistAddCheckIcon color="warning" />;
      default:
        return <PlaylistAddCheckIcon color="warning" />;
    }
  };

  return (
    <>
      <NavBar />
      <div>
        <Container sx={{ padding: 2, mt: "20px" }} maxWidth="md">
          <Typography variant="h4">Please enter you email</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4} alignItems="center">
              <Grid item>
                <EmailIcon color="primary" />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            {error && <p>{error}</p>}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
        </Container>
        <Container sx={{ padding: 5 }} maxWidth="md">
          {applications.length === 0 ? (
            <Typography variant="h6">No applications found.</Typography>
          ) : (
            <Stack direction="column" spacing={3}>
              {applications.map((application) => (
                <Paper
                  elevation={3}
                  style={{ background: "#fafaff", borderRadius: 10 }}
                >
                  <CardContent>
                    <Box display="flex" flexDirection="column">
                      <Grid container>
                        <Grid item xs={8}>
                          <Typography variant="h6" color="primary">
                            {jobs.get(application.jobId)}
                          </Typography>
                          <Typography variant="body1" color="textSecondary">
                            Job ID: {application.jobId}
                          </Typography>
                        </Grid>
                        <Grid item xs={4} display="flex">
                          <Box m="auto">
                            <LinkButton
                              color="primary"
                              size="medium"
                              to={"/job/" + application.jobId}
                            >
                              {" "}
                              Go to job posting
                            </LinkButton>
                          </Box>
                        </Grid>
                      </Grid>
                      <Divider />
                      <Typography variant="subtitle1">
                        Application ID: {application.applicationId}
                      </Typography>
                      <Typography variant="subtitle1">
                        Status:{" "}
                        <Chip
                          label={application.status.toUpperCase()}
                          color="primary"
                          size="small"
                          icon={getStatusIcon(application.status)}
                        />
                      </Typography>
                    </Box>
                  </CardContent>
                </Paper>
              ))}
            </Stack>
          )}
        </Container>
      </div>
    </>
  );
}
