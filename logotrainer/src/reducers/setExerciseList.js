import {
  ADD_SETEXERCISELIST,
  REMOVE_SETEXERCISELIST
} from "../actions/setExerciseList";

const DEFAULT_STATE = null;

const setExerciseList = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_SETEXERCISELIST:
      return action.payload;
    case REMOVE_SETEXERCISELIST:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export default setExerciseList;
