import { GET_GROUPS } from "../actions/groups";
const DEFAULT_STATE = null;
const groups = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_GROUPS:
      return action.payload;
    default:
      return state;
  }
};
export default groups;
