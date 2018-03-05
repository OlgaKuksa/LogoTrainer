import { GET_KIDS, UPDATE_KID, ADD_KID } from "../actions/kids";

const DEFAULT_STATE = null;

const kids = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case GET_KIDS:
      return action.payload || DEFAULT_STATE;
    case ADD_KID:
      return [...state, action.payload];
    case UPDATE_KID:
      return state.map(
        kid =>
          kid.kidId === action.payload.kidId
            ? { ...kid, ...action.payload }
            : kid
      );
    default:
      return state;
  }
};

export default kids;
