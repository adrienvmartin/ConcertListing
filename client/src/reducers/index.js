import { combineReducers } from 'redux';
import alerts from './alert';
import auth from './auth';
import profile from './profile';

export default combineReducers({
  alerts,
  auth,
  profile
});
