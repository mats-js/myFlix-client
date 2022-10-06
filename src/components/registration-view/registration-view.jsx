import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Form, Button, Card } from 'react-bootstrap';

import './registration-view.scss';
export default function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
  };

  return (
    <Container className="registration-container">
      <Card bg="dark" text="light" className="registration-card">
        <Card.Header className="text-center" as="h5">
          Register
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group
              className="registration-form-group-username"
              controlId="formGroupUsername"
            >
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </Form.Group>
            <Form.Group
              className="registration-form-group-password"
              controlId="formGroupPassword"
            >
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password must be 8 or more characters"
                minLength="8"
                required
              />
            </Form.Group>
            <Form.Group
              className="registration-form-group-email"
              controlId="formGroupEmail"
            >
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </Form.Group>
            <Form.Group controlId="formGroupBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="Enter your birthday"
                required
              />
            </Form.Group>
            <Button
              className="button-registration-view"
              variant="secondary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

RegistrationView.propTypes = {};
