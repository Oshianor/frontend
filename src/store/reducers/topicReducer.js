import { GET_TOPICS, SET_CURRENT_PAGE } from "../types/types";

const initialstate = {
  currentPage: 1,
  page: 0,
  topics: [],
  total: 0
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
    default:
      return state;
  }
}