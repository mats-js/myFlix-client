import React from 'react';
import PropTypes from 'prop-types';
import './movie-view.scss';
export default class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img
            crossOrigin="anonymous | use-credentials"
            src={movie.ImagePath}
          />
        </div>
        <div className="movie-title">
          <span className="label"></span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre-title">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
        </div>
        <div className="movie-genre-description">
          <span className="label">Genre description: </span>
          <span className="value">{movie.Genre.Description}</span>
        </div>
        <div className="movie-actors">
          <span className="label">Actors: </span>
          <span className="value">{movie.Actors}</span>
        </div>
        <div className="movie-director-name">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="movie-director-bio">
          <span className="label">Director biography: </span>
          <span className="value">{movie.Director.Bio}</span>
        </div>
        <div className="movie-director-birth">
          <span className="label">Director birth: </span>
          <span className="value">{movie.Director.Birth}</span>
        </div>
        <div className="movie-director-death">
          <span className="label">Director death: </span>
          <span className="value">{movie.Director.Death}</span>
        </div>
        <button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Actors: PropTypes.array.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
