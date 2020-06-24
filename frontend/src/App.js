import React from 'react';

import './global.css';

import Routes from './routes/routes';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}

export default App;
