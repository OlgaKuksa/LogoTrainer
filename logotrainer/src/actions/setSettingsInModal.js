export const ADD_SETSETTINGSMODAL = "ADD_SETSETTINGSMODAL";
export const REMOVE_SETSETTINGSMODAL = "REMOVE_SETSETTINGSMODAL";

export const addSetSettingsModal = payload => ({
  type: ADD_SETSETTINGSMODAL,
  payload
});

export const removeSetSettingsModal = payload => ({
  type: REMOVE_SETSETTINGSMODAL,
  payload
});
