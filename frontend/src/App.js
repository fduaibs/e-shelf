import React from 'react';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import './global.css';

import Routes from './routes/routes';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
