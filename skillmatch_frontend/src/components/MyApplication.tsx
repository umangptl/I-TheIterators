import React, { useState } from "react";
import {
  TextField,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import NavBar from "./common/NavBar";
import { Application } from "../hooks/useApplicationsByJob";
import { Job } from "../models/Job";

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
      const response = await axios.get(
        `http://localhost:8081/application/applicant/${email}`
      );

      const jobsResponse = await axios.get(`http://localhost:8081/job`);

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
  return (
    <>
      <NavBar />
      <div>
        <Container sx={{ padding: 2, mt: "100px" }} maxWidth="md">
          <Typography variant="h4">Please enter you email</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p>{error}</p>}

            <Button type="submit" variant="contained" color="primary">
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
                <Card elevation={1} style={{ background: "#fafaff" }}>
                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "16px",
                    }}
                  >
                    <div>
                      <Typography variant="h5">Job ID:</Typography>
                      <Typography variant="h6">{application.jobId}</Typography>
                      <Typography variant="subtitle1">
                        Job Title: {jobs.get(application.jobId)}
                      </Typography>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <Typography variant="h5">Application ID:</Typography>
                      <Typography variant="h6">
                        {application.applicationId}
                      </Typography>
                      <Typography variant="subtitle1">
                        Status: {application.status}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          )}
        </Container>
      </div>
    </>
  );
}
