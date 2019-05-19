import io from 'socket.io-client'
import {SOCKET_EMIT, CONNECT_SOCKET, SOCKET_ON, SOCKET_OFF, UPDATE_USER} from "../actions/types";

export const socketMiddleware = () => {
  let socket;

  return storeAPI => next => action => {
    switch(action.type) {
      case CONNECT_SOCKET: {
        socket = io();
        socket.on('connect', () => socket.emit('update_name', action.payload));
        break;
      }
      case UPDATE_USER: {
        socket.on('connect', () => {
          action.payload.socketID = socket.id;
          socket.emit('update_online', socket.id);
        });
        return next(action);
      }
      case SOCKET_EMIT: {
        socket.emit(action.payload.type, action.payload.data);
        return;
      }
      case SOCKET_ON: {
        socket.on(action.payload.type, action.payload.data);
        return;
      }
      case SOCKET_OFF: {
        socket.removeListener(action.payload.type);
        return;
      }
    }

    return next(action);
  }
};