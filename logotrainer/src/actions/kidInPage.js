import { getTestResultsApi } from "../apiwrapper";
import { getTestResults } from "./testResults";
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
    .then(() => dispatch(addKidToPage(kid)));
};
