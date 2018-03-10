import { getTestResultsApi, getSetListApi } from "../apiwrapper";
import { getTestResults } from "./testResults";
import { getSetList } from "./setList";
export const ADD_KID_TO_PAGE = "ADD_KID_TO_PAGE";
export const CLEAR_KIDPAGE = "CLEAR_KIDPAGE";

const addKidToPage = payload => ({
  type: ADD_KID_TO_PAGE,
  payload
});

export const clearKidPage = payload => ({
  type: CLEAR_KIDPAGE,
  payload
});

export const addKidToPageAsync = kid => dispatch => {
  return getTestResultsApi(kid.kidId)
    .then(payload => dispatch(getTestResults(payload)))
    .then(() => getSetListApi(kid.kidId))
    .then(payload => dispatch(getSetList(payload)))
    .then(() => dispatch(addKidToPage(kid)));
};
