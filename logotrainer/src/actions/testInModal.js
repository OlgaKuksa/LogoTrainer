export const ADD_TESTMODAL = "ADD_TESTMODAL";
export const REMOVE_TESTMODAL = "REMOVE_TESTMODAL";
const uuid = require("uuid/v4");

export const addTestModal = payload => ({
  type: ADD_TESTMODAL,
  payload
});

export const removeTestModal = payload => ({
  type: REMOVE_TESTMODAL,
  payload
});
