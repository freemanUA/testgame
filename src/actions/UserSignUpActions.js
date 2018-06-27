import { Actions } from 'react-native-router-flux';
import axios, { CancelToken } from 'axios';

import {
    AUTH_TOKEN_CHANGED,
    TOAST_SEND, USER_CHANGED, USER_SIGNUP, USER_SIGNUP_FAIL, USER_SIGNUP_SUCCESS,
}
    from './types';
import { SERVER } from '../Config';
import { getGames } from './GameActions';


export const userSignUp = (data) => {
  return (dispatch) => {
      dispatch({ type: USER_SIGNUP });
      console.log(data);
      const {
          phoneNumber,
          ETHAccount,
          username,
          password,
          confirmPassword,
          fullName,
          country,
          birthday,
          email
      } = data;
        //Check that all fields are filled
      Object.values(data).forEach(value => {
              if (value === null || value === '' || value === undefined) {
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
                  dispatch({ type: USER_SIGNUP_FAIL });
                  return;
              }
      });
      //Check passwords match
      if (password !== confirmPassword) {
          dispatch({
              type: TOAST_SEND,
              payload: {
                  type: 'warning',
                  text: 'Passwords doesn\'t match',
                  position: 'bottom',
                  buttonText: 'Okay',
                  duration: 5000,
                  textStyle: { textAlign: 'center' }
              }
          });
          setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
          dispatch({ type: USER_SIGNUP_FAIL });
          return;
      }

      const url = `${SERVER}/api/signup`;
      const request = {
          password,
          userName: username,
          lastName: fullName,
          country,
          email,
          phone: phoneNumber,
          birthday: `${birthday} 12:00`,
          ethereumAddress: ETHAccount,
          firstName: fullName,
      };
        //set network timeout to avoid long loading
        const source = CancelToken.source();
        setTimeout(() => {
            source.cancel();
        }, 5000);
      axios.post(url, request, { cancelToken: source.token })
        .then((response) => {
          console.log(response);
          const { success, user, emailAlreadyExists, auth_token } = response.data;
          if (success) {
              console.log('registration successful');
              //console.log(user);
              if (user) dispatch({ type: USER_CHANGED, payload: user });
              if (auth_token) dispatch({ type: AUTH_TOKEN_CHANGED, payload: auth_token });
              //navigate to Terms screen
              Actions.Terms();
              dispatch({ type: USER_SIGNUP_SUCCESS });
          } else {
              dispatch({ type: USER_SIGNUP_FAIL });
              if (emailAlreadyExists) {
                  dispatch({
                      type: TOAST_SEND,
                      payload: {
                          type: 'warning',
                          text: 'Email already exists',
                          position: 'bottom',
                          buttonText: 'Okay',
                          duration: 5000,
                          textStyle: { textAlign: 'center' }
                      }
                  });
                  setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
              }
          }
        })
        .catch((error) => {
          console.log(error);
            dispatch({ type: USER_SIGNUP_FAIL });
            dispatch({
                type: TOAST_SEND,
                payload: {
                    type: 'danger',
                    text: 'Network error. Check internet connection',
                    position: 'bottom',
                    buttonText: 'Okay',
                    duration: 5000,
                    textStyle: { textAlign: 'center' }
                }
            });
            setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
        });
  };
};

export const acceptTermsPressed = () => {
    return (dispatch, getState) => {
        console.log('accept terms pressed');
        dispatch({ type: USER_SIGNUP });
        const { auth_token } = getState().User;
        const headers = { Authorization: `Bearer ${auth_token}` };
        console.log(headers);
        const url = `${SERVER}/api/confirm/terms`;
        axios.post(url, {}, { headers })
            .then((response) => {
                console.log(response);
                if (response.data.success) {
                    Actions.RegistrationComplete();
                    dispatch({ type: USER_SIGNUP_SUCCESS });
                } else {
                    dispatch({
                        type: TOAST_SEND,
                        payload: {
                            type: 'danger',
                            text: 'Error confirming T&C',
                            position: 'bottom',
                            buttonText: 'Okay',
                            duration: 5000,
                            textStyle: { textAlign: 'center' }
                        }
                    });
                    setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
                    dispatch({ type: USER_SIGNUP_FAIL });
                }
            })
            .catch((error) => {
                console.log(error.response);
                dispatch({ type: USER_SIGNUP_FAIL });
                dispatch({
                    type: TOAST_SEND,
                    payload: {
                        type: 'danger',
                        text: 'Network error. Check internet connection',
                        position: 'bottom',
                        buttonText: 'Okay',
                        duration: 5000,
                        textStyle: { textAlign: 'center' }
                    }
                });
                setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
            });
    };
};
export const startPlayingPressed = () => {
    return (dispatch) => {
        dispatch(getGames());
        Actions.Lobby();
    };
};
