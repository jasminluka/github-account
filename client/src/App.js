import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import UserProfile from './components/UserProfile';
import Login from './components/Login';

const App = () => {
  let params = {};
  new URLSearchParams(window.location.search).forEach((value, key) => {
    params[key] = value;
  });

  const { access_token } = params;

  if (access_token) {
    localStorage.setItem('accessToken', access_token);
  }

  return (
    <Router>
      <div className="App">
        <div className="container">
          <Route exact path='/' component={Login} />
          <Route exact path='/user' component={UserProfile} />
        </div>
      </div>
    </Router>
  );
}

export default App;