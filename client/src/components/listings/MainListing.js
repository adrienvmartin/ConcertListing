import React, { Fragment, useState } from 'react';
import Button from '@material-ui/core/Button';
import EventFormModal from '../form/EventFormModal';

const styles = {
  main: {
    color: '#fff',
    height: '100%',
    width: '80%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#333',
    padding: '0.4rem 1.3rem',
    fontSize: '1rem'
  }
};

const MainListing = data => {
  const [state, setModal] = useState({
    open: false
  });

  const handleModal = input => {
    setModal({ open: input });
  };

  return (
    <Fragment>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <Button
              onClick={() => handleModal(true)}
              style={styles.button}
              label="Add new event"
            />
            <EventFormModal
              open={state.open}
              onRequestClose={() => handleModal(false)}
            />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default MainListing;
