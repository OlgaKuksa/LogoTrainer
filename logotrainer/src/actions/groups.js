import { getGroupsApi } from "../apiwrapper";
import { setActiveGroupId } from "./kidsView";
export const GET_GROUPS = "GET_GROUPS";
export const getGroups = payload => ({ type: GET_GROUPS, payload });
export const getGroupsAsync = () => (dispatch, getState) => {
  const state = getState();
  if (state.groups != null) return Promise.resolve();
  getGroupsApi().then(payload => {
    dispatch(getGroups(payload));
    if (state.kidsView.activeGroupId === null)
      dispatch(setActiveGroupId(payload[0].groupId));
  });
};
