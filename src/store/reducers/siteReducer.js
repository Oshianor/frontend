import { GET_SITE, GET_TOPIC_FOR_SITE } from "../types/types";

const initialstate = {
  currentPage: 1,
  page: 0,
  topics: [],
  site: null
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case GET_TOPIC_FOR_SITE:
      return Object.assign({}, state, {
        topics: action.payload.topics,
        page: action.payload.page,
        total: action.payload.total
      });
    case GET_SITE:
      return Object.assign({}, state, {
        site: action.payload
      });
    default:
      return state;
  }
}