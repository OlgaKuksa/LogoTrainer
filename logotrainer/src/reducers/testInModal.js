import { ADD_TESTMODAL, REMOVE_TESTMODAL } from "../actions/testInModal";

const DEFAULT_STATE = null;

const testInModal = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_TESTMODAL:
      return action.payload;
    case REMOVE_TESTMODAL:
      return null;
    default:
      return state;
  }
};

export default testInModal;
