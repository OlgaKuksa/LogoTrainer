import { GET_EXERCISE_LIST } from "../actions/exerciseList";

const DEFAULT_STATE = [];

const exerciseList = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_EXERCISE_LIST:
      return action.payload;
    default:
      return state;
  }
};
export default exerciseList;
