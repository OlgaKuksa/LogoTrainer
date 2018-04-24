import {
  SET_ACTIVE_GROUP,
  CHANGE_GRADUATES_VISIBILITY
} from "../actions/kidsView";

const DEFAULT_STATE = {
  activeGroup: 1,
  graduatesVisibility: false
};

const kidsView = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_ACTIVE_GROUP:
      return { ...state, activeGroup: action.payload };
    case CHANGE_GRADUATES_VISIBILITY:
      return { ...state, graduatesVisibility: action.payload };
    default:
      return state;
  }
};

export default kidsView;
