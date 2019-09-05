import { combineReducers } from 'redux';
import alerts from './alert';
import auth from './auth';
import profile from './profile';
import event from './event';

export default combineReducers({
  alerts,
  auth,
  profile,
  event
});
