export const ADD_TESTMODAL = "ADD_TESTMODAL";
export const REMOVE_TESTMODAL = "REMOVE_TESTMODAL";
//import { v4 as uuid } from "uuid";

export const addTestModal = payload => ({
  type: ADD_TESTMODAL,
  payload
});

export const removeTestModal = payload => ({
  type: REMOVE_TESTMODAL,
  payload
});
