import { getGroupsApi } from "../apiwrapper";
export const GET_GROUPS = "GET_GROUPS";
export const getGroups = payload => ({ type: GET_GROUPS, payload });
export const getGroupsAsync = () => (dispatch, getState) => {
  const state = getState();
  if (state.groups != null) return Promise.resolve();
  getGroupsApi().then(payload => dispatch(getGroups(payload)));
};
