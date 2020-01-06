import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { loadVenues } from '../../actions/event';
import ItemTable from './ItemTable';

const title = 'Venues';
const message = 'You have not been to any venues yet.';

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
      <ItemTable headerTitle={title} blankMessage={message} data={venues} />
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
