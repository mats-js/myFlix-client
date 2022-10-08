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
  const { movies, favorites } = props;

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be 2 or more characters');
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
    if (isReq) {
      axios
        .put(`https://mats-js-myflixdb.herokuapp.com/users/${Username}`, {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((res) => {
          const data = res.data;
          console.log(data);
          alert('Update sucessful!');
        })
        .catch((e) => {
          console.error(e);
          alert('Unable to register :(');
        });
    }
  };

  console.log(favorites + 'in ProfileView');

  return (
    <Container className="profile-container">
      <Card bg="dark" text="light" className="profile-card">
        <Card.Header className="text-center" as="h5">
          Profile
        </Card.Header>
        <Card.Body>
          <CardGroup>
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
            <Card></Card>
          </CardGroup>
          <CardGroup className="card-group-profile-mini-cards">
            {favorites.map((m) => (
              <Col
                md={6}
                lg={3}
                key={m._id}
                className="profile-movie-card-mini"
              >
                <Link to={`/movies/${m._id}`}>
                  <Card className="h-100" bg="dark" text="light">
                    <Card.Img
                      variant="top"
                      crossOrigin="anonymous | use-credentials"
                      src={m.ImagePath}
                    />
                    <Card.Body>
                      <Card.Title>{m.Title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
            ;
          </CardGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

ProfileView.propTypes = {
  favorites: PropTypes.array.isRequired,
};