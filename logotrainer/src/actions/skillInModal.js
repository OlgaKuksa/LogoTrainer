export const ADD_SKILLMODAL = "ADD_SKILLMODAL";
export const REMOVE_SKILLMODAL = "REMOVE_SKILLMODAL";

export const addSkillModal = payload => ({
  type: ADD_SKILLMODAL,
  payload
});

export const removeSkillModal = payload => ({
  type: REMOVE_SKILLMODAL,
  payload
});
