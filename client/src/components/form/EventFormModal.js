import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import CreateEventForm from './NewEvent';

const EventFormModal = ({ open, onRequestClose }) => {
  return (
    <Dialog open={open}>
      <CreateEventForm />
    </Dialog>
  );
};

export default EventFormModal;
