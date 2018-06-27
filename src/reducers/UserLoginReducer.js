import {
  USER_PASSWORD_CHANGED,
  USER_LOGIN_CHANGED,
  USER_LOGIN,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    password: '',
    error: '',
    loading: false,
    login: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case USER_LOGIN_CHANGED:
      return { ...state, login: action.payload };
    case USER_LOGIN:
      return { ...state, loading: true, error: '' };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, error: '', password: '' };
    case USER_LOGIN_FAILED:
      return { ...state, error: action.payload, password: '', loading: false };
    default:
      return state;
  }
};
