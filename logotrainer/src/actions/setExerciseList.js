import { getSetExercisesApi } from "../apiwrapper";
export const ADD_SETEXERCISELIST = "ADD_SETEXERCISELIST";
export const REMOVE_SETEXERCISELIST = "REMOVE_SETEXERCISELIST";

const addSetExerciseList = payload => ({
  type: ADD_SETEXERCISELIST,
  payload
});

export const removeSetExerciseList = payload => ({
  type: REMOVE_SETEXERCISELIST,
  payload
});

export const getExercisesApiAsync = setId => dispatch => {
  getSetExercisesApi(setId).then(payload =>
    dispatch(addSetExerciseList(payload))
  );
};
