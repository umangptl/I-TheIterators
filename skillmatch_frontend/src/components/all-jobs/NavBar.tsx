import {
  AppBar,
  Box,
  Button,
  ButtonProps,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";

const NavButton = styled(Button)<ButtonProps>(({ theme }) => ({
  width: 140,
  borderRadius: 100,
}));
NavButton.defaultProps = {
  variant: "contained",
  color: "secondary",
};

const pages = [
  { path: "/", title: "Dashboard" },
  { path: "/new-job", title: "New Posting" },
  { path: "/jobs", title: "All Postings" },
];

const NavBar = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ mx: 4 }}>LOGO</Typography>
          </Box>
          <Box sx={{ flexGrow: 2, textAlign: "right" }}>
            <Box
              sx={{
                maxWidth: "550px",
                mx: "auto",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {pages.map((page) => (
                <NavButton key={page.path} component={Link} to={page.path}>
                  {page.title}
                </NavButton>
              ))}
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, textAlign: "right" }}>
            <NavButton key="/logout" component={Link} to="/logout">
              Log Out
            </NavButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: "80px" }}></Box>
    </>
  );
};

export default NavBar;
