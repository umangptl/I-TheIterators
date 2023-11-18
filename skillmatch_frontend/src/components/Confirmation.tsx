import { useParams } from "react-router-dom";
import LinkButton from "./common/LinkButton";
import NavBar from "./common/NavBar";
import { Paper, Typography, Container } from "@mui/material";

export default function Confirmation() {
  const { message } = useParams();
  return (
    <>
      <NavBar />
      <Container
        maxWidth="lg"
        sx={{ mt: "5%", padding: "8px" }}
        className="App"
      >
        <Paper
          elevation={2}
          sx={{ padding: "32px", background: "#fafaff" }}
          className="App-paper"
        >
          <Typography variant="h4" gutterBottom>
            Job Application Confirmation
          </Typography>
          <Typography variant="body1">
            {message}
          </Typography>
          <LinkButton size="large" sx={{ mt: "24px" }} to={"/jobs"}>
            Back to Jobs
          </LinkButton>
        </Paper>
      </Container>
    </>
  );
}
