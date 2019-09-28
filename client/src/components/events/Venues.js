import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import VenueItem from './VenueItem';
import { loadVenues } from '../../actions/profile';

const Venues = ({ loadVenues, venues, loading }) => {
  useEffect(
    () => {
      loadVenues();
    },
    [loadVenues]
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Venues</h1>
      <Fragment>
        <table className="table">
          <thead>
          <tr>
            <th>Venue</th>
            <th>Number Of Events</th>
          </tr>
          </thead>
          <tbody>
          {venues.map(v => (
            <VenueItem key={v._id} venue={v} />
          ))}
          </tbody>
        </table>
      </Fragment>
      <div className="events" />
    </Fragment>
  );
};

Venues.propTypes = {
  loadVenues: PropTypes.func.isRequired,
  venues: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  venues: state.event.venues
});

export default connect(
  mapStateToProps,
  { loadVenues }
)(Venues);
