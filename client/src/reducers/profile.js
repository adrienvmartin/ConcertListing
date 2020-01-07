import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE, GET_STATS,
} from '../actions/types';

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
    case GET_STATS:
      return {
        ...state,
        stats: payload,
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
