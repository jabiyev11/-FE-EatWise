import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useAuth } from "../context/AuthContext.jsx";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to EatWise 👋
      </Typography>
      <Paper sx={{ p: 2 }}>
        <Typography variant="body1">
          Hi {user?.firstName || "there"}! Use the navigation bar to:
        </Typography>
        <Typography sx={{ mt: 1 }}>
          • Complete your profile so we can tailor your nutrition plan.
        </Typography>
        <Typography>
          • Generate a new diet plan for a given number of days.
        </Typography>
        <Typography>
          • View your previously generated plans and manage them.
        </Typography>
      </Paper>
    </Box>
  );
};

export default HomePage;
