import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
    CHOOSED_GAME_CHANGED,
    GAME_DATA_LOAD,
    GAME_DATA_LOAD_FAILED,
    GAMES_CHANGED,
    TOAST_SEND
} from './types';
import { SERVER } from '../Config';

export const getGames = () => {
    return (dispatch, getState) => {
        console.log('get games fired');
        //dispatch({ type: GAME_DATA_LOAD });
        const { auth_token } = getState().User;
        const headers = { Authorization: `Bearer ${auth_token}` };
        console.log(headers);
        const url = `${SERVER}/api/games/get`;
        axios.post(url, { limit: 100, offset: 3 }, { headers })
            .then((response) => {
                console.log(response);
                const { success, games } = response.data;
                if (success) {
                        dispatch({ type: GAMES_CHANGED, payload: games });
                } else {
                    dispatch({
                        type: TOAST_SEND,
                        payload: {
                            type: 'danger',
                            text: 'Error getting games',
                            position: 'bottom',
                            buttonText: 'Okay',
                            duration: 5000,
                            textStyle: { textAlign: 'center' }
                        }
                    });
                    setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
                }
            })
            .catch((error) => {
                console.log(error.response);
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

export const gameChoosed = (game) => {
    console.log('game choosed', game);
    return (dispatch) => {
        dispatch(getGame(game.id));
        Actions.JoinGame();
    };
};

export const joinGame = (id) => {
    return (dispatch, getState) => {
        console.log('joinGame fired', id);
        const { auth_token } = getState().User;
        const headers = { Authorization: `Bearer ${auth_token}` };
        console.log(headers);
        const url = `${SERVER}/api/game/join/${id}`;
        const body = { players: 'true' };
        console.log(url);
        axios.post(url, body, { headers })
            .then((response) => {
                console.log(response);
                const { success, game } = response.data;
                if (success) {
                    dispatch(getGame(game.id));
                } else {
                    dispatch({
                        type: TOAST_SEND,
                        payload: {
                            type: 'danger',
                            text: 'Error joining game, choose another one',
                            position: 'bottom',
                            buttonText: 'Okay',
                            duration: 5000,
                            textStyle: { textAlign: 'center' }
                        }
                    });
                    setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
                }
            })
            .catch((error) => {
                console.log('checkpoint', error.response);
                console.log('checkpoint', error);
                dispatch({
                    type: TOAST_SEND,
                    payload: {
                        type: 'danger',
                        text: 'Network error!. Check internet connection',
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

export const createGame = (data) => {
    return (dispatch, getState) => {
        console.log('create game fired');
        dispatch({ type: GAME_DATA_LOAD });
        const { auth_token } = getState().User;
        const { playersNum } = data;
        const { maxLimitStakes, minLimitStakes } = data.stakes;
        const headers = { Authorization: `Bearer ${auth_token}` };
        console.log(data);
        console.log(headers);
        const url = `${SERVER}/api/game/create`;
        const request = {
            name: 'Test Game',
            limitPlayers: playersNum,
            limitBanquiers: 2,
            minLimitStakes,
            maxLimitStakes
        };
        axios.post(url, request, { headers })
            .then((response) => {
                console.log(response);
                const { success, game } = response.data;
                if (success) {
                    dispatch(gameChoosed(game));
                } else {
                    dispatch({ type: GAME_DATA_LOAD_FAILED });
                    dispatch({
                        type: TOAST_SEND,
                        payload: {
                            type: 'danger',
                            text: 'Error creating game',
                            position: 'bottom',
                            buttonText: 'Okay',
                            duration: 5000,
                            textStyle: { textAlign: 'center' }
                        }
                    });
                    setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
                }
            })
            .catch((error) => {
                console.log(error.response);
                dispatch({ type: GAME_DATA_LOAD_FAILED });
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
export const leaveGame = (id) => {
    return (dispatch, getState) => {
        console.log('leaveGame fired', id);
        const { auth_token } = getState().User;
        const headers = { Authorization: `Bearer ${auth_token}` };
        console.log(headers);
        const url = `${SERVER}/api/game/leave`;
        console.log(url);
        axios.get(url, { headers })
            .then((response) => {
                console.log(response);
                const { success } = response.data;
                if (success) {
                    dispatch(getGames());
                    Actions.Lobby();
                } else {
                    dispatch({
                        type: TOAST_SEND,
                        payload: {
                            type: 'danger',
                            text: 'Error leaving game',
                            position: 'bottom',
                            buttonText: 'Okay',
                            duration: 5000,
                            textStyle: { textAlign: 'center' }
                        }
                    });
                    setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
                }
            })
            .catch((error) => {
                console.log(error.response);
                dispatch({
                    type: TOAST_SEND,
                    payload: {
                        type: 'danger',
                        text: 'Network error!. Check internet connection',
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

export const getGame = (id) => {
    return (dispatch, getState) => {
        console.log('getGame fired', id);
        const { auth_token } = getState().User;
        const headers = { Authorization: `Bearer ${auth_token}` };
        console.log(headers);
        const url = `${SERVER}/api/game/get/${id}`;
        console.log(url);
        axios.get(url, { headers })
            .then((response) => {
                console.log(response);
                const { success, game } = response.data;
                if (success) {
                    dispatch({ type: CHOOSED_GAME_CHANGED, payload: game });
                } else {
                    dispatch({
                        type: TOAST_SEND,
                        payload: {
                            type: 'danger',
                            text: 'Error updating game',
                            position: 'bottom',
                            buttonText: 'Okay',
                            duration: 5000,
                            textStyle: { textAlign: 'center' }
                        }
                    });
                    setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
                }
            })
            .catch((error) => {
                console.log(error.response);
                dispatch({
                    type: TOAST_SEND,
                    payload: {
                        type: 'danger',
                        text: 'Network error!. Check internet connection',
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
export const logout = () => {
    return (dispatch, getState) => {
        console.log('logout fired');
        const { auth_token } = getState().User;
        const headers = { Authorization: `Bearer ${auth_token}` };
        console.log(headers);
        const url = `${SERVER}/api/logout`;
        console.log(url);
        axios.get(url, { headers })
            .then((response) => {
                console.log(response);
                const { success } = response.data;
                if (success) {
                    Actions.UserLogin();
                } else {
                    dispatch({
                        type: TOAST_SEND,
                        payload: {
                            type: 'danger',
                            text: 'Logout error',
                            position: 'bottom',
                            buttonText: 'Okay',
                            duration: 5000,
                            textStyle: { textAlign: 'center' }
                        }
                    });
                    setTimeout(() => dispatch({ type: TOAST_SEND, payload: '' }), 100);
                }
            })
            .catch((error) => {
                console.log(error.response);
                dispatch({
                    type: TOAST_SEND,
                    payload: {
                        type: 'danger',
                        text: 'Network error!. Check internet connection',
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
