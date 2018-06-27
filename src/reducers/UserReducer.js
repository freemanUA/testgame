import {
    AUTH_TOKEN_CHANGED,
    USER_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    user: {},
    auth_token: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_TOKEN_CHANGED:
      return { ...state, auth_token: action.payload };
    case USER_CHANGED:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
