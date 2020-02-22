import { combineReducers } from 'redux';
import topicReducer from "./topicReducer";
import userReducer from "./userReducer";
import giftReducer from "./giftReducer";

const appReducer = combineReducers({
  user: userReducer,
  topics: topicReducer,
  gift: giftReducer
});

export default appReducer;