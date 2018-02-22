import { ADD_TO_MODAL, CLEAR_MODAL } from "../actions/kidInModal";

const DEFAULT_STATE = null;

const kidInModal = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_TO_MODAL:
      return action.payload;
    case CLEAR_MODAL:
      return null;
    default:
      return state;
  }
};

export default kidInModal;
