import { addTestResultApi } from "../ApiWrapper";
import { removeTestModal } from "./testInModal";
export const GET_TESTRESULTS = "GET_TESTRESULTS";
export const ADD_TESTRESULT = "ADD_TESTRESULT";

export const getTestResults = payload => ({
  type: GET_TESTRESULTS,
  payload
});

const addTestResult = payload => ({
  type: ADD_TESTRESULT,
  payload
});

export const addTestResultAsync = (kidId, testResult) => dispatch => {
  return addTestResultApi(kidId, testResult).then(payload => {
    dispatch(addTestResult(payload));
    dispatch(removeTestModal());
  });
};
