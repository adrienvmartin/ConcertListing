import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Event = ({ event }) => {
  const events = event.map(ev => (
    <tr key={ev._id}>
      <td>{ev.headliner}></td>
      <td>{ev.bands}</td>
      <td>{ev.venue}</td>
      <td>{ev.city}</td>
      <td>{ev.date}</td>
      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));
  return (
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
        <tbody>{events}</tbody>
      </table>
    </Fragment>
  );
};

Event.propTypes = {
  event: PropTypes.array.isRequired,
};

export default Event;
