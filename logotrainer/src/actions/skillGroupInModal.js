export const ADD_SKILLGROUPMODAL='ADD_SKILLGROUPMODAL';
export const REMOVE_SKILLGROUPMODAL='REMOVE_SKILLGROUPMODAL';

export const addSkillGroupModal=payload=>({
    type:ADD_SKILLGROUPMODAL,
    payload
});

export const removeSkillGroupModal=payload=>({
    type:REMOVE_SKILLGROUPMODAL,
    payload
})