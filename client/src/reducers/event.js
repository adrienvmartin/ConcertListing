import {
  GET_SHOWS,
  ADD_SHOW,
  DELETE_SHOW,
  GET_EVENT,
  EVENT_ERROR
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
    case GET_SHOWS:
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
      const newBands = bandSplitter(payload.bands);
      const finalBands = newBands.concat(...state.bands).sort();
      return {
        ...state,
        events: [...state.events, payload],
        loading: false,
        bands: duplicateCheck(finalBands),
        cities: [...state.cities, payload.city],
        venues: [...state.venues, payload.venue]
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
