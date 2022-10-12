import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Card } from 'react-bootstrap';

import './registration-view.scss';
export default function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be 5 or more characters');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be 6 or more characters');
      isReq = false;
    }
    if (!email) {
      setEmailErr('Email required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Email must be a valid email address');
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://mats-js-myflixdb.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((res) => {
          const data = res.data;
          alert('Registration successful! Please login.');
          window.open('/', '_self');
        })
        .catch((e) => {
          console.error(e);
          alert('Unable to register :(');
        });
    }
  };

  return (
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
            {usernameErr && <p>{usernameErr}</p>}
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
              placeholder="Your password must be 6 or more characters"
              minLength="6"
              required
            />
            {passwordErr && <p>{passwordErr}</p>}
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
            {emailErr && <p>{emailErr}</p>}
          </Form.Group>
          <Form.Group controlId="formGroupBirthday">
            <Form.Label>Date of birth:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              placeholder="Enter your birthday"
            />
            {birthdayErr && <p>{birthdayErr}</p>}
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
  );
}

RegistrationView.propTypes = {};
