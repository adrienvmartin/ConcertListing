import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import CityItem from './CityItem';
import { loadCities } from '../../actions/profile';

const Cities = ({ loadCities, cities, loading }) => {
  useEffect(
    () => {
      loadCities();
    },
    [loadCities]
  );

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Cities</h1>
      {cities.length > 0 ? (
        <Fragment>
          <table className="table">
            <thead>
              <tr>
                <th>City</th>
                <th>Number Of Events</th>
              </tr>
            </thead>
            <tbody>
              {cities.map(c => (
                <CityItem key={c._id} city={c} />
              ))}
            </tbody>
          </table>
        </Fragment>
      ) : (
        <Fragment>You have not been to any cities yet.</Fragment>
      )}
    </Fragment>
  );
};

Cities.propTypes = {
  loadCities: PropTypes.func.isRequired,
  cities: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  cities: state.event.cities
});

export default connect(
  mapStateToProps,
  { loadCities }
)(Cities);
