import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";

const ErrorMessage = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h4">This page doesn't exist.</Typography>
    </Box>
  );
};

export default ErrorMessage;
