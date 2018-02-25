export const ADD_EXERCISE_TO_MODAL='ADD_EXERCISE_TO_MODAL';
export const REMOVE_EXERCISE_FROM_MODAL='REMOVE_EXERCISE_FROM_MODAL';

export const addExerciseToModal=payload=>({
    type:ADD_EXERCISE_TO_MODAL,
    payload
});

export const removeExerciseFromModal=payload=>({
    type:REMOVE_EXERCISE_FROM_MODAL,
    payload
});