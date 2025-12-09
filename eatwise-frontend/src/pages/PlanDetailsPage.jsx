import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Alert,
  Button,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { getPlanById } from "../api/historyApi.js";

const PlanDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPlan = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getPlanById(id);
      setPlan(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load plan details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlan();
  }, [id]);

  if (loading) {
    return <Typography>Loading plan...</Typography>;
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    );
  }

  if (!plan) {
    return (
      <Box>
        <Typography>No plan found.</Typography>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {plan.title || `Plan #${plan.id}`}
          </Typography>
          {plan.createdAt && (
            <Typography variant="body2" sx={{ mb: 2 }}>
              Created: {new Date(plan.createdAt).toLocaleString()}
            </Typography>
          )}
          <Typography
            component="div"
            sx={{ whiteSpace: "pre-wrap" }}
          >
            {plan.content}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlanDetailsPage;
