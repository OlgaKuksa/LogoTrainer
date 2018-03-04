import { GET_TESTRESULTS, ADD_TESTRESULT } from "../actions/testResults";

const DEFAULT_STATE = null;

const testResults = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_TESTRESULTS:
      return action.payload;
    case ADD_TESTRESULT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default testResults;
