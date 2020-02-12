import React, { useState } from 'react';
import { USER_DETAILS } from '../constants/userDetails';

export const SignIn = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');


  const handleLogin = (e) => {
    e.preventDefault();
    if (username === process.env.REACT_APP_USERNAME && password === process.env.REACT_APP_PASSWORD) {
      localStorage.setItem('authorize', true);
      props.isLoginSuccess(true)
    }
    setPassword('');
    setUsername('');
    setErrorMsg(`Sorry Buddy! I can't let you log in.`)
  }

  return (
    <div className="login-form">
      <form onSubmit={handleLogin}>
        <div className="username-section">
          <label className="username-section">Username:</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className="password-section">
          <label className="username-section">Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="login-button">
          <button className="btn btn-primary" type="submit">Login</button>
        </div>
        <p className="error-msg">{errorMsg}</p>
      </form>
    </div>
  )
}