export const GET_SKILLS = "GET_SKILLS";
export const ADD_SKILLGROUP = "ADD_SKILLGROUP";
export const ADD_SKILL = "ADD_SKILL";
export const UPDATE_SKILL = "UPDATE_SKILL";
export const UPDATE_SKILLGROUP = "UPDATE_SKILLGROUP";
export const REMOVE_SKILLGROUP = "REMOVE_SKILLGROUP";
export const REMOVE_SKILL = "REMOVE_SKILL";

export const getSkills = payload => ({
  type: GET_SKILLS,
  payload
});

export const addSkillGroup = groupName => ({
  type: ADD_SKILLGROUP,
  payload: {
    ...groupName,
    skillGroupId: Date.now(),
    skills: []
  }
});

export const addSkill = payload => ({
  type: ADD_SKILL,
  payload
});

export const updateSkill = payload => ({
  type: UPDATE_SKILL,
  payload
});

export const updateSkillGroup = payload => ({
  type: UPDATE_SKILLGROUP,
  payload
});

export const removeSKillGroup = payload => ({
  type: REMOVE_SKILLGROUP,
  payload
});

export const removeSkill = payload => ({
  type: REMOVE_SKILL,
  payload
});
