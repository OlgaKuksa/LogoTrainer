import { v4 as guid } from "uuid";
import { getAllSkills } from "../ApiWrapper";

export const GET_SKILLS = "GET_SKILLS";
export const ADD_SKILLGROUP = "ADD_SKILLGROUP";
export const ADD_SKILL = "ADD_SKILL";
export const UPDATE_SKILL = "UPDATE_SKILL";
export const UPDATE_SKILLGROUP = "UPDATE_SKILLGROUP";
export const REMOVE_SKILLGROUP = "REMOVE_SKILLGROUP";
export const REMOVE_SKILL = "REMOVE_SKILL";

const getSkills = payload => ({
  type: GET_SKILLS,
  payload
});

export const getSkillsAsync = () => (dispatch, getState) => {
  const state = getState();
  if (state.skills) return Promise.resolve();
  return getAllSkills().then(payload => {
    dispatch(getSkills(payload));
  });
};

export const addSkillGroup = skillGroup => ({
  type: ADD_SKILLGROUP,
  payload: {
    ...skillGroup,
    skillGroupId: guid(),
    skills: []
  }
});

export const addSkill = skillData => ({
  type: ADD_SKILL,
  payload: {
    skillGroupId: skillData.skillGroupId,
    skill: {
      ...skillData.skill,
      skillId: guid()
    }
  }
});

export const updateSkill = skillData => ({
  type: UPDATE_SKILL,
  payload: {
    skillGroupId: skillData.skillGroupId,
    skillToUpdate: skillData.skill
  }
});

export const updateSkillGroup = payload => ({
  type: UPDATE_SKILLGROUP,
  payload
});

export const removeSkillGroup = payload => ({
  type: REMOVE_SKILLGROUP,
  payload
});

export const removeSkill = skillData => ({
  type: REMOVE_SKILL,
  payload: {
    skillGroupId: skillData.skillGroupId,
    skillId: skillData.skillId
  }
});
