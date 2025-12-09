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
import { generatePlan } from "../api/planApi.js";

const PlanGeneratePage = () => {
  const [days, setDays] = useState(7);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await generatePlan(Number(days));
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate plan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Generate Diet Plan
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Days (1-30)"
              type="number"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              inputProps={{ min: 1, max: 30 }}
              sx={{ mr: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Generated Plan (raw response)
            </Typography>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                maxHeight: 400,
                overflow: "auto",
              }}
            >
              {JSON.stringify(result, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default PlanGeneratePage;
