import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import './style.css';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";

render(
  <BrowserRouter>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
