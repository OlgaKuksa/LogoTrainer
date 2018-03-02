import {
  GET_EXERCISE_LIST,
  REMOVE_EXERCISE,
  UPDATE_EXERCISE
} from "../actions/exerciseList";

const DEFAULT_STATE = [];

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
    default:
      return state;
  }
};
export default exerciseList;
