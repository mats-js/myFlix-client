import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Container,
  Form,
  Button,
  Card,
  CardGroup,
  Col,
  Link,
} from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './profile-view.scss';
export default function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');
  const { user, favoriteMovies, removeFavorite, onBackClick } = props;

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

  const handleUpdate = (e) => {
    e.preventDefault();
    const isReq = validate();
    const token = localStorage.getItem('token');
    console.log(isReq);
    console.log(token);
    console.log(user);
    if (isReq && token !== null && user !== null) {
      axios
        .put(
          `https://mats-js-myflixdb.herokuapp.com/users/${user}`,

          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const data = res.data;
          console.log(data);
          alert('Update successful! Please log in with your new credentials');
          localStorage.clear();
          window.open('/', '_self');
        })
        .catch((e) => {
          console.error(e);
          alert('Unable to update user infos :(');
        });
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (confirm('Are you sure? This cannot be undone!')) {
      axios
        .delete(`https://mats-js-myflixdb.herokuapp.com/users/${user}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          alert(`Your account has been deleted. We're sorry to see you go!`);
          localStorage.clear();
          window.open('/', '_self');
        })
        .catch((e) => console.log(e));
    }
  };
  console.log(favoriteMovies);

  return (
    <Container className="profile-container">
      <Card bg="dark" text="light" className="profile-card">
        <Card.Header className="text-center" as="h5">
          Profile
        </Card.Header>
        <Card.Body>
          <CardGroup>
            <Card bg="dark" border="dark" text="light">
              <span className="label text-center headline-profile-update">
                Update profile information
              </span>
              <Form>
                <Form.Group
                  className="profile-form-group-username"
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
                  className="profile-form-group-password"
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
                  className="profile-form-group-email"
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
                <Form.Group
                  className="profile-form-group-birthday"
                  controlId="formGroupBirthday"
                >
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
                  className="button-profile-view-update"
                  variant="secondary"
                  type="submit"
                  onClick={handleUpdate}
                >
                  Update
                </Button>
              </Form>
              <span className="label headline-profile-mini-cards">
                My favorite movies
              </span>
            </Card>
            <Card bg="dark" border="dark" text="light">
              <span className="label text-center headline-profile-delete">
                Delete account
              </span>
              <Col>
                <Button
                  className="button button-profile-view-delete"
                  variant="danger"
                  type="submit"
                  onClick={handleDelete}
                >
                  DELETE ACCOUNT PERMANENTLY
                </Button>
              </Col>
            </Card>
          </CardGroup>
          <CardGroup className="card-group-profile-mini-cards">
            {favoriteMovies.map((m) => (
              <Col
                md={6}
                lg={3}
                key={m._id}
                className="profile-movie-card-mini"
              >
                <Card className="h-100" bg="dark" text="light">
                  <Link
                    to={`/movies/${m._id}`}
                    className="profile-movie-card-link"
                  >
                    <Card.Img
                      variant="top"
                      crossOrigin="anonymous | use-credentials"
                      src={m.ImagePath}
                    />
                    <Card.Body>
                      <Card.Title>{m.Title}</Card.Title>
                    </Card.Body>
                  </Link>
                  <Button
                    className="button-profile-view-remove-favorite"
                    variant="outline-danger"
                    size="sm"
                    type="button"
                    onClick={() => removeFavorite(m._id)}
                  >
                    Remove
                  </Button>
                </Card>
              </Col>
            ))}
          </CardGroup>
        </Card.Body>
        <Card.Footer className="text-right">
          <Button
            className="button-profile-view-back"
            variant="secondary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}

ProfileView.propTypes = {
  favoriteMovies: PropTypes.array.isRequired,
};
