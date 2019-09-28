import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import BandItem from './BandItem';
import { loadBands } from '../../actions/profile';

const Bands = ({ loadBands, bands, loading }) => {
  useEffect(
    () => {
      loadBands();
    },
    [loadBands]
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Bands</h1>
      <Fragment>
        <table className="table">
          <thead>
            <tr>
              <th>Band Name</th>
              <th>Number Of Events</th>
            </tr>
          </thead>
          <tbody>
            {bands.map(b => (
              <BandItem key={b._id} band={b} />
            ))}
          </tbody>
        </table>
      </Fragment>
      <div className="events" />
    </Fragment>
  );
};

Bands.propTypes = {
  loadBands: PropTypes.func.isRequired,
  bands: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bands: state.event.bands
});

export default connect(
  mapStateToProps,
  { loadBands }
)(Bands);
