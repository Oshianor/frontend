import { SET_USER_DATA, X_AUTH_TOKEN } from "../types/types";

const initialstate = {
  user: null,
  token: null
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, {
        user: action.payload
      });
    case X_AUTH_TOKEN:
      return Object.assign({}, state, {
        token: action.payload
      });
    default:
      return state;
  }
}