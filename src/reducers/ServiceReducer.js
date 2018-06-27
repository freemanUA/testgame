import {
  TOAST_SEND
} from '../actions/types';

const INITIAL_STATE = {
    toast: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOAST_SEND:
      return { ...state, toast: action.payload };
    default:
      return state;
  }
};
