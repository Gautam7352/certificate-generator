import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const CertificateGenerator = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    courseName: '',
    templateName: 'default'
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/certificates/generate`, formData);
      const certificateId = response.data._id;
      
      // Trigger certificate download
      window.open(`${API_URL}/certificates/download/${certificateId}`, '_blank');
      
      setSnackbar({
        open: true,
        message: 'Certificate generated successfully!',
        severity: 'success'
      });
      
      // Reset form
      setFormData({
        recipientName: '',
        courseName: '',
        templateName: 'default'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error generating certificate. Please try again.',
        severity: 'error'
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom align="center">
        Certificate Generator
      </Typography>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Recipient Name"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Course Name"
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Generate Certificate
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CertificateGenerator;
