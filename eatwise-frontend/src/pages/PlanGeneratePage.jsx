import { useState } from 'react';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';
import { generatePlan } from '../api/planApi';

const PlanGeneratePage = () => {
  const [days, setDays] = useState(7);
  const [plan, setPlan] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await generatePlan(days);
      
      // Extract content and title from the response
      if (response.data && response.data.success) {
        setPlan(response.data.content);
        setTitle(response.data.title);
      } else {
        setError('Failed to generate plan');
      }
    } catch (err) {
      console.error('Error generating plan:', err);
      setError('Error generating plan. Please try again.');
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
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
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