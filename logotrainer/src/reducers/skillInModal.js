import {ADD_SKILLMODAL, REMOVE_SKILLMODAL} from '../actions/skillInModal';

const DEFAULT_STATE=null;

const skillInModal=(state=DEFAULT_STATE, action)=>{
    switch (action.type){
        case (ADD_SKILLMODAL):
        return action.payload;
        case (REMOVE_SKILLMODAL):
        return null;
        default:return state;
    }
};

export default skillInModal;