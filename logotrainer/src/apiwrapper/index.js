const uuid = require("uuid/v4");

const allSkills = [
  {
    skillGroupId: "1",
    skillGroupName: "Звукопроизношение",
    skills: [
      {
        skillId: "11",
        skillName: "Произношение свистящих 11",
        skillQuestion:
          "Произносит ли ребенок звуки с-сь, з-зь (всегда и чисто)?",
        skillLevels: [
          {
            levelId: "110",
            levelNumber: 100,
            levelText: "Да, всегда"
          },
          {
            levelId: "111",
            levelNumber: 80,
            levelText: "Практически всегда, но иногда заменяет их другими"
          },
          {
            levelId: "112",
            levelNumber: 50,
            levelText: "Иногда получается произносить, но чаще нет"
          },
          {
            levelId: "113",
            levelNumber: 10,
            levelText:
              "Ребенок совсем не произносит звуки или произносит очень редко"
          }
        ]
      },
      {
        skillId: "12",
        skillName: "Произношение шипящих 12",
        skillQuestion: "Произносит ли ребенок чисто звуки ш, ж, ч, щ?",
        skillLevels: [
          {
            levelId: "120",
            levelNumber: 100,
            levelText: "Да, всегда"
          },
          {
            levelId: "121",
            levelNumber: 75,
            levelText:
              "Практически всегда, но иногда заменяет их другими (сь, ць и т.п.)"
          },
          {
            levelId: "122",
            levelNumber: 50,
            levelText: "Иногда получается проскакивает, но чаще нет"
          },
          {
            levelId: "123",
            levelNumber: 0,
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
        skillName: "Составление предложения 21",
        skillQuestion:
          "Говорит ли ребенок правильными развернутыми предложениями (всегда или почти всегда)?",
        skillLevels: [
          {
            levelId: "210",
            levelNumber: 100,
            levelText: "Да, всегда"
          },
          {
            levelId: "211",
            levelNumber: 80,
            levelText: "Предложения правильные, но не очень развернутые"
          },
          {
            levelId: "212",
            levelNumber: 60,
            levelText:
              "Предложения есть, но есть небольшие ошибки (например, в предлогах)"
          },
          {
            levelId: "213",
            levelNumber: 25,
            levelText:
              "Грамматический строй серьезно нарушен (например, не согласуются подлежащее и сказуемое, порядок слов нарушается)"
          },
          {
            levelId: "214",
            levelNumber: 5,
            levelText: "Есть отдельные слова"
          }
        ]
      }
    ]
  }
];

let allExercises = [
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

let TestResults = [
  {
    testResultId: "11111",
    kidId: 1,
    testDate: new Date(),
    testResult: {
      "11": "110",
      "12": "121",
      "21": "212"
    }
  }
];

export const getSkillsApi = () => {
  return Promise.resolve([...allSkills]);
};

export const addSkillGroupApi = skillGroup => {
  //TODO
  return Promise.resolve(skillGroup);
};

export const addSkillApi = payload => {
  //TODO
  return Promise.resolve(payload);
};

export const updateSkillApi = payload => {
  //TODO
  return Promise.resolve(payload);
};

export const updateSkillGroupApi = payload => {
  //TODO
  return Promise.resolve(payload);
};

export const removeSkillApi = payload => {
  //TODO
  return Promise.resolve(payload);
};

export const removeSkillGroupApi = payload => {
  //TODO
  return Promise.resolve(payload);
};

export const getExerciseListApi = () => {
  return Promise.resolve([...allExercises]);
};

export const addExerciseApi = exercise => {
  exercise.exerciseId = Date.now();
  allExercises.push(exercise);
  return Promise.resolve(exercise);
};

export const updateExerciseApi = exerciseToUpdate => {
  allExercises = [
    ...allExercises.map(
      exercise =>
        exercise.exerciseId !== exerciseToUpdate.exerciseId
          ? exercise
          : exerciseToUpdate
    )
  ];
  return Promise.resolve(exerciseToUpdate);
};

export const removeExerciseApi = exerciseToRemove => {
  allExercises = [
    ...allExercises.filter(
      exercise => exercise.exerciseId !== exerciseToRemove.exerciseId
    )
  ];
  return Promise.resolve(exerciseToRemove);
};

export const addTestResultApi = (kidId, testResult) => {
  let addedData = {
    testResultId: uuid(),
    kidId,
    testResult: { ...testResult },
    testDate: new Date()
  };
  TestResults = [...TestResults, addedData];
  return Promise.resolve(addedData);
};

export const getTestResultsApi = kidId => {
  console.log(kidId);
  console.log(TestResults.filter(resultObject => resultObject.kidId === kidId));
  return Promise.resolve(
    TestResults.filter(resultObject => resultObject.kidId === kidId)
  );
};
