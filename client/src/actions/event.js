import axios from 'axios';
import { ADD_SHOW, DELETE_SHOW, PROFILE_ERROR } from './types';
import { setAlert } from './alert';

export const loadEvents = async dispatch => {
  try {
    const res = await axios.get('/api/events');

    dispatch({
      type: 'LOAD_EVENTS',
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: 'ERROR',
    });
  }
};

export const addEvent = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/events', formData, config);

    dispatch({
      type: ADD_SHOW,
      payload: res.data
    });

    dispatch(setAlert('Show added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const deleteEvent = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/events/${id}`);

    dispatch({
      type: DELETE_SHOW,
      payload: res.data
    });

    dispatch(setAlert('Event Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
