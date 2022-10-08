import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import './main-view.scss';

import NavBar from '../navbar/navbar';
import RegistrationView from '../registration-view/registration-view';
import LoginView from '../login-view/login-view';
import ProfileView from '../profile-view/profile-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';

import { Row, Col } from 'react-bootstrap';
export default class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      user: null,
      favoriteMovies: [],
    };
  }

  /* When a user successfully logs in, this function updates the
     `user` property in state to that *particular user */
  onLoggedIn(authData) {
    console.log(authData);
    const { Username, FavoriteMovies } = authData.user;
    this.setState(
      {
        user: Username,
        favoriteMovies: FavoriteMovies || [],
      },
      () => {
        console.log(this.state.favoriteMovies);
      }
    );

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem(
      'favoriteMovies',
      JSON.stringify(authData.user.FavoriteMovies)
    );
    this.getMovies(authData.token);
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

  /*       handleFavorite = (movieId, action) => {
    const { user, favoriteMovies } = this.state;
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null && user !== null) {
      // Add MovieID to Favorites (local state & webserver)
      if (action === 'add') {
        this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
        axios
          .post(
            `https://top-flix.herokuapp.com/users/${username}/favorites/${movieId}`,
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie added to ${username} Favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });

        // Remove MovieID from Favorites (local state & webserver)
      } else if (action === 'remove') {
        this.setState({
          favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
        });
        axios
          .delete(
            `https://top-flix.herokuapp.com/users/${username}/favorites/${movieId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie removed from ${username} Favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });
      } 
    }
  }; */

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
        favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies')),
      });
      this.getMovies(accessToken);
    }
  }

  render() {
    const { movies, user, favoriteMovies } = this.state;
    console.log(favoriteMovies);
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
                    favorites={movies.filter((m) => {
                      return favoriteMovies.find((fav) => {
                        return fav === m.id;
                      });
                    })}
                    /* movies.filter(
                      (m) => favoriteMovies.indexOf(m._id) === -1
                    )} */
                    // handleFavorite={this.handleFavorite}
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                  {console.log(
                    favoriteMovies +
                      movies.filter((m) => {
                        return favoriteMovies.find((fav) => {
                          return fav === m.id;
                        });
                      })
                  )}
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
                    movies={movies.filter(
                      (m) => m.Director.Name === match.params.name
                    )}
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
                    movies={movies.filter(
                      (m) => m.Genre.Name === match.params.name
                    )}
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
