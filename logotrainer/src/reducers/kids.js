import { GET_KIDS, UPDATE_KID, ADD_KID } from "../actions/kids";

const DEFAULT_STATE = [
  {
    id: 1,
    firstName: "Егор",
    lastName: "Иванов",
    dateOfBirth: "2012-05-19",
    group: 1,
    isArchived: false
  },
  {
    id: 2,
    firstName: "Анастасия",
    lastName: "Семенова",
    dateOfBirth: "2012-03-15",
    group: 2,
    isArchived: false
  },
  {
    id: 3,
    firstName: "Иван",
    lastName: "Алексин",
    dateOfBirth: "2011-12-24",
    group: 1,
    isArchived: false
  }
];

const kids = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_KIDS:
      return action.payload || DEFAULT_STATE;
    case ADD_KID:
      return [...state, action.payload];
    case UPDATE_KID:
      return state.map(
        kid =>
          kid.id === action.payload.id ? { ...kid, ...action.payload } : kid
      );
    default:
      return state;
  }
};

export default kids;
