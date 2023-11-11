import React, { useEffect, useState } from "react";
import { Avatar, Grid, Container } from "@mui/material";
import useApplicationsByJob from "../hooks/useApplicationsByJob";

const ApplicantInfo = () => {
    return (
        <Container maxWidth="sm">
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    {/* Add from applicant data */}
                    <Avatar style={{ marginTop: "1em" }} />
                </Grid>
                <Grid item xs={10}>
                    <h1 style={{ marginLeft: "0.25em" }}>First Last</h1>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <h3>Experience</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        A magnam dolor, eveniet adipisci voluptatum veniam ipsam
                        aspernatur necessitatibus optio impedit enim, voluptates
                        velit nobis saepe. Minus numquam recusandae voluptates
                        commodi.
                    </p>
                </Grid>
                <Grid item xs={12}>
                    <h3>Education</h3>
                </Grid>
                <Grid item xs={12}>
                    <h3>Skills</h3>
                </Grid>
            </Grid>
        </Container>
    );
};
export default ApplicantInfo;
