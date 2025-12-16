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
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);
    try {
      const res = await registerRequest(form);
      const rest = res.data;
      if (!rest?.data?.accessToken) {
        throw new Error("No accessToken in response");
      }
      login(rest.data);
      navigate("/");
    } catch (err) {
      console.error(err);
      
      if (err.response && err.response.data) {
        const data = err.response.data;
        
        if (data.errors) {
          setFieldErrors(data.errors);
          setError("Please fix the validation errors below.");
        } else {
          setError(data.message || "Registration failed.");
        }
      } else {
        setError("Registration failed. Please try again later.");
      }
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
              error={!!fieldErrors.firstName}
              helperText={fieldErrors.firstName}
            />
            <TextField
              label="Last Name"
              name="lastName"
              fullWidth
              margin="normal"
              value={form.lastName}
              onChange={handleChange}
              required
              error={!!fieldErrors.lastName}
              helperText={fieldErrors.lastName}
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
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
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
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
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