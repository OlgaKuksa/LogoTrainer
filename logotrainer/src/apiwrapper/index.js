const allSkills = [
  {
    skillGroupId: "1",
    skillGroupName: "Звукопроизношение",
    skills: [
      {
        skillId: "11",
        skillName: "Произношение свистящих",
        skillQuestion:
          "Произносит ли ребенок звуки с-сь, з-зь (всегда и чисто)?",
        skillLevels: [
          {
            levelId: "111",
            levelNumber: 1,
            levelText: "Практически всегда, но иногда заменяет их другими"
          },
          {
            levelId: "112",
            levelNumber: 2,
            levelText: "Иногда получается произносить, но чаще нет"
          },
          {
            levelId: "113",
            levelNumber: 3,
            levelText:
              "Ребенок совсем не произносит звуки или произносит очень редко"
          }
        ]
      },
      {
        skillId: "12",
        skillName: "Произношение шипящих",
        skillQuestion: "Произносит ли ребенок чисто звуки ш, ж, ч, щ?",
        skillLevels: [
          {
            levelId: "121",
            levelNumber: 1,
            levelText:
              "Практически всегда, но иногда заменяет их другими (сь, ць и т.п.)"
          },
          {
            levelId: "122",
            levelNumber: 2,
            levelText: "Иногда получается проскакивает, но чаще нет"
          },
          {
            levelId: "123",
            levelNumber: 3,
            levelText: "Совсем не произносит"
          }
        ]
      }
    ]
  },
  {
    skillGroupId: "2",
    skillGroupName: "Грамматический строй речи",
    skills: [
      {
        skillId: "21",
        skillName: "Составление предложения",
        skillQuestion:
          "Говорит ли ребенок правильными развернутыми предложениями (всегда или почти всегда)?",
        skillLevels: [
          {
            levelId: "211",
            levelNumber: 1,
            levelText: "Предложения правильные, но не очень развернутые"
          },
          {
            levelId: "212",
            levelNumber: 2,
            levelText:
              "Предложения есть, но есть небольшие ошибки (например, в предлогах)"
          },
          {
            levelId: "213",
            levelNumber: 3,
            levelText:
              "Грамматический строй серьезно нарушен (например, не согласуются подлежащее и сказуемое, порядок слов нарушается)"
          },
          {
            levelId: "214",
            levelNumber: 3,
            levelText: "Есть отдельные слова"
          }
        ]
      }
    ]
  }
];

const allExercises = [
  {
    exerciseId: "10001",
    exerciseName: "Фиксация языка вверху",
    exerciseInventory: "ватная палочка",
    exerciseSteps: "Помочь ребенку зафиксировать язык наверху",
    exerciseMainSkillId: "12",
    exerciseMainLevelId: "123",
    exerciseSecondarySkills: ["11"]
  },
  {
    exerciseId: "10002",
    exerciseName: "Автоматизация звука ш",
    exerciseInventory: "Лист со списком слов с буквой ш",
    exerciseSteps:
      "Читать слова. Заставлять ребенка повторять слова с буквой ш - повторять, если ошибается",
    exerciseMainSkillId: "12",
    exerciseMainLevelId: "121",
    exerciseSecondarySkills: []
  },
  {
    exerciseId: "10003",
    exerciseName: "Составление краткого рассказа",
    exerciseInventory: "Рассказ из 5 предложений",
    exerciseSteps:
      "Прочитать рассказ. По каждому предложению задать вопрос. Попросить ребенка пересказать",
    exerciseMainSkillId: "21",
    exerciseMainLevelId: "212",
    exerciseSecondarySkills: ["11", "12"]
  }
];

export const getAllSkills = () => {
  return Promise.resolve(allSkills);
};

export const getExerciseListApi = () => {
  return Promise.resolve(allExercises);
};
