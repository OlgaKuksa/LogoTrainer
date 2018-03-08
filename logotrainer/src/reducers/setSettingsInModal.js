import {
  ADD_SETSETTINGSMODAL,
  REMOVE_SETSETTINGSMODAL
} from "../actions/setSettingsInModal";

const DEFAULT_STATE = null;

const setSettingsInModal = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_SETSETTINGSMODAL:
      return action.payload;
    case REMOVE_SETSETTINGSMODAL:
      return null;
    default:
      return state;
  }
};

export default setSettingsInModal;
