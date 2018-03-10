import { GET_SETLIST, ADD_SET_TO_SETLIST } from "../actions/setList";
import { CLEAR_KIDPAGE } from "../actions/kidInPage";

const DEFAULT_STATE = null;

const setList = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_SETLIST:
      return action.payload;
    case ADD_SET_TO_SETLIST:
      state = state || [];
      return [...state, action.payload];
    case CLEAR_KIDPAGE:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export default setList;
