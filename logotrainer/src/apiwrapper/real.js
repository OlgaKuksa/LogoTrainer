import fetch from "cross-fetch";
const uuid = require("uuid/v4");

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
  }).then(res => res.json());
  //TODO check server responce
};

export const getExerciseListApi = filter => {
  return fetch("./api/Exercise/FindByFilter", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(filter)
  }).then(res => res.json());
};

export const addExerciseApi = exercise => {
  const toAdd = {
    ...exercise,
    exerciseId: uuid()
  };
  return fetch("./api/Exercise/Add", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(toAdd)
  }).then(() => toAdd);
};

export const updateExerciseApi = exerciseToUpdate => {
  return fetch("./api/Exercise/Update", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(exerciseToUpdate)
  }).then(() => exerciseToUpdate);
};

export const removeExerciseApi = exerciseToRemove => {
  return fetch("./api/Exercise/Remove", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify({
      exerciseId: exerciseToRemove.exerciseId
    })
  }).then(() => exerciseToRemove);
};

export const addTestResultApi = (kidId, testResult) => {
  const addedData = {
    kidProfileId: uuid(),
    kidId,
    testResult: {
      ...testResult
    },
    createDateTime: new Date()
  };

  return fetch("./api/KidProfile/Add", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify(addedData)
  }).then(() => addedData);
};

export const getTestResultsApi = kidId => {
  return fetch("./api/KidProfile/FindByKid", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify({
      kidId
    })
  }).then(res => res.json());
};
//begin: kids
export const getKidsApi = () => {
  return fetch("./api/Kid/GetAll", {
    credentials: "include"
  }).then(res => res.json());
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
  }).then(() => toAdd);
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

export const getSetListApi = kidId => {
  return fetch("./api/KidSet/FindByKid", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify({ kidId })
  }).then(res => res.json());
};

export const generateSetApi = (kidId, skillIds) => {
  return fetch("./api/KidSet/GenerateKidSet", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify({ kidId, skillIds })
  })
    .then(res => res.json())
    .then(
      res => (res.exerciseIdsInSet && res.exerciseIdsInSet.length ? res : {})
    );
};

export const getSetExercisesApi = kidSetId => {
  return fetch("./api/Exercise/FindByKidSet", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    method: "post",
    body: JSON.stringify({ kidSetId })
  }).then(res => res.json());
};

//end:sets
