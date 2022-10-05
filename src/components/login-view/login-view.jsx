import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './login-view.scss';

export default function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    props.toRegister();
  };

  return (
    <form>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Log in
      </button>
      <button type="button" onClick={handleRegisterClick}>
        Register
      </button>
    </form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  toRegister: PropTypes.func.isRequired,
};
