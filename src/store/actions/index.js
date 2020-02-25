import {
  GET_TOPICS,
  SET_CURRENT_PAGE,
  SET_USER_DATA,
  X_AUTH_TOKEN,
  OPEN_GIFT,
  SET_TOPIC_ID,
  SET_SINGLE_TOPIC,
  TOGGLE_COMMENT,
  GET_COMMENTS,
  SET_CURRENT_COMMENT_PAGE
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
export const setSingleTopic = payload => {
  return {
    type: SET_SINGLE_TOPIC,
    payload
  };
};





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
export const setTopicId = (payload) => {
  return {
    type: SET_TOPIC_ID,
    payload
  };
}
// export const toggleRefresh = () => {
//   return {
//     type: TOGGLE_REFRESH
//   }
// }



// comment
export const setComment = (payload) => {
  return {
    type: GET_COMMENTS,
    payload
  };
}

export const setCurrenPageComment = payload => {
  return {
    type: SET_CURRENT_COMMENT_PAGE,
    payload
  };
};


export const setToggleComment = payload => {
  return {
    type: TOGGLE_COMMENT,
    payload
  };
};