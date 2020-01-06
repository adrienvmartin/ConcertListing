import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadEvents } from '../../actions/event';
import Spinner from '../layout/Spinner';
import ListingsTable from './ListingsTable';

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
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(
  mapStateToProps,
  { loadEvents }
)(Events);
