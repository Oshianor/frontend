import {
  GET_TOPICS,
  SET_CURRENT_PAGE,
  SET_USER_DATA,
  X_AUTH_TOKEN,
  OPEN_GIFT
} from "../types/types";




// topic reducers
export const setTopics = (payload) => {
  return {
    type: GET_TOPICS,
    payload
  };
}
export const setCurrentPage = (payload) => {
  return {
    type: SET_CURRENT_PAGE,
    payload
  };
}




// user reducers 
export const setUserData = (payload) => {
  return {
    type: SET_USER_DATA,
    payload
  };
}
export const setToken = payload => {
  return {
    type: X_AUTH_TOKEN,
    payload
  };
};




// gift reducers
export const toggleGift = () => {
  return {
    type: OPEN_GIFT
  };
};