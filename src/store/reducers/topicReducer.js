import { GET_TOPICS, SET_CURRENT_PAGE, SET_SINGLE_TOPIC } from "../types/types";

const initialstate = {
  currentPage: 1,
  page: 0,
  topics: [],
  total: 0,
  singleTopic: null
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case GET_TOPICS:
      return Object.assign({}, state, {
        topics: action.payload.topics,
        page: action.payload.page,
        total: action.payload.total
      });
    case SET_CURRENT_PAGE:
      return Object.assign({}, state, {
        currentPage: action.payload
      });
    case SET_SINGLE_TOPIC:
      return Object.assign({}, state, {
        singleTopic: action.payload
      });
    default:
      return state;
  }
}