import { getKidsApi, addKidApi, updateKidApi } from "../apiwrapper";
export const GET_KIDS = "GET_KIDS";
export const ADD_KID = "ADD_KID";
export const UPDATE_KID = "UPDATE_KID";

export const getKids = payload => ({
  type: GET_KIDS,
  payload
});

export const addKid = kid => ({
  type: ADD_KID,
  payload: kid
});

export const updateKid = payload => ({
  type: UPDATE_KID,
  payload
});

export const getKidsAsync = () => (dispatch, getState) => {
  const state = getState();
  if (state.kids) return Promise.resolve();
  return getKidsApi().then(payload => {
    dispatch(getKids(payload));
  });
};

export const addKidAsync = kid => dispatch => {
  return addKidApi(kid).then(payload => dispatch(addKid(payload)));
};

export const updateKidAsync = kid => dispatch => {
  return updateKidApi(kid).then(payload => dispatch(updateKid(payload)));
};
