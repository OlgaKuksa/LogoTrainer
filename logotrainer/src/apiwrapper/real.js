import fetch from "cross-fetch";
const uuid = require("uuid/v4");

// const allSkills = [
//   {
//     skillGroupId: "1",
//     skillGroupName: "Звукопроизношение",
//     skills: [
//       {
//         skillId: "11",
//         skillName: "Произношение свистящих 11",
//         skillQuestion:
//           "Произносит ли ребенок звуки с-сь, з-зь (всегда и чисто)?",
//         skillLevels: [
//           {
//             levelId: "110",
//             levelNumber: 100,
//             levelText: "Да, всегда"
//           },
//           {
//             levelId: "111",
//             levelNumber: 80,
//             levelText: "Практически всегда, но иногда заменяет их другими"
//           },
//           {
//             levelId: "112",
//             levelNumber: 50,
//             levelText: "Иногда получается произносить, но чаще нет"
//           },
//           {
//             levelId: "113",
//             levelNumber: 10,
//             levelText:
//               "Ребенок совсем не произносит звуки или произносит очень редко"
//           }
//         ]
//       },
//       {
//         skillId: "12",
//         skillName: "Произношение шипящих 12",
//         skillQuestion: "Произносит ли ребенок чисто звуки ш, ж, ч, щ?",
//         skillLevels: [
//           {
//             levelId: "120",
//             levelNumber: 100,
//             levelText: "Да, всегда"
//           },
//           {
//             levelId: "121",
//             levelNumber: 75,
//             levelText:
//               "Практически всегда, но иногда заменяет их другими (сь, ць и т.п.)"
//           },
//           {
//             levelId: "122",
//             levelNumber: 50,
//             levelText: "Иногда получается проскакивает, но чаще нет"
//           },
//           {
//             levelId: "123",
//             levelNumber: 0,
//             levelText: "Совсем не произносит"
//           }
//         ]
//       }
//     ]
//   },
//   {
//     skillGroupId: "2",
//     skillGroupName: "Грамматический строй речи",
//     skills: [
//       {
//         skillId: "21",
//         skillName: "Составление предложения 21",
//         skillQuestion:
//           "Говорит ли ребенок правильными развернутыми предложениями (всегда или почти всегда)?",
//         skillLevels: [
//           {
//             levelId: "210",
//             levelNumber: 100,
//             levelText: "Да, всегда"
//           },
//           {
//             levelId: "211",
//             levelNumber: 80,
//             levelText: "Предложения правильные, но не очень развернутые"
//           },
//           {
//             levelId: "212",
//             levelNumber: 60,
//             levelText:
//               "Предложения есть, но есть небольшие ошибки (например, в предлогах)"
//           },
//           {
//             levelId: "213",
//             levelNumber: 25,
//             levelText:
//               "Грамматический строй серьезно нарушен (например, не согласуются подлежащее и сказуемое, порядок слов нарушается)"
//           },
//           {
//             levelId: "214",
//             levelNumber: 5,
//             levelText: "Есть отдельные слова"
//           }
//         ]
//       }
//     ]
//   }
// ];

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
    kidProfileId: "11111",
    kidId: 1,
    createDateTime: new Date(),
    testResult: {
      "11": "110",
      "12": "121",
      "21": "212"
    }
  }
];

export const getSkillsApi = () => {
  return fetch("./api/SkillGroup/GetAll", { credentials: "include" })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      return res;
    });
  //return Promise.resolve([...allSkills]);
};

export const addSkillGroupApi = skillGroup => {
  return fetch("./api/SkillGroup/Add", {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(skillGroup)
  }).then(() => skillGroup);
};

export const updateSkillGroupApi = payload => {
  return fetch("./api/SkillGroup/Update", {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(payload)
  }).then(() => payload);
};

export const addSkillApi = payload => {
  //TODO
  return Promise.resolve(payload);
};

export const updateSkillApi = payload => {
  //TODO
  return Promise.resolve(payload);
};

export const removeSkillApi = payload => {
  //TODO
  return Promise.resolve(payload);
};

export const removeSkillGroupApi = payload => {
  return fetch("./api/SkillGroup/Remove", {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "post",
    body: JSON.stringify(payload)
  }).then(() => payload);
};

export const getExerciseListApi = filter => {
  return Promise.resolve(
    allExercises.filter(
      exercise => exercise.exerciseMainLevelId === filter.mainLevelId
    )
  );
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
    kidProfileId: uuid(),
    kidId,
    testResult: { ...testResult },
    createDateTime: new Date()
  };
  TestResults = [...TestResults, addedData];
  return Promise.resolve(addedData);
};

export const getTestResultsApi = kidId => {
  return Promise.resolve(
    TestResults.filter(resultObject => resultObject.kidId === kidId)
  );
};
//begin: kids
let allKids = [
  {
    kidId: 1,
    firstName: "Егор",
    lastName: "Иванов",
    dateOfBirth: "2012-05-19",
    groupId: 1,
    isArchived: false
  },
  {
    kidId: 2,
    firstName: "Анастасия",
    lastName: "Семенова",
    dateOfBirth: "2012-03-15",
    groupId: 2,
    isArchived: false
  },
  {
    kidId: 3,
    firstName: "Иван",
    lastName: "Алексин",
    dateOfBirth: "2011-12-24",
    groupId: 1,
    isArchived: false
  }
];
export const getKidsApi = () => {
  return Promise.resolve([...allKids]);
};
export const addKidApi = payload => {
  const toAdd = { ...payload, kidId: uuid() };
  allKids = [...allKids, toAdd];
  return Promise.resolve(toAdd);
};
export const updateKidApi = payload => {
  allKids = allKids.map(
    kid => (kid.kidId === payload.kidId ? { ...kid, ...payload } : kid)
  );
  return Promise.resolve(payload);
};
//end: kids
//begin: groups
const allGroups = [
  { groupId: "1", groupNumber: "1" },
  { groupId: "2", groupNumber: "2" },
  { groupId: "3", groupNumber: "3" }
];
export const getGroupsApi = () => {
  return Promise.resolve([...allGroups]);
};
//end: groups

//begin: sets
let sets = [];

export const getSetListApi = kidId => {
  let setsForKid = sets.filter(item => item.kidId === kidId);
  return Promise.resolve(setsForKid);
};

export const generateSetApi = (kidId, skillList) => {
  let defaultSetObject = {
    kidSetId: uuid(),
    createDateTime: new Date(),
    kidId,
    exerciseIdsInSet: allExercises
      .filter(item => skillList.includes(item.exerciseMainSkillId))
      .map(item => item.exerciseId)
  };
  if (defaultSetObject.exerciseIdsInSet.length === 0)
    return Promise.resolve({});
  sets = [...sets, defaultSetObject];
  return Promise.resolve(defaultSetObject);
};

export const getSetExercisesApi = setId => {
  let thisSet = sets.find(item => item.kidSetId === setId);
  return Promise.resolve(
    allExercises.filter(exercise =>
      thisSet.exerciseIdsInSet.includes(exercise.exerciseId)
    )
  );
};

//end:sets
