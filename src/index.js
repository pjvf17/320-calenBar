import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  typography: {
    yearMonth: {
      fontSize: "2.5em",
      fontWeight: "600"
    },

    weekDay: {
      fontFamily: "Merriweather",
      fontSize: "1.5em",
    },

    dayNumber: {
      fontWeight: "light",
      fontSize: "1.15em",
      color: "black",
    }
  },

  grid: {
    dayDimensions: {
      height: "50px",
      width: "10px",
      textAlign:"left", 
      border:"solid"
    }
  }
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
