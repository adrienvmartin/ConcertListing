import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { loadCities } from '../../actions/event';
import ItemTable from './ItemTable';

const title = 'Cities';

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
      <ItemTable headerTitle={title} data={cities} />
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
