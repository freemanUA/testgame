import {
    CHOOSED_GAME_CHANGED, GAME_DATA_LOAD, GAME_DATA_LOAD_FAILED,
    GAMES_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    games: [],
    joinedGame: {},
    choosedGame: {},
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case GAME_DATA_LOAD_FAILED:
          return { ...state, loading: false };
      case GAME_DATA_LOAD:
          return { ...state, loading: true };
      case GAMES_CHANGED:
        return { ...state, games: action.payload, loading: false };
      case CHOOSED_GAME_CHANGED:
          return { ...state, choosedGame: action.payload };
      default:
        return state;
    }
};
