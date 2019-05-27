import React, { Fragment } from 'react';
import ListElement from './ListElement';

const MainListing = data => {
  return (
    <Fragment>
      data.map(d => <ListElement data={data} />)
    </Fragment>
  )
}

export default MainListing
