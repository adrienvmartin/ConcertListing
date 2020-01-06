import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadBands } from '../../actions/event';
import ItemTable from './ItemTable';
import Spinner from '../layout/Spinner';

const blankMessage = 'You have not seen any bands yet.';
const headerTitle = 'Bands';

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
      <ItemTable
        data={bands}
        blankMessage={blankMessage}
        headerTitle={headerTitle}
      />
    </Fragment>
  );
};

Bands.propTypes = {
  loadBands: PropTypes.func.isRequired,
  bands: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  bands: state.event.bands
});

export default connect(
  mapStateToProps,
  { loadBands }
)(Bands);
