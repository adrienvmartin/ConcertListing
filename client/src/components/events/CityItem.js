import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const CityItem = ({ city }) => {
  return (
    <Fragment>
      <tr key={city._id}>
        <td>
          {city.name}
        </td>
        <td>
          {city.instances}
        </td>
      </tr>
    </Fragment>
  )
};

CityItem.propTypes = {
  city: PropTypes.array.isRequired,
};

export default CityItem;
