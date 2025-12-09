import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Optionally call /api/auth/logout too (already wired in authApi)
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          EatWise
        </Typography>

        {isAuthenticated ? (
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body2">
              {user?.firstName} {user?.lastName} ({user?.email})
            </Typography>
            <Button
              color="inherit"
              component={RouterLink}
              to="/profile"
            >
              Profile
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/plan/generate"
            >
              Generate Plan
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              to="/history"
            >
              History
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </Stack>
        ) : (
          <Stack direction="row" spacing={1}>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
