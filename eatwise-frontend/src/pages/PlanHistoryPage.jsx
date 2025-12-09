import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Alert,
  Stack,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import {
  getAllPlans,
  deleteAllPlans,
  deletePlanById,
} from "../api/historyApi.js";

const PlanHistoryPage = () => {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadPlans = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllPlans();
      setPlans(res.data || []); // controller returns List<PlanResponse>
    } catch (err) {
      console.error(err);
      setError("Failed to load plan history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleDeleteAll = async () => {
    setError("");
    setMessage("");
    try {
      await deleteAllPlans();
      setPlans([]);
      setMessage("All plans deleted.");
    } catch (err) {
      console.error(err);
      setError("Failed to delete plans.");
    }
  };

  const handleDeleteOne = async (id) => {
    setError("");
    setMessage("");
    try {
      await deletePlanById(id);
      setPlans((prev) => prev.filter((p) => p.id !== id));
      setMessage("Plan deleted.");
    } catch (err) {
      console.error(err);
      setError("Failed to delete plan.");
    }
  };

  if (loading) {
    return <Typography>Loading history...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Plan History
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>
              Total plans: {plans?.length ?? 0}
            </Typography>
            {plans.length > 0 && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteAll}
              >
                Delete All
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      {plans.length === 0 ? (
        <Typography>No plans yet.</Typography>
      ) : (
        <Card>
          <CardContent>
            <List>
              {plans.map((plan) => (
                <ListItemButton
                  key={plan.id}
                  onClick={() => navigate(`/history/${plan.id}`)}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteOne(plan.id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={plan.title || `Plan #${plan.id}`}
                    secondary={
                      plan.createdAt
                        ? new Date(plan.createdAt).toLocaleString()
                        : undefined
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PlanHistoryPage;
