import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const VenueItem = ({ venue }) => {
  return (
    <Fragment>
      <tr key={venue._id}>
        <td>
          {venue.name}
        </td>
        <td>
          {venue.instances}
        </td>
      </tr>
    </Fragment>
  )
};

VenueItem.propTypes = {
  venue: PropTypes.array.isRequired,
};

export default VenueItem;
