import React, { Fragment } from 'react';

const ListElement = ({ data, number }) => {
  const { headliner, openers, city, venue, date } = data;
  return (
    <Fragment>
      `${number} ${headliner} w/ ${openers} - ${date} @ ${venue}, ${city}`
    </Fragment>
  )
};

export default ListElement;
