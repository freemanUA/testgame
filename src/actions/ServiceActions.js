import { TOAST_SEND } from './types';

export const sendToast = (item) => {
    return (dispatch) => {
        dispatch({
            type: TOAST_SEND,
            payload: item
        });
        setTimeout(() => dispatch({
            type: TOAST_SEND,
            payload: ''
        }), 100);
    };
};
