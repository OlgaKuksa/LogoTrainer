import {combineReducers} from 'redux';
import kidInModal from './kidInModal';
import kids from './kids';
import kidInPage from './kidInPage';
import exerciseInModal from './exerciseInModal';
import skills from './skills';
import skillInModal from './skillInModal';
import skillGroupInModal from './skillGroupInModal';

const appReducers=combineReducers({kids, kidInModal, kidInPage, exerciseInModal, skills, skillInModal, skillGroupInModal});

export default appReducers;
