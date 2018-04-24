export const SET_ACTIVE_GROUP = "SET_ACTIVE_GROUP";
export const CHANGE_GRADUATES_VISIBILITY = "CHANGE_GRADUATES_VISIBILITY";

export const setActiveGroup = payload => ({
  type: SET_ACTIVE_GROUP,
  payload
});

export const changeGraduatesVisibility = payload => ({
  type: CHANGE_GRADUATES_VISIBILITY,
  payload
});
