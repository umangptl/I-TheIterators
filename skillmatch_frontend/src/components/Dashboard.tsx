import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../hooks/useLoginContext";
import {
  Container,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import TotalPipelineChart from "./charts/TotalPipelineChart";
import SpecificApplicationSankeyChart from "./charts/SpecificApplicationSankeyChart";
import NavBar from "./common/NavBar";
import { useApplicationsContext } from "../hooks/ApplicationsContext";
import { useJobsContext } from "../hooks/JobsContext";
import { useApplicantsContext } from "../hooks/ApplicantsContext";
import SpecificJobTimeLeftChart from "./charts/SpecificJobTimeLeftChart";
import GetJobName from "./common/GetJobName";
import { Link } from "react-router-dom";
import ApplicantTable from "./charts/ApplicantTable";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isLogin, setIsLogin } = useLoginContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  const { jobs } = useJobsContext();
  const { applicants } = useApplicantsContext();
  const { applications } = useApplicationsContext();

  const openApps = useMemo(
    () => applications?.filter((app) => app.status === "PENDING").length || 0,
    [applications]
  );
  const interviewing = useMemo(
    () =>
      applications?.filter(
        (application) => application.status === "INTERVIEWING"
      ).length || 0,
    [applications]
  );
  const shortListed = useMemo(
    () =>
      applications?.filter(
        (application) => application.status === "SHORTLISTED"
      ).length || 0,
    [applications]
  );
  const offersSent = useMemo(
    () =>
      applications?.filter((application) => application.status === "SELECTED")
        .length || 0,
    [applications]
  );

  const [selectedJob, setSelectedJob] = useState("-1");
  const handleJobDropdownChange = useCallback((e: any) => {
    e.preventDefault();
    setSelectedJob(e.target.value);
  }, []);

  const [selectedStatus, setSelectedStatus] = useState("-1");
  const handleStatusDropdownChange = useCallback((e: any) => {
    e.preventDefault();
    setSelectedStatus(e.target.value);
  }, []);

  useEffect(() => {
    if (
      applications?.length > 0 &&
      jobs?.length > 0 &&
      applicants?.length > 0
    ) {
      setIsLoading(false);
    }
  }, [applications, jobs, applicants]);

  // const userName

  if (isLoading) {
    return (
      <>
        <NavBar />
        <Container maxWidth="lg" style={{ marginTop: "8em" }}>
          <Skeleton variant="rectangular" width={210} height={118} />
        </Container>
      </>
    );
  } else {
    return (
      <>
        <NavBar />
        <Container maxWidth="xl" style={{ marginTop: "3em" }}>
          <h1>Dashboard</h1>
          <p style={{ fontWeight: 300, fontSize: 20 }}>Welcome back!</p>
          <Divider />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Grid item xs={12}>
                <p style={{ fontWeight: 500, marginTop: "1em" }}>Filters:</p>
                <FormControl fullWidth>
                  <Select
                    style={{ width: "100%" }}
                    id="job-dropdown-select"
                    value={selectedJob}
                    onChange={handleJobDropdownChange}
                  >
                    <MenuItem value={"-1"} selected>
                      All Jobs
                    </MenuItem>
                    {jobs.map((job, key) => (
                      <MenuItem value={job.jobId} key={key}>
                        {job.title} - {job.location}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth style={{ marginTop: "1em" }}>
                  <Select
                    style={{ width: "100%" }}
                    id="status-dropdown-select"
                    value={selectedStatus}
                    onChange={handleStatusDropdownChange}
                  >
                    <MenuItem value={"-1"} selected>
                      All Statuses
                    </MenuItem>
                    <MenuItem value={"PENDING"}>Application Pending</MenuItem>
                    <MenuItem value={"INTERVIEWING"}>Interviewing</MenuItem>
                    <MenuItem value={"SHORTLISTED"}>Shortlisted</MenuItem>
                    <MenuItem value={"SELECTED"}>Selected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item xs={7}>
              <Paper elevation={3} style={{ marginTop: "1em", padding: "1em" }}>
                <h3 style={{ marginTop: "0.25em" }}>
                  Sankey Graph{" "}
                  {selectedJob != "-1" ? (
                    <>
                      <GetJobName jobId={selectedJob} />
                      <Link
                        style={{
                          float: "right",
                          fontWeight: 300,
                          textDecoration: "none",
                        }}
                        to={"/job/" + selectedJob}
                      >
                        Go to Job
                      </Link>
                    </>
                  ) : (
                    <span> For All Applications</span>
                  )}
                </h3>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <div
                      style={{
                        width: "112%",
                      }}
                    >
                      {selectedJob != "-1" ? (
                        <div style={{ height: "4em", width: "88%" }}>
                          <SpecificJobTimeLeftChart jobId={selectedJob} />
                        </div>
                      ) : null}

                      <div style={{ height: "25em" }}>
                        <SpecificApplicationSankeyChart jobID={selectedJob} />
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
              <Paper
                elevation={3}
                style={{
                  marginTop: "1em",
                  padding: "1em",
                  marginBottom: "5em",
                }}
              >
                <h3>
                  Applicants{" "}
                  {selectedJob != "-1" ? (
                    <GetJobName jobId={selectedJob} />
                  ) : null}
                </h3>
                <Divider />
                <br />
                <ApplicantTable
                  jobId={selectedJob}
                  statusSelected={selectedStatus}
                />
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper
                elevation={3}
                style={{
                  marginTop: "1em",
                  padding: "1em",
                  paddingBottom: "0.5em",
                }}
              >
                <h3 style={{ marginTop: "0.25em" }}>All Jobs Pipeline</h3>
                <p>
                  <b>Applications Pending: </b> {openApps}
                </p>
                <p>
                  <b>Interviewing: </b> {interviewing}
                </p>
                <p>
                  <b>Shortlisted: </b> {shortListed}
                </p>
                <p>
                  <b>Offers Sent: </b> {offersSent}
                </p>
                <div style={{ height: 219 }}>
                  <TotalPipelineChart
                    openApps={openApps}
                    interviewing={interviewing}
                    shortListed={shortListed}
                    offersSent={offersSent}
                  />
                </div>
              </Paper>
              <Paper
                elevation={3}
                style={{
                  padding: "1em",
                  paddingBottom: "0.5em",
                  marginTop: "1em",
                }}
              >
                <p style={{ marginTop: "0.5em" }}>
                  <span style={{ fontWeight: 600 }}>Open Positions: </span>
                  {jobs.length}
                </p>
                <p style={{ marginTop: "0.5em" }}>
                  <span style={{ fontWeight: 600 }}>Total Applicants: </span>
                  {openApps + interviewing + shortListed + offersSent}
                </p>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
};
export default Dashboard;
