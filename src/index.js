import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import ReactPixel from "react-facebook-pixel"


const options = {
  autoConfig: true,   // default
  debug: false,       // set true if testing
};
ReactPixel.init("1230238345752196", undefined, options);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
