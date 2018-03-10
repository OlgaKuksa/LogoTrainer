import { UPDATE_FILTER } from "../actions/exerciseFilter";

const DEFAULT_STATE = null;

const exerciseFilter = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return action.payload;
    default:
      return state;
  }
};

export default exerciseFilter;
