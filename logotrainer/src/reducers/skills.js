import {
  GET_SKILLS,
  ADD_SKILLGROUP,
  ADD_SKILL,
  UPDATE_SKILL,
  UPDATE_SKILLGROUP,
  REMOVE_SKILLGROUP,
  REMOVE_SKILL
} from "../actions/skills";

const DEFAULT_STATE = [
  {
    skillGroupId: 1,
    skillGroupName: "Звукопроизношение",
    skills: [
      {
        skillId: 11,
        skillName: "Произношение свистящих",
        skillQuestion:
          "Произносит ли ребенок звуки с-сь, з-зь (всегда и чисто)?",
        skillLevels: [
          {
            levelId: 111,
            levelNumber: 1,
            levelText: "Практически всегда, но иногда заменяет их другими"
          },
          {
            levelId: 112,
            levelNumber: 2,
            levelText: "Иногда получается произносить, но чаще нет"
          },
          {
            levelId: 113,
            levelNumber: 3,
            levelText:
              "Ребенок совсем не произносит звуки или произносит очень редко"
          }
        ]
      },
      {
        skillId: 12,
        skillName: "Произношение шипящих",
        skillQuestion: "Произносит ли ребенок чисто звуки ш, ж, ч, щ?",
        skillLevels: [
          {
            levelId: 111,
            levelNumber: 1,
            levelText:
              "Практически всегда, но иногда заменяет их другими (сь, ць и т.п.)"
          },
          {
            levelId: 112,
            levelNumber: 2,
            levelText: "Иногда получается проскакивает, но чаще нет"
          },
          {
            levelId: 113,
            levelNumber: 3,
            levelText: "Совсем не произносит"
          }
        ]
      }
    ]
  },
  {
    skillGroupId: 2,
    skillGroupName: "Грамматический строй речи",
    skills: [
      {
        skillId: 21,
        skillName: "Составление предложения",
        skillQuestion:
          "Говорит ли ребенок правильными развернутыми предложениями (всегда или почти всегда)?",
        skillLevels: [
          {
            levelId: 211,
            levelNumber: 1,
            levelText: "Предложения правильные, но не очень развернутые"
          },
          {
            levelId: 212,
            levelNumber: 2,
            levelText:
              "Предложения есть, но есть небольшие ошибки (например, в предлогах)"
          },
          {
            levelId: 213,
            levelNumber: 3,
            levelText:
              "Грамматический строй серьезно нарушен (например, не согласуются подлежащее и сказуемое, порядок слов нарушается)"
          },
          {
            levelId: 214,
            levelNumber: 3,
            levelText: "Есть отдельные слова"
          }
        ]
      }
    ]
  }
];

const skills = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case ADD_SKILLGROUP: {
      console.log(action.payload);
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
    default:
      return state;
  }
};

export default skills;
