import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './shared/store/user.js';

export const Context = createContext(null);

ReactDOM.render(
  // <React.StrictMode>
  <Context.Provider value={{
    user: new UserStore()
  }}>
    <App />
  </Context.Provider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

reportWebVitals();