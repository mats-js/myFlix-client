import React from 'react';
import axios from 'axios';

import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

// Import posters from local (DELETE LATER!!!)
import posterInception from '/inception.jpg';
import posterShawshank from '/shawshank.jpg';
import posterGladiator from '/gladiator.jpg';

export default class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
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
