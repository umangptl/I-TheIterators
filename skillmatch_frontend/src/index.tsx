import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const theme = createTheme({
  palette: {
    primary: {
      main: '#30343f', // Change this to your new primary color
    },
    secondary: {
      main: '#fafaff', // Change this to your new secondary color
    },
    success: {
      main: '#e4d9ff', // Change this to your new tertiary color
    }
  },
});
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
