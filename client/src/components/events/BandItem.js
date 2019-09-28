import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const BandItem = ({ band }) => {
  return (
    <Fragment>
      <tr key={band._id}>
        <td>
          {band.name}
        </td>
        <td>
          {band.instances}
        </td>
      </tr>
    </Fragment>
  )
};

BandItem.propTypes = {
  band: PropTypes.array.isRequired,
};

export default BandItem;
