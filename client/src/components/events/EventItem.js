import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadEvents } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Event = ({ loadEvents, event: { events, loading } }) => {
  useEffect(
    () => {
      loadEvents();
    },
    [loadEvents]
  );
  const shows = events.map(ev => (
    <tr key={ev._id}>
      <td>{ev.headliner}></td>
      <td>{ev.bands}</td>
      <td>{ev.venue}</td>
      <td>{ev.city}</td>
      <td>{ev.date}</td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h2 className="my-2">Event List</h2>
      <table>
        <thead>
          <tr>
            <th>Headliner</th>
            <th>Openers</th>
            <th>Venue</th>
            <th>City</th>
            <th>Date</th>
            <th />
          </tr>
        </thead>
        <tbody>{shows}</tbody>
      </table>
    </Fragment>
  );
};

Event.propTypes = {
  event: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  event: state.events,
});

export default connect(mapStateToProps, { loadEvents })(Event);
