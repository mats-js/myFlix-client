import React from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Button, Card } from 'react-bootstrap';

import './movie-view.scss';
export default class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card bg="dark" text="light">
        <Card.Header className="text-center" as="h5">
          {movie.Title}
        </Card.Header>
        <Card.Body>
          <CardGroup>
            <Card bg="dark" border="dark" text="light">
              <Card.Body className="movie-textarea">
                <span className="movie-description">{movie.Description}</span>
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
              </Card.Body>
            </Card>
            <Card bg="dark" border="dark" text="light">
              <Card.Img
                className="movie-poster"
                as="img"
                crossOrigin="anonymous | use-credentials"
                src={movie.ImagePath}
              />
            </Card>
          </CardGroup>
        </Card.Body>
        <Card.Footer className="text-right">
          <Button
            className="button-movie-view"
            variant="secondary"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </Card.Footer>
      </Card>
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
