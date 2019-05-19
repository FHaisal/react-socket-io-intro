import { UPDATE_USER, UPDATE_ONLINE_LIST, PRIVATE_MESSAGE } from "../actions/types";
import isEmpty from '../validation/is-empty';

const initialState = {
  auth: false,
  userData: {},
  onlineList: [],
  privateMessage: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        auth: !isEmpty(action.payload),
        userData: action.payload
      };
    case UPDATE_ONLINE_LIST:
      return {
        ...state,
        onlineList: action.payload,
      };
    case PRIVATE_MESSAGE:
      return {
        ...state,
        privateMessage: action.payload,
      };
    default:
      return state;
  }
}
