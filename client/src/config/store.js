import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";
import { socketMiddleware } from '../middleware/socket-middleware';

const initialState = {};

const middleware = [thunk, socketMiddleware()];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);

export default store;
