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
  borderRadius: 100,
}));
NavButton.defaultProps = {
  variant: "contained",
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
        <Toolbar sx={{ display: { xs: "none", sm: "flex" } }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ mx: 4 }}>LOGO</Typography>
          </Box>
          <Box sx={{ flexGrow: 2, textAlign: "right" }}>
            <Box
              sx={{
                maxWidth: "550px",
                mx: "auto",
                display: "flex",
                justifyContent: isLogin ? "space-between" : "end",
              }}
            >
              {navButtoms()}
            </Box>
          </Box>
          <Box
            sx={{
              minWidth: "160px",
              flexGrow: isLogin ? 1 : 0,
              textAlign: "right",
            }}
          >
            {logInOutButtom()}
          </Box>
        </Toolbar>
        <Toolbar sx={{ display: { sm: "none" } }}>
          <Box sx={{ flexGrow: 1 }} textAlign="center">
            <Typography sx={{ mx: 4 }}>LOGO</Typography>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box marginBottom={7}></Box>
      <Box sx={{ width: { sm: drawerWidth } }}>
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(!mobileOpen)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
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
