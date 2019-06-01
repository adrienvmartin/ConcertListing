import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import CreateEventForm from './NewEvent';

const EventFormModal = ({ open, onRequestClose }) => {
  return (
    <Dialog open={open}>
      <CreateEventForm />
    </Dialog>
  );
};

EventFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired
};

export default EventFormModal;
