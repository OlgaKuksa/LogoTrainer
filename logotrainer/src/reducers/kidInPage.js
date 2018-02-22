import { ADD_KID_TO_PAGE, CLEAR_KIDPAGE } from "../actions/kidInPage";

const DEFAULT_STATE = null;

const kidInPage = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_KID_TO_PAGE:
    return action.payload;
    case CLEAR_KIDPAGE:
    return DEFAULT_STATE;
    default:
      return state;
  }
};

export default kidInPage;