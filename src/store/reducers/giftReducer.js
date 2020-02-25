import { OPEN_GIFT, SET_TOPIC_ID, TOGGLE_REFRESH } from "../types/types";

const initialstate = {
  open: false,
  topicId: null,
  refresh: false
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case OPEN_GIFT:
      return Object.assign({}, state, {
        open: !state.open
      });
    case SET_TOPIC_ID:
      return Object.assign({}, state, {
        topicId: action.payload
      });
    case TOGGLE_REFRESH:
      return Object.assign({}, state, {
        refresh: !state.open
      });
    default:
      return state;
  }
}