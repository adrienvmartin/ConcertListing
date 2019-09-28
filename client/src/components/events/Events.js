import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EventItem from './EventItem';
import { loadEvents } from '../../actions/event';
import Spinner from '../layout/Spinner';

const Events = ({ loadEvents, event: { events, loading } }) => {
  useEffect(
    () => {
      loadEvents();
    },
    [loadEvents]
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Events</h1>
      {events.length > 0 ? (
        <Fragment>
          <table className="table">
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
            <tbody>
              {events.map(ev => (
                <EventItem key={ev._id} event={ev} />
              ))}
            </tbody>
          </table>
        </Fragment>
      ) : (
        <Fragment>You have not created any events yet.</Fragment>
      )}
    </Fragment>
  );
};

Events.propTypes = {
  loadEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(
  mapStateToProps,
  { loadEvents }
)(Events);
