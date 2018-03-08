export const GET_SETLIST = "GET_SETLIST";
export const ADD_SET_TO_SETLIST = "ADD_SET_TO_SETLIST";

export const getSetList = payload => ({
  type: GET_SETLIST,
  payload
});

export const addSetToSetList = payload => ({
  type: ADD_SET_TO_SETLIST,
  payload
});
