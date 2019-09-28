import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteEvent } from '../../actions/profile';

const EventItem = ({
  event: {
    _id,
    bands: { headliner, openers },
    city,
    venue,
    date
  },
  deleteEvent
}) => {
  return (
    <tr key={_id}>
      <td>{headliner}</td>
      <td>{openers}</td>
      <td>{venue}</td>
      <td>{city}</td>
      <td>{date}</td>
      <td>
        <button
          onClick={() => deleteEvent(_id)}
          className="btn btn-danger">Delete</button>
      </td>
    </tr>
  );
};

Event.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteEvent })(EventItem);
