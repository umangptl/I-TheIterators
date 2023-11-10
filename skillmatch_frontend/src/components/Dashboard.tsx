import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../hooks/useLoginContext";
import useApplicationsByJob from "../hooks/useApplicationsByJob";

import ApplicationsOverTimeChart from "./charts/ApplicationsOverTimeChart";
import { Container, Grid, Paper } from "@mui/material";
import TotalPipelineChart from "./charts/TotalPipelineChart";
import RecruitSourcesChart from "./charts/RecruitSourcesChart";

// Alan
const Dashboard = () => {
    const { isLogin, setIsLogin } = useLoginContext();
    const hero = {
        name: "Batman",
        realName: "Bruce Wayne",
    };
    const { realName } = hero;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) navigate("/login");
    }, [isLogin]);

    const { applications, setApplications, error } =
        useApplicationsByJob("234253");

    return (
        <Container maxWidth="lg">
            <h1>Dashboard</h1>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <ApplicationsOverTimeChart />
                    <Paper
                        elevation={3}
                        style={{ padding: "1em", marginTop: "1em" }}
                    >
                        <h3 style={{ marginTop: 0 }}>Candidate Sources</h3>
                        <Grid container spacing={1}>
                            <Grid item xs={7}>
                                <p>
                                    <b>Referral: </b>2
                                </p>
                                <p>
                                    <b>Recruiter Contact: </b>2
                                </p>
                                <p>
                                    <b>Career Page: </b>3
                                </p>
                            </Grid>
                            <Grid item xs={5}>
                                <div style={{ height: 200 }}>
                                    <RecruitSourcesChart />
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
                        <h3 style={{ marginTop: 0 }}>
                            Total Prospective Applicants
                        </h3>
                        <p>7</p>
                    </Paper>
                    <Paper
                        elevation={3}
                        style={{
                            padding: "1em",
                            paddingBottom: "0.5em",
                            marginTop: "1em",
                        }}
                    >
                        <h3 style={{ marginTop: 0 }}>Total Pipeline</h3>

                        <p>
                            <b>Applications Recieved: </b>3
                        </p>
                        <p>
                            <b>Interviewing: </b>2
                        </p>
                        <p>
                            <b>Offers Sent: </b>2
                        </p>
                        <div style={{ height: 200 }}>
                            <TotalPipelineChart />
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
                        <h3 style={{ marginTop: 0 }}>Open Positions</h3>
                        <p>10</p>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};
export default Dashboard;
