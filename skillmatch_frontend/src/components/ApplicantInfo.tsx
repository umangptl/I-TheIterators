import React, { useEffect, useState } from "react";
import {
    Avatar,
    Grid,
    Container,
    LinearProgress,
    AccordionSummary,
    Accordion,
    Typography,
    AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useApplicationsByJob from "../hooks/useApplicationsByJob";
import NavBar from "./common/NavBar";
import { useLoginContext } from "../hooks/useLoginContext";
import { useNavigate, useParams } from "react-router-dom";
import useApplicant from "../hooks/useApplicant";
import { FormControl, Select, MenuItem } from "@mui/material";
import ApplicantResume from "./job-applicants/ApplicantResume";

const ApplicantInfo = () => {
    // const { isLogin, setIsLogin } = useLoginContext();
    // const navigate = useNavigate();
    // const [alert, setAlert] = useState(false);

    // useEffect(() => {
    //     if (!isLogin) navigate("/login");
    // }, [isLogin, navigate]);

    const { applicantId } = useParams<{ applicantId: string }>();

    const { application, setApplication, applicationError } =
        useApplicant(applicantId);

    const [selectedJob, setSelectedJob] = useState("-1");

    const handleJobDropdownChange = (e: any) => {
        e.preventDefault();
        setSelectedJob(e.target.value);
    };

    console.log(application);

    return (
        <>
            <NavBar />
            <Container maxWidth="lg">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <h2>
                            {application?.applicant.firstName +
                                " " +
                                application?.applicant.lastName}{" "}
                            - {application?.status}
                        </h2>
                        <h3>
                            {application?.applicant.actualJobTitle} @{" "}
                            {application?.applicant.actualEmployer}
                        </h3>
                        <p>Address: {application?.applicant.address}</p>
                        <p>Email: {application?.applicant.email}</p>
                        <p>
                            Phone Number: {application?.applicant.phoneNumber}
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{}}
                            >
                                <Typography>Resume</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {application?.resume.data ? (
                                    <ApplicantResume
                                        base64={application?.resume.data}
                                    />
                                ) : null}
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                    <Grid item xs={12}>
                        <LinearProgress
                            sx={{
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: "#333",
                                },
                            }}
                            style={{ height: 20 }}
                            variant="determinate"
                            value={30}
                        />
                    </Grid>
                    <Grid item xs={3} />
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <Select
                                style={{ width: "100%" }}
                                id="job-dropdown-select"
                                value={selectedJob}
                                onChange={handleJobDropdownChange}
                            >
                                <MenuItem value={"-1"} selected>
                                    Select
                                </MenuItem>
                                <MenuItem value={"1"} selected>
                                    Shortlisted
                                </MenuItem>
                                <MenuItem value={"3"} selected>
                                    Send Offer
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};
export default ApplicantInfo;
