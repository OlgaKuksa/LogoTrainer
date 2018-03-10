import {
  GET_EXERCISE_LIST,
  REMOVE_EXERCISE,
  UPDATE_EXERCISE,
  CLEAR_EXERCISELIST
} from "../actions/exerciseList";

const DEFAULT_STATE = null;

const exerciseList = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_EXERCISE_LIST:
      return action.payload;
    case REMOVE_EXERCISE:
      return state.filter(
        exercise => exercise.exerciseId !== action.payload.exerciseId
      );
    case UPDATE_EXERCISE:
      return state.map(
        exercise =>
          exercise.exerciseId !== action.payload.exerciseId
            ? exercise
            : action.payload
      );
    case CLEAR_EXERCISELIST:
      return DEFAULT_STATE;
    default:
      return state;
  }
};
export default exerciseList;
