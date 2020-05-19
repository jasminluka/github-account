import React from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  // const onLogin = () => {
  //   window.open(`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}`, 'github-oauth-authorize');
  // }

  let history = useHistory();
  const access_token = localStorage.getItem('accessToken');

  if (access_token) {
    history.push('/user');
  }

  return (
    <div className="box">
      <h2>Login with GitHub</h2>
      <a href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&scope=user,repo`}>
        Login with GitHub
      </a>
    </div>
  );
}

export default Login;