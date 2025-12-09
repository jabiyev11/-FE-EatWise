import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { registerRequest } from "../api/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";

const RegisterPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await registerRequest(form);
      const rest = res.data; // RestResponse<AuthResponse>
      if (!rest?.data?.accessToken) {
        // if backend doesn't auto-login on register,
        // you can instead redirect to /login here
        throw new Error("No accessToken in response");
      }
      login(rest.data);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center">
      <Card sx={{ mt: 6, width: 450 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              fullWidth
              margin="normal"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              margin="normal"
              value={form.lastName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={form.password}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </Button>
          </Box>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <RouterLink to="/login">Login</RouterLink>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;
