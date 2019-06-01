import React, { Fragment, useState } from 'react';
import ListElement from './ListElement';
import RaisedButton from '@material-ui/core/RaisedButton';
import EventFormModal from '../form/EventFormModal';

const MainListing = data => {

  const [state, setModal] = useState({
    open: false,
  })
  
  const handleModal = input => {
    setModal({ open: input });
  };

  return (
    <Fragment>
      <RaisedButton onClick={() => handleModal(true)} />  
      <EventFormModal
        open={state.open}
        onRequestClose={() => handleModal(false)}
      />
    </Fragment>
  )
}

export default MainListing
