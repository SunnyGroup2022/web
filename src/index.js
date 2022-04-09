import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Auth0Provider} from '@auth0/auth0-react';
import App from './components/App';
import Login from './components/Login';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import Auth0Callback from './components/Auth0Callback';
import VerifyEmail from './components/VerifyEmail';

ReactDOM.render(
    <Auth0Provider
      domain="dev-o-49rumg.us.auth0.com"
      clientId="U5nDnyL1JvFFWLw31gszEjybJNbGQLMX"
      redirectUri="https://master.d20xh16a3gn56c.amplifyapp.com/auth0callback"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="auth0callback" element={<Auth0Callback />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="changePassword" element={<ChangePassword />} />
          <Route path="verifyEmail" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
