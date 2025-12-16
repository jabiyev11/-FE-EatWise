import { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box, Alert } from '@mui/material';
import { generatePlan } from '../api/planApi';
import { getProfileStatus } from '../api/profileApi'; 
import { Link as RouterLink } from 'react-router-dom';

const PlanGeneratePage = () => {
  const [days, setDays] = useState(7);
  const [plan, setPlan] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setPlan('');
    setTitle('');
    
    try {
      const statusRes = await getProfileStatus();
      const hasProfile = statusRes.data && statusRes.data.data;
      if (!hasProfile) {
        setError(
          <span>
            Profile not found. Please{' '}
            <RouterLink to="/profile" style={{ color: 'inherit', fontWeight: 'bold' }}>
              create your profile
            </RouterLink>{' '}
            first to generate a diet plan.
          </span>
        );
        setLoading(false);
        return;
      }

      const response = await generatePlan(days);
      
      if (response.data && response.data.success) {
        setPlan(response.data.content);
        setTitle(response.data.title);
      } else {
        setError('Failed to generate plan.');
      }
    } catch (err) {
      console.error('Error generating plan:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error generating plan. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Generate Diet Plan
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Days"
          type="number"
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          inputProps={{ min: 1, max: 30 }}
          sx={{ mr: 2 }}
        />
        <Button 
          variant="contained" 
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'GENERATE'}
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {plan && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Typography 
            component="pre" 
            sx={{ 
              whiteSpace: 'pre-wrap',
              fontFamily: 'inherit',
              fontSize: '1rem'
            }}
          >
            {plan}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default PlanGeneratePage;