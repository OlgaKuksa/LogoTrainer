import {
  GET_SKILLS,
  ADD_SKILLGROUP,
  ADD_SKILL,
  UPDATE_SKILL,
  UPDATE_SKILLGROUP,
  REMOVE_SKILLGROUP,
  REMOVE_SKILL
} from "../actions/skills";

const DEFAULT_STATE = null;

const skills = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_SKILLS:
      return action.payload;
    case ADD_SKILLGROUP: {
      return [...state, action.payload];
    }
    case UPDATE_SKILLGROUP:
      return state.map(
        skillGroup =>
          skillGroup.skillGroupId === action.payload.skillGroupId
            ? { ...skillGroup, ...action.payload }
            : skillGroup
      );
    case REMOVE_SKILLGROUP:
      return state.filter(
        item => item.skillGroupId !== action.payload.skillGroupId
      );
    case ADD_SKILL:
      return state.map(
        group =>
          group.skillGroupId != action.payload.skillGroupId
            ? group
            : { ...group, skills: [...group.skills, action.payload.skill] }
      );
    case REMOVE_SKILL:
      return state.map(
        group =>
          group.skillGroupId != action.payload.skillGroupId
            ? group
            : {
                ...group,
                skills: group.skills.filter(
                  skill => skill.skillId != action.payload.skillId
                )
              }
      );
    case UPDATE_SKILL:
      return state.map(
        group =>
          group.skillGroupId != action.payload.skillGroupId
            ? group
            : {
                ...group,
                skills: group.skills.map(
                  skill =>
                    skill.skillId != action.payload.skillToUpdate.skillId
                      ? skill
                      : action.payload.skillToUpdate
                )
              }
      );
    default:
      return state;
  }
};

export default skills;
