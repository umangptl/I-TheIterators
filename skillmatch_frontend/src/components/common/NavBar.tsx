import {
  AppBar,
  Box,
  Button,
  ButtonProps,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { Link, LinkProps, useNavigate } from "react-router-dom";
import { useLoginContext } from "../../hooks/useLoginContext";
import apiClient from "../../services/api-client";

const drawerWidth = 240;

const NavButton = styled(Button)<ButtonProps & LinkProps>(({ theme }) => ({
  width: 140,
  borderRadius: 20,
}));
NavButton.defaultProps = {
  color: "secondary",
  component: Link,
};

const pages = [
  { path: "/", title: "Dashboard" },
  { path: "/new-job", title: "New Posting" },
  { path: "/jobs", title: "All Postings" },
];

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLogin, setIsLogin } = useLoginContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    apiClient
      .get("/v1/oauth/logout")
      .then((res) => {
        setIsLogin(false);
        navigate("/jobs");
      })
      .catch((err) => console.log(err));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navButtoms = () => {
    if (isLogin) {
      return (
        <>
          {pages.map((page) => (
            <NavButton key={page.path} component={Link} to={page.path}>
              {page.title}
            </NavButton>
          ))}
        </>
      );
    } else {
      const page = pages[pages.length - 1];
      return (
        <NavButton key={page.path} component={Link} to={page.path}>
          {page.title}
        </NavButton>
      );
    }
  };

  const logInOutButtom = () => {
    if (isLogin) {
      return (
        <NavButton key="/logout" onClick={handleLogout} to="/jobs">
          Log Out
        </NavButton>
      );
    } else {
      return (
        <NavButton key="/login" component={Link} to="/login">
          Log In
        </NavButton>
      );
    }
  };

  const menuDrawer = (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={"15px"}
      p={"10px"}
    >
      {navButtoms()}
      {logInOutButtom()}
    </Box>
  );

  return (
    <>
      <AppBar sx={{ zIndex: 1400 }}>
        <Toolbar sx={{ display: { xs: "none", md: "flex" } }}>
          <Box sx={{ flexGrow: 1, textAlign: "left" }}>
            <Typography sx={{ mx: 4 }}>LOGO</Typography>
          </Box>
          <Box sx={{ flexGrow: 1, textAlign: "right" }}>
            <Box>{navButtoms()}</Box>
          </Box>
          <Box
            sx={{
              flexGrow: isLogin ? 1 : 0,
              textAlign: "right",
            }}
          >
            {logInOutButtom()}
          </Box>
        </Toolbar>
        <Toolbar sx={{ display: { md: "none" } }}>
          <Box sx={{ flexGrow: 1 }} textAlign="center">
            <Typography sx={{ mx: 4 }}>LOGO</Typography>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box marginBottom={7}></Box>
      <Box sx={{ width: { md: drawerWidth } }}>
        <Drawer
          PaperProps={{
            sx: {
              backgroundColor: "#30343f",
              color: "red",
            },
          }}
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              pt: 8,
            },
          }}
        >
          {menuDrawer}
        </Drawer>
      </Box>
    </>
  );
};

export default NavBar;
