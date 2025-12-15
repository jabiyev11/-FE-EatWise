import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Alert,
  Stack,
  Button,
  CircularProgress,
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
  const [deletingId, setDeletingId] = useState(null);
  const [deletingAll, setDeletingAll] = useState(false);

  const navigate = useNavigate();

  /* ============================
     Load plans
  ============================ */
  const loadPlans = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await getAllPlans();
      setPlans(res.data || []);
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

  /* ============================
     Delete all plans
  ============================ */
  const handleDeleteAll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete ALL plans? This action cannot be undone."
    );
    if (!confirmed) return;

    setError("");
    setMessage("");
    setDeletingAll(true);

    try {
      await deleteAllPlans();
      setPlans([]);
      setMessage("All plans deleted.");
    } catch (err) {
      console.error(err);
      setError("Failed to delete plans.");
    } finally {
      setDeletingAll(false);
    }
  };

  /* ============================
     Delete single plan
  ============================ */
  const handleDeleteOne = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this plan?"
    );
    if (!confirmed) return;

    setError("");
    setMessage("");
    setDeletingId(id);

    try {
      await deletePlanById(id);
      setPlans((prev) => prev.filter((p) => p.id !== id));
      setMessage("Plan deleted.");
    } catch (err) {
      console.error(err);
      setError("Failed to delete plan.");
    } finally {
      setDeletingId(null);
    }
  };

  /* ============================
     Loading state
  ============================ */
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
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

      {/* Summary card */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Total plans: {plans.length}</Typography>

            {plans.length > 0 && (
              <Button
                variant="outlined"
                color="error"
                disabled={deletingAll}
                onClick={handleDeleteAll}
              >
                {deletingAll ? "Deleting..." : "Delete All"}
              </Button>
            )}
          </Stack>
        </CardContent>
      </Card>

      {/* List */}
      {plans.length === 0 ? (
        <Typography>No plans yet.</Typography>
      ) : (
        <Card>
          <CardContent>
            <List>
              {plans.map((plan) => (
                <ListItem
                  key={plan.id}
                  disablePadding
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      disabled={deletingId === plan.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteOne(plan.id);
                      }}
                    >
                      {deletingId === plan.id ? (
                        <CircularProgress size={20} />
                      ) : (
                        <DeleteIcon />
                      )}
                    </IconButton>
                  }
                >
                  <ListItemButton
                    onClick={() => navigate(`/history/${plan.id}`)}
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
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PlanHistoryPage;
