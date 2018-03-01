import { getExerciseListApi } from "../ApiWrapper";
export const GET_EXERCISE_LIST = "GET_EXERCISE_LIST";

const getExerciseList = payload => ({
  type: GET_EXERCISE_LIST,
  payload
});

export const getExerciseListAsync = () => (dispatch, getState) => {
  return getExerciseListApi().then(payload => {
    dispatch(getExerciseList(payload));
  });
};
