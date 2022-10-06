import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Form, Button } from 'react-bootstrap';

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
    <Container className="login-container">
      <Card bg="dark" text="light" className="login-card">
        <Card.Header className="text-center" as="h5">
          Login
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group
              className="login-form-group-username"
              controlId="formUsername"
            >
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="form-group-password"
              controlId="formPassword"
            >
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              className="button-login-view"
              variant="secondary"
              type="submit"
              onClick={handleSubmit}
            >
              Log in
            </Button>
            <Button
              className="button-login-view"
              variant="secondary"
              type="submit"
              onClick={handleRegisterClick}
            >
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  toRegister: PropTypes.func.isRequired,
};
