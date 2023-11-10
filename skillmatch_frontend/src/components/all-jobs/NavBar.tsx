import {
  AppBar,
  Box,
  Button,
  ButtonProps,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

const NavButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: 140,
  borderRadius: 20,
}));
NavButton.defaultProps = {
  color: "secondary",
};

const pages = [
  { path: "/", title: "Dashboard" },
  { path: "/new-job", title: "New Posting" },
  { path: "/jobs", title: "All Postings" },
];

const handleLogout = () => {
  axios
    .get("http://localhost:8081/v1/oauth/logout", { withCredentials: true })
    .then((res) => (window.location.href = "/login"))
    .catch((err) => console.log(err));
};

const NavBar = () => {
  return (
    <AppBar>
      <Container>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, textAlign: "center" }}>
            <Typography>LOGO</Typography>
          </Box>
          <Box sx={{ flexGrow: 1, textAlign: "right" }}>
            <Box>
              {pages.map((page) => (
                <NavButton key={page.path} href={page.path}>
                  {page.title}
                </NavButton>
              ))}
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, textAlign: "right" }}>
            <NavButton key="/logout" onClick={handleLogout}>
              Log Out
            </NavButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
