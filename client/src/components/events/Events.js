import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadEvents, getStats } from '../../actions/event';
import Spinner from '../layout/Spinner';
import ListingsTable from './ListingsTable';

const Events = ({
  loadEvents,
  event: { events, loading, stats },
  getStats
}) => {
  useEffect(
    () => {
      loadEvents();
      getStats();
    },
    [loadEvents, getStats]
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Events</h1>
      {events.length > 0 ? (
        <Fragment>
          Welcome to your listings page! You've been to{' '}
          <b>{stats.eventCount} events</b> and have seen{' '}
          <b>{stats.bands} bands</b> at <b>{stats.venues} venues</b> in{' '}
          <b>{stats.cities} cities</b>.
          <ListingsTable data={events} />
        </Fragment>
      ) : (
        <Fragment>You have not created any events yet.</Fragment>
      )}
    </Fragment>
  );
};

Events.propTypes = {
  loadEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  stats: PropTypes.object
};

Events.defaultProps = {
  stats: {
    eventCount: 0,
    bands: 0,
    cities: 0,
    venues: 0
  }
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(
  mapStateToProps,
  { loadEvents, getStats }
)(Events);
