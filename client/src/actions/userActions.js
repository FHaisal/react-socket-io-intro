import {UPDATE_USER, CONNECT_SOCKET, UPDATE_ONLINE_LIST, PRIVATE_MESSAGE} from "./types";

export const updateUser = (userData) => dispatch => {
  dispatch({
    type: CONNECT_SOCKET,
    payload: userData,
  });

  dispatch({
    type: UPDATE_USER,
    payload: userData,
  });
};

export const updateOnlineList = (onlineList) => dispatch => {
  dispatch({
    type: UPDATE_ONLINE_LIST,
    payload: onlineList,
  });
};

export const privateMessage = (socketID) => dispatch => {
  dispatch({
    type: PRIVATE_MESSAGE,
    payload: socketID,
  })
};