import { v4 as guid } from "uuid";
import {
  getSkillsApi,
  addSkillGroupApi,
  addSkillApi,
  updateSkillApi,
  updateSkillGroupApi,
  removeSkillApi,
  removeSkillGroupApi
} from "../apiwrapper";
import { updateFilter } from "./exerciseFilter";

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
  return getSkillsApi().then(payload => {
    dispatch(getSkills(payload));
    dispatch(
      updateFilter({
        mainSkillId: payload[0].skills[0].skillId,
        mainLevelId: payload[0].skills[0].skillLevels[0].levelId
      })
    );
  });
};

export const addSkillGroup = skillGroup => ({
  type: ADD_SKILLGROUP,
  payload: {
    skillGroupId: guid(),
    skills: [],
    ...skillGroup
  }
});

export const addSkillGroupAsync = skillGroup => dispatch => {
  const action = addSkillGroup(skillGroup);
  addSkillGroupApi(action.payload).then(() => dispatch(action));
};

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
export const addSkillAsync = skillData => (dispatch, getState) => {
  const action = addSkill(skillData);
  const state = getState();
  addSkillApi(action.payload).then(() => {
    let shouldUpdateExerciseFilter =
      state.skills.filter(skillgroup => skillgroup.skills.length > 0).length ===
      0;
    dispatch(action);
    console.log(action);
    shouldUpdateExerciseFilter &&
      dispatch(
        updateFilter({
          mainSkillId: action.payload.skill.skillId,
          mainLevelId: action.payload.skill.skillLevels[0].levelId
        })
      );
  });
};
export const updateSkill = skillData => ({
  type: UPDATE_SKILL,
  payload: {
    skillGroupId: skillData.skillGroupId,
    skillToUpdate: skillData.skill
  }
});

export const updateSkillAsync = skillData => dispatch => {
  const action = updateSkill(skillData);
  updateSkillApi(action.payload).then(() => dispatch(action));
};

export const updateSkillGroup = payload => ({
  type: UPDATE_SKILLGROUP,
  payload
});

export const updateSkillGroupAsync = payload => dispatch => {
  const action = updateSkillGroup(payload);
  updateSkillGroupApi(action.payload).then(() => dispatch(action));
};

export const removeSkillGroup = payload => ({
  type: REMOVE_SKILLGROUP,
  payload
});

export const removeSkillGroupAsync = payload => dispatch => {
  const action = removeSkillGroup(payload);
  removeSkillGroupApi(action.payload).then(() => dispatch(action));
};
export const removeSkill = skillData => ({
  type: REMOVE_SKILL,
  payload: {
    skillGroupId: skillData.skillGroupId,
    skillId: skillData.skillId
  }
});

export const removeSkillAsync = skillData => (dispatch, getState) => {
  const action = removeSkill(skillData);
  removeSkillApi(action.payload).then(() => {
    dispatch(action);
    let state = getState();
    state.exerciseFilter.mainSkillId === skillData.skillId &&
      dispatch(
        updateFilter({
          mainSkillId: state.skills.find(
            skillgroup => skillgroup.skills.length > 0
          ).skills[0].skillId,
          mainLevelId: state.skills.find(
            skillgroup => skillgroup.skills.length > 0
          ).skills[0].skillLevels[0].levelId
        })
      );
  });
};
