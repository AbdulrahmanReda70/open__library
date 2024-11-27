import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';

// Set the path to the worker

const root = createRoot(document.getElementById('root'));
const theme = createTheme();
// Set up the worker to intercept requests

root.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);

