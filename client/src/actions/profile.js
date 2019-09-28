import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_ERROR,
  ADD_SHOW,
  DELETE_SHOW,
  LOAD_EVENTS,
  LOAD_BANDS,
  LOAD_CITIES,
  LOAD_VENUES,
  LOADING_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED
} from './types';
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

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post('/api/profile', config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
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

export const loadEvents = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/events');

    dispatch({
      type: LOAD_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOADING_ERROR,
      payload: err
    });
  }
};

export const loadBands = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/bands');

    dispatch({
      type: LOAD_BANDS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOADING_ERROR,
      payload: err
    });
  }
};

export const loadCities = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/cities');

    dispatch({
      type: LOAD_CITIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOADING_ERROR,
      payload: err
    });
  }
};

export const loadVenues = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/venues');

    dispatch({
      type: LOAD_VENUES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOADING_ERROR,
      payload: err
    });
  }
};

export const createEvent = (formData, history) => async dispatch => {
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
    history.push('/events');
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

export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
