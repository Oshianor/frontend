import { combineReducers } from 'redux';
import topicReducer from "./topicReducer";
import userReducer from "./userReducer";
import giftReducer from "./giftReducer";
import commentReducer from "./commentReducer";

const appReducer = combineReducers({
  user: userReducer,
  topics: topicReducer,
  gift: giftReducer,
  comment: commentReducer
});

export default appReducer;