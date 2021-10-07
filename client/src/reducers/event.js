import {
  ADD_SHOW,
  DELETE_SHOW,
  GET_EVENT,
  GET_STATS,
  EVENT_ERROR,
  LOAD_EVENTS,
  LOAD_BANDS,
  LOAD_CITIES,
  LOAD_VENUES,
  LOADING_ERROR,
} from '../actions/types';

export const initialState = {
  events: [],
  bands: [],
  cities: [],
  venues: [],
  loading: true,
  errors: {}
};

const eventReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOAD_EXAMPLES':
      return {
        ...state,
        examples: payload
      };
    case LOAD_EVENTS:
      return {
        ...state,
        events: payload,
        loading: false
      };
    case GET_STATS:
      return {
        ...state,
          stats: payload,
      };
    case LOAD_BANDS:
      return {
        ...state,
        bands: payload,
        loading: false,
      };
    case LOAD_CITIES:
      return {
        ...state,
        cities: payload,
        loading: false,
      };
    case LOAD_VENUES:
      return {
        ...state,
        venues: payload,
        loading: false,
      };
    case LOADING_ERROR:
      return {
        ...state,
        error: payload,
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
    case DELETE_SHOW:
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
