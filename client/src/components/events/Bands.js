import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { loadBands } from '../../actions/event';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

const Bands = ({ loadBands, bands, loading }) => {
  useEffect(
    () => {
      loadBands();
    },
    [loadBands]
  );

  const createData = (bandName, events) => {
    return { bandName, events };
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Bands</h1>
      {bands.length > 0 ? (
        <Fragment>
          <Table size="small" aria-label="band listing">
            <TableHead>
              <TableRow>
                <TableCell>Band Name</TableCell>
                <TableCell>Number Of Times Seen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bands.map(b => (
                <TableRow key={b._id}>
                  <TableCell component="th" scope="row">
                    {b.name}
                  </TableCell>
                  <TableCell>{b.instances}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Fragment>
      ) : (
        <Fragment>You have not seen any bands yet.</Fragment>
      )}
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
