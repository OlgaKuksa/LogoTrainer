import {ADD_SKILLGROUPMODAL, REMOVE_SKILLGROUPMODAL} from '../actions/skillGroupInModal';
const DEFAULT_STATE=null;

const skillGroupInModal=(state=DEFAULT_STATE, action)=>{
    switch (action.type){
        case (ADD_SKILLGROUPMODAL):
        return action.payload;
        case (REMOVE_SKILLGROUPMODAL):
        return null;
        default:return state;
    }
};

export default skillGroupInModal;