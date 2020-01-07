import axios from 'axios';
import {
  ADD_SHOW,
  DELETE_SHOW, GET_STATS,
  LOAD_BANDS,
  LOAD_CITIES,
  LOAD_EVENTS,
  LOAD_VENUES,
  LOADING_ERROR,
  PROFILE_ERROR
} from './types';
import { setAlert } from './alert';

export const loadEvents = () => async dispatch => {
  try {
    const res = await axios.get('/api/events');

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
    const res = await axios.get('/api/events/bands');

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
    const res = await axios.get('/api/events/cities');

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
    const res = await axios.get('/api/events/venues');

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

    const res = await axios.post(`/api/events`, formData, config);

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
