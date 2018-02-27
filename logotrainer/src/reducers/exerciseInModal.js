import {
  ADD_EXERCISE_TO_MODAL,
  REMOVE_EXERCISE_FROM_MODAL
} from "../actions/exerciseInModal";

const DEFAULT_STATE = null;

const exerciseInModal = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_EXERCISE_TO_MODAL:
      return action.payload;
    case REMOVE_EXERCISE_FROM_MODAL:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export default exerciseInModal;
