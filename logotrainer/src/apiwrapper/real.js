import fetch from "cross-fetch";
const uuid = require("uuid/v4");

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
  return fetch("./api/SkillGroup/GetAll", {
    credentials: "include"
  }).then(res => res.json());
};

export const addSkillGroupApi = skillGroup => {
  return fetch("./api/SkillGroup/Add", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(skillGroup)
  }).then(() => skillGroup);
};

export const updateSkillGroupApi = payload => {
  return fetch("./api/SkillGroup/Update", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(payload)
  }).then(() => payload);
};

export const removeSkillGroupApi = payload => {
  return fetch("./api/SkillGroup/Remove", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(payload)
  }).then(() => payload);
};

export const addSkillApi = payload => {
  const { skill, skillGroupId } = payload;
  const skillForServer = {
    ...skill,
    skillGroupId
  };
  return fetch("./api/Skill/Add", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(skillForServer)
  }).then(() => payload);
};

export const updateSkillApi = payload => {
  const { skillToUpdate: skill, skillGroupId } = payload;
  const skillForServer = {
    ...skill,
    skillGroupId
  };
  return fetch("./api/Skill/Update", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(skillForServer)
  }).then(() => payload);
};

export const removeSkillApi = payload => {
  return fetch("./api/Skill/Remove", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(payload)
  }).then(() => payload);
  //TODO check server responce
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
    testResult: {
      ...testResult
    },
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
export const getKidsApi = () => {
  return fetch("./api/Kid/GetAll", { credentials: "include" }).then(res =>
    res.json()
  );
};
export const addKidApi = payload => {
  const toAdd = {
    ...payload,
    kidId: uuid()
  };
  return fetch("./api/Kid/Add", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(toAdd)
  });
};
export const updateKidApi = payload => {
  return fetch("./api/Kid/Update", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(payload)
  }).then(() => payload);
};
//end: kids
//begin: groups
export const getGroupsApi = () => {
  return fetch("./api/Group/GetAll", {
    credentials: "include"
  }).then(res => res.json());
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
