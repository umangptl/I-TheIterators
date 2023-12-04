import React from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import NavBar from "./common/NavBar";
import { Link } from "react-router-dom";
import backgroundImage from "../imgs/Interview.jpg";

export default function Home() {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.6, 
            zIndex: 0,
          }}
        />
        <NavBar />
        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            marginTop: "100px",
            padding: 4,
            backgroundColor: "rgba(250,250,255, 0.8)",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to the Best Job Platform!
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            We connect top talent with the best opportunities. Your dream job is
            just a click away!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/jobs"
            sx={{ textDecoration: "none", marginTop: "20px", padding: 2, scale: "1.3" }}
          >
            Browse Jobs
          </Button>
          <Divider sx={{ marginY: 6, backgroundColor: "#fff" }} />
          <Grid container spacing={2}>
            {/* Rest of your content */}
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  backgroundColor: "#30343f",
                  padding: 4,
                  borderRadius: 8,
                  color: "white",
                }}
              >
                <Typography variant="h6">Our Values</Typography>
                <Typography variant="body1">
                    Excellence in connecting talent and opportunities.
                </Typography>
                <Typography variant="body1">
                    Commitment to diversity and inclusion.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  backgroundColor: "#30343f",
                  padding: 4,
                  borderRadius: 8,
                  color: "white",
                }}
              >
                <Typography variant="h6">Why Choose Us?</Typography>
                <Typography variant="body1">
                    Largest job database in the industry.
                </Typography>
                <Typography variant="body1">
                    User-friendly platform with advanced search features.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
