import { USER_SIGNUP, USER_SIGNUP_FAIL, USER_SIGNUP_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_SIGNUP:
      return { ...state, loading: true };
    case USER_SIGNUP_SUCCESS:
      return { ...state, loading: false };
    case USER_SIGNUP_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
};
