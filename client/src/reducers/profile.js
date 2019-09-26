import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE, ADD_SHOW
} from '../actions/types';
import { bandSplitter, duplicateCheck } from '../utils/dataParser';

const initialState = {
  profile: null,
  loading: true,
  error: {},
  events: [],
};

const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
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
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
};

export default profileReducer;
