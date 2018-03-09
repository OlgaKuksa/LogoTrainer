import {
  getExerciseListApi,
  addExerciseApi,
  updateExerciseApi,
  removeExerciseApi
} from "../apiwrapper";
import { removeExerciseFromModal } from "./exerciseInModal";
export const GET_EXERCISE_LIST = "GET_EXERCISE_LIST";
export const ADD_EXERCISE = "ADD_EXERCISE";
export const UPDATE_EXERCISE = "UPDATE_EXERCISE";
export const REMOVE_EXERCISE = "REMOVE_EXERCISE";
export const CLEAR_EXERCISELIST = "CLEAR_EXERCISELIST";

const getExerciseList = payload => ({
  type: GET_EXERCISE_LIST,
  payload
});

const updateExercise = payload => ({
  type: UPDATE_EXERCISE,
  payload
});
const removeExercise = payload => ({
  type: REMOVE_EXERCISE,
  payload
});
export const getExerciseListAsync = filter => (dispatch, getState) => {
  return getExerciseListApi(filter).then(payload => {
    dispatch(getExerciseList(payload));
  });
};

export const addExerciseAsync = exercise => (dispatch, getState) => {
  return addExerciseApi(exercise).then(payload => {
    dispatch(removeExerciseFromModal());
  });
};

export const updateExerciseAsync = exercise => (dispatch, getState) => {
  return updateExerciseApi(exercise).then(payload => {
    dispatch(updateExercise(payload));
    dispatch(removeExerciseFromModal());
  });
};

export const removeExerciseAsync = exercise => (dispatch, getState) => {
  return removeExerciseApi(exercise).then(payload => {
    dispatch(removeExercise(payload));
    dispatch(removeExerciseFromModal());
  });
};

export const clearExerciseList = payload => ({
  type: CLEAR_EXERCISELIST,
  payload: payload
});
