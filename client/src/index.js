import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GlobalProvider } from "./GlobalProvider";
import reducer, { initialState } from "./reducer";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider initialState={initialState} reducer={reducer}>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
