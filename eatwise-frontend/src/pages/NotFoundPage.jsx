import React from "react";
import { Box, Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        404 – Page Not Found
      </Typography>
      <Typography>
        The page you are looking for does not exist.
      </Typography>
    </Box>
  );
};

export default NotFoundPage;
