import {
  GET_SHOWS,
  ADD_SHOW,
  DELETE_SHOW,
  GET_EVENT,
  EVENT_ERROR,
  LOAD_EVENTS
} from '../actions/types';

import { bandSplitter, duplicateCheck } from '../utils/dataParser';

export const initialState = {
  events: [],
  event: null,
  loading: true,
  errors: {}
};

const eventReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
        loading: false
      };
    case ADD_SHOW:
      return {
        ...state,
        events: [...state.events, payload],
        loading: false,
      };
    case DELETE_SHOW: // Remove relevant band/city/venue instances when deleting an event
      return {
        ...state,
        events: state.events.filter(e => e._id !== payload),
        loading: false
      };
    case EVENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
};

export default eventReducer;
