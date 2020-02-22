import { OPEN_GIFT } from "../types/types";

const initialstate = {
  open: false,
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case OPEN_GIFT:
      return Object.assign({}, state, {
        open: !state.open
      });
    default:
      return state;
  }
}