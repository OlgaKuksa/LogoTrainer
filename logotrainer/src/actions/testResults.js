import { addTestResultApi } from "../ApiWrapper";
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

export const addTestResultAsync = testResult => dispatch => {
  return addTestResultApi(testResult).then(payload => addTestResult(payload));
};
