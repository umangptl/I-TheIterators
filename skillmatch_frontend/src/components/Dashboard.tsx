import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../hooks/useLoginContext";

import {
    Container,
    FormControl,
    Grid,
    MenuItem,
    Paper,
    Select,
} from "@mui/material";
import TotalPipelineChart from "./charts/TotalPipelineChart";
import SpecificApplicationSankeyChart from "./charts/SpecificApplicationSankeyChart";
import NavBar from "./common/NavBar";
import useJobs from "../hooks/useJobs";
import useApplicants from "../hooks/useApplicants";
import useApplicationsByJob from "../hooks/useApplicationsByJob";

const Dashboard = () => {
    const { isLogin, setIsLogin } = useLoginContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLogin) navigate("/login");
    }, [isLogin, navigate]);

    const { jobs, setJobs, error } = useJobs();
    const { applicants, setApplicants, applicantError } = useApplicants();
    const {
        applications,
        setApplications,
        error: applicationError,
    } = useApplicationsByJob("-1");
    console.log(applications);

    let openApps = 0;
    let interviewing = 0;
    let shortListed = 0;
    let offersSent = 0;
    if (applications != null) {
        openApps = applications.filter(
            (application) => application.status == "PENDING"
        ).length;
        interviewing = applications.filter(
            (application) => application.status == "INTERVIEWING"
        ).length;
        shortListed = applications.filter(
            (application) => application.status == "SHORTLISTED"
        ).length;
        offersSent = applications.filter(
            (application) => application.status == "SELECTED"
        ).length;
    }
    console.log(jobs);
    const [selectedJob, setSelectedJob] = useState("-1");

    const handleJobDropdownChange = (e: any) => {
        e.preventDefault();
        setSelectedJob(e.target.value);
    };

    return (
        <>
            <NavBar />
            <Container maxWidth="lg" style={{ marginTop: "8em" }}>
                <h1>Dashboard</h1>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        {/* <ApplicationsOverTimeChart /> */}
                        <Paper elevation={3} style={{ padding: "1em" }}>
                            <h3 style={{ marginTop: 0 }}>
                                Application Sankey Graph
                            </h3>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <Select
                                            style={{ width: "100%" }}
                                            id="job-dropdown-select"
                                            value={selectedJob}
                                            onChange={handleJobDropdownChange}
                                        >
                                            <MenuItem value={"-1"} selected>
                                                All
                                            </MenuItem>
                                            {jobs.map((job, key) => (
                                                <MenuItem
                                                    value={job.jobId}
                                                    key={key}
                                                >
                                                    {job.title} - {job.location}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <div
                                        style={{
                                            height: "25em",
                                            width: "112%",
                                        }}
                                    >
                                        <SpecificApplicationSankeyChart
                                            jobID={selectedJob}
                                        />
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Paper
                            elevation={3}
                            style={{ padding: "1em", paddingBottom: "0.5em" }}
                        >
                            <h3 style={{ marginTop: 0 }}>Total Pipeline</h3>
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
                                <span style={{ fontWeight: 600 }}>
                                    Open Positions:{" "}
                                </span>
                                {jobs.length}
                            </p>
                            <p style={{ marginTop: "0.5em" }}>
                                <span style={{ fontWeight: 600 }}>
                                    Total Applicants:{" "}
                                </span>
                                {openApps+interviewing+shortListed+offersSent}
                            </p>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
export default Dashboard;
