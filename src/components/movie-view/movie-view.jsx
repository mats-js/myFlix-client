import React from 'react';
import PropTypes from 'prop-types';
import { CardGroup, Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

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
                <div className="movie-genre-link">
                  <span className="label">Genre: </span>
                  <Link to={`/genres/${movie.Genre.Name}`}>
                    <Button variant="link">{movie.Genre.Name}</Button>
                  </Link>
                  <div className="movie-director-link">
                    <span className="label">Director: </span>
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <Button variant="link">{movie.Director.Name}</Button>
                    </Link>
                  </div>
                </div>
                <span className="movie-description">{movie.Description}</span>
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
              onBackClick();
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
