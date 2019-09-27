import axios from 'axios';
import { GET_PROFILE, PROFILE_ERROR, ADD_SHOW, DELETE_SHOW } from './types';
import { setAlert } from './alert';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const createProfile = () => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Profile Created', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const loadEvents = async dispatch => {
  try {
    const res = await axios.get('/api/profile/events');

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

export const createEvent = formData => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put(`/api/profile/events`, formData, config);

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
    const res = await axios.delete(`/api/profile/events/${id}`);

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
