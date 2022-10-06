import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import './movie-card.scss';
export default class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card bg="dark" text="light">
        <Card.Img
          variant="top"
          crossOrigin="anonymous | use-credentials"
          src={movie.ImagePath}
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button
            className="button-movie-card"
            variant="secondary"
            onClick={() => {
              onMovieClick(movie);
            }}
          >
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
