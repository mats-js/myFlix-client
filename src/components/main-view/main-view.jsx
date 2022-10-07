import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './main-view.scss';

import NavBar from '../navbar/navbar';
import RegistrationView from '../registration-view/registration-view';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';

import { Row, Col, Nav } from 'react-bootstrap';
export default class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null,
    };
  }

  /* When a user successfully logs in, this function updates the
     `user` property in state to that *particular user */
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // DELETE ???
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null,
    });
  }

  getMovies(token) {
    axios
      .get('https://mats-js-myflixdb.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({
          movies: res.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <NavBar user={user} />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
       the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              return movies.map((m) => (
                <Col md={6} lg={3} key={m._id} className="movie-card">
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />
          <Route
            path={`/users/${user}`}
            render={({ history }) => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
       the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <ProfileView
                    movies={movies}
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path={`/user-update/${user}`}
            render={({ history }) => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
       the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              if (!user) return <Redirect to="/" />;
              return (
                <Col>
                  <UpdateView
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
       the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8} className="movie-view">
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/directors/:name"
            render={({ match, history }) => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
       the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            path="/genres/:name"
            render={({ match, history }) => {
              /* If there is no user, the LoginView is rendered. If there is a user logged in, 
       the user details are passed as a prop to the LoginView */
              if (!user)
                return (
                  <Col>
                    <LoginView
                      movies={movies}
                      onLoggedIn={(user) => this.onLoggedIn(user)}
                    />
                  </Col>
                );
              // Before the movies have been loaded
              if (movies.length === 0) return <div className="main-view" />;

              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find((m) => m.Genre.Name === match.params.name)
                        .Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}

MainView.propTypes = {};
