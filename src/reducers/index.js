
import { combineReducers } from 'redux';
import UserLoginReducer from './UserLoginReducer';
import UserSignUpReducer from './UserSignUpReducer';
import ServiceReducer from './ServiceReducer';
import UserReducer from './UserReducer';
import GameReducer from './GameReducer';

export default combineReducers({

    UserLogin: UserLoginReducer,
    UserSignUp: UserSignUpReducer,
    Service: ServiceReducer,
    User: UserReducer,
    Game: GameReducer
});
