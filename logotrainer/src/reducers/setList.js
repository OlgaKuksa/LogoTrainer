import { GET_SETLIST, ADD_SET_TO_SETLIST } from "../actions/setList";

const DEFAULT_STATE = null;

const setList = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_SETLIST:
      return action.payload;
    case ADD_SET_TO_SETLIST:
      state = state || [];
      return [...state, action.payload];
    default:
      return state;
  }
};

export default setList;
