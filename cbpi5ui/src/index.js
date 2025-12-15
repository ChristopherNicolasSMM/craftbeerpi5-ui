import CustomThemeProvider from './theme';
import pink from '@mui/material/colors/pink';
import React from 'react';
import ReactDOM from 'react-dom';
import CraftBeerPiApp from './App';
import { AlertProvider } from './components/alert/AlertProvider';
import { CBPiProvider } from './components/data';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-72473288-2');
ReactGA.pageview(window.location.pathname + window.location.search);

console.log("%cCraftBeerPi 5.0 🍻", "color:#8efa00; background:#000; font-size: 30pt");
console.log("%cCreated with ♥️ by Manuel Fritsch", "color:#8efa00; background:#000; font-size: 10pt");
ReactDOM.render(
  <React.StrictMode>
    <CustomThemeProvider initialMode={'dark'}>
    <AlertProvider>
    <CBPiProvider>
     
    
      <CraftBeerPiApp />
     
    
    </CBPiProvider>
    </AlertProvider>
    </CustomThemeProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
