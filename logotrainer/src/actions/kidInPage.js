export const ADD_KID_TO_PAGE = "ADD_KID_TO_PAGE";
export const CLEAR_KIDPAGE = "CLEAR_KIDPAGE";

export const addKidToPage = payload => ({
  type: ADD_KID_TO_PAGE,
  payload
});

export const clearKidPage = payload => ({
  type: CLEAR_KIDPAGE,
  payload
});
