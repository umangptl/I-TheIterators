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

const drawerWidth = 240;

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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuDrawer = (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={"15px"}
      p={"10px"}
    >
      {pages.map((page) => (
        <NavButton key={page.path} href={page.path}>
          {page.title}
        </NavButton>
      ))}
      <NavButton key="/logout" href="/logout">
        Log Out
      </NavButton>
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
                justifyContent: "space-between",
              }}
            >
              {pages.map((page) => (
                <NavButton key={page.path} href={page.path}>
                  {page.title}
                </NavButton>
              ))}
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, textAlign: "right" }}>
            <NavButton key="/logout" href="/logout">
              Log Out
            </NavButton>
          </Box>
        </Toolbar>
        <Toolbar sx={{ display: { sm: "none" } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", sm: "none" }, alignItems: "center" }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }}>
            <Typography sx={{ mx: 4 }}>LOGO</Typography>
          </Box>
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
