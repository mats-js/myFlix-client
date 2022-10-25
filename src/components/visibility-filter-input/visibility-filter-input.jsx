import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Form } from 'react-bootstrap';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return (
    <Form.Control
      onChange={(e) => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="Filter movies by name"
    />
  );
}

VisibilityFilterInput.propTypes = {
  setFilter: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};

export default connect(null, { setFilter })(VisibilityFilterInput);
