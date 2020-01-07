import React from 'react';
import { Dialog } from '@material-ui/core';
import EditEvent from './EditEvent';

const EditModal = ({
  open,
  onClose,
  showInfo,
  loading,
  closeModal,
  data,
  onSubmit,
}) => {
  return (
    <Dialog
      open={open}
      children={EditEvent}
      title={'Edit Event'}
      onClose={onClose}
    >
      <EditEvent
        defaultId={data.id}
        defaultHeadliner={data.headliner}
        defaultOpeners={data.openers}
        defaultCity={data.city}
        defaultVenue={data.venue}
        defaultDate={data.date}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};

export default EditModal;
