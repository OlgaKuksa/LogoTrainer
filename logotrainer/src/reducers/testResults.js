import { GET_TESTRESULTS, ADD_TESTRESULT } from "../actions/testResults";
import { CLEAR_KIDPAGE } from "../actions/kidInPage";

const DEFAULT_STATE = null;

const testResults = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_TESTRESULTS:
      return action.payload;
    case ADD_TESTRESULT:
      state = state || [];
      return [...state, action.payload];
    case CLEAR_KIDPAGE:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export default testResults;
