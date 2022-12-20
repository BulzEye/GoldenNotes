import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { UserContextProvider } from './context/UserContext';
import { NotesContextProvider } from './context/NotesContext';
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <UserContextProvider>
        <GoogleOAuthProvider clientId='1059129047651-ooe09kqca9spa6fesepghkueo1o0399f.apps.googleusercontent.com'>
          <NotesContextProvider>
            <Router>
              <App />
            </Router>
          </NotesContextProvider>
        </GoogleOAuthProvider>
      </UserContextProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
