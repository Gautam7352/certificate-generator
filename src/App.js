import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import CertificateGenerator from './components/CertificateGenerator';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <CertificateGenerator />
      </Container>
    </ThemeProvider>
  );
}

export default App;
