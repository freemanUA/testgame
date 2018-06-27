import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import {
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_CHANGED,
    TOAST_SEND,
    USER_LOGIN_CHANGED,
    USER_PASSWORD_CHANGED, AUTH_TOKEN_CHANGED
}
    from './types';
import { SERVER } from '../Config';
import { getGames } from './GameActions';

export const userLoginChanged = (text) => {
    return {
        type: USER_LOGIN_CHANGED,
        payload: text
    };
};

export const userPasswordChanged = (text) => {
    return {
        type: USER_PASSWORD_CHANGED,
        payload: text
    };
};

export const userLogin = () => {
  return (dispatch, getState) => {
      dispatch({ type: USER_LOGIN });
      const { login, password } = getState().UserLogin;
    if (login === '' || password === '') {
        dispatch({
            type: TOAST_SEND,
            payload: {
                type: 'warning',
                text: 'Please fill all fields',
                position: 'bottom',
                buttonText: 'Okay',
                duration: 5000,
                textStyle: { textAlign: 'center' }
            }
        });
        setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
        dispatch({ type: USER_LOGIN_FAILED });
    } else {
      const url = `${SERVER}/api/login`;
      const request = {
        userName: login,
        password
      };
      axios.post(url, request)
          .then((response) => {
              console.log(response);
              const { success, user, token, invalidLogin, invalidPassword } = response.data;
              if (success) {
                  console.log('login successful');
                  //console.log(user);
                  if (user) dispatch({ type: USER_CHANGED, payload: user });
                  if (token) dispatch({ type: AUTH_TOKEN_CHANGED, payload: token });
                  //check if Terms accepted and redirect to corresponding screen
                  if (user.termsConfirmed) {
                      dispatch(getGames());
                      Actions.Lobby();
                  } else {
                      Actions.Terms();
                  }
                  dispatch({ type: USER_LOGIN_SUCCESS });
              } else if (invalidLogin) {
                  dispatch({
                      type: TOAST_SEND,
                      payload: {
                          type: 'danger',
                          text: 'Username is invalid!',
                          position: 'bottom',
                          buttonText: 'Okay',
                          duration: 5000,
                          textStyle: { textAlign: 'center' }
                      }
                  });
                  setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
                  dispatch({ type: USER_LOGIN_FAILED });
              } else if (invalidPassword) {
                  dispatch({
                      type: TOAST_SEND,
                      payload: {
                          type: 'danger',
                          text: 'Password is wrong!',
                          position: 'bottom',
                          buttonText: 'Okay',
                          duration: 5000,
                          textStyle: { textAlign: 'center' }
                      }
                  });
                  setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
                  dispatch({ type: USER_LOGIN_FAILED });
              } else {
                  dispatch({
                      type: TOAST_SEND,
                      payload: {
                          type: 'danger',
                          text: 'Unknown error',
                          position: 'bottom',
                          buttonText: 'Okay',
                          duration: 5000,
                          textStyle: { textAlign: 'center' }
                      }
                  });
                  setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
                  dispatch({ type: USER_LOGIN_FAILED });
                  }
        })
        .catch((error) => {
            console.log(error.response);
            dispatch({ type: USER_LOGIN_FAILED });
            dispatch({
                type: TOAST_SEND,
                payload: {
                    type: 'danger',
                    text: 'Network or server error. Check internet connection',
                    position: 'bottom',
                    buttonText: 'Okay',
                    duration: 5000,
                    textStyle: { textAlign: 'center' }
                }
            });
            setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
        });
    }
  };
};
