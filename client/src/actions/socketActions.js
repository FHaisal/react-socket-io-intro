import { SOCKET_EMIT, SOCKET_ON, SOCKET_OFF } from "./types";

export const socketEmit = (data) => dispatch => {
  dispatch({
    type: SOCKET_EMIT,
    payload: data,
  });
};

export const socketOn = (data) => dispatch => {
  dispatch({
    type: SOCKET_ON,
    payload: data,
  });
};

export const socketOff = (data) => dispatch => {
  dispatch({
    type: SOCKET_OFF,
    payload: data,
  });
};

