import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
export default class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      registered: true,
    };
  }

  /* When a movie is clicked, this function is invoked and updates 
     the state of the `selectedMovie` *property to that movie */
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  toRegister(registered) {
    this.setState({
      registered,
    });
  }

  /* When a user successfully logs in, this function updates the
     `user` property in state to that *particular user */
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    // If user clicks on Register button on login view, open registration view
    if (!registered)
      return (
        <RegistrationView
          onBackClick={(registered) => this.toRegister(registered)}
        />
      );

    /* If there is no user, the LoginView is rendered. If there is a user logged in, 
       the user details are passed as a prop to the LoginView */
    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          toRegister={(registered) => this.toRegister(registered)}
        />
      );

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {/* If the state of `selectedMovie` is not null, that selected movie will
            be returned otherwise, all *movies will be returned */}
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }

  componentDidMount() {
    axios
      .get('https://mats-js-myflixdb.herokuapp.com/movies')
      .then((res) => {
        this.setState({
          movies: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

MainView.propTypes = {};
