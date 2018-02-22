export const ADD_TO_MODAL = "ADD_TO_MODAL";
export const CLEAR_MODAL = "CLEAR_MODAL";

export const addToModal = payload => ({
  type: ADD_TO_MODAL,
  payload
});

export const clearModal=payload=>
({
    type:CLEAR_MODAL,
    payload
})
