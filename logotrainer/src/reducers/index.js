import {combineReducers} from 'redux';
import kidInModal from './kidInModal';
import kids from './kids';
import kidInPage from './kidInPage';
import exerciseInModal from './exerciseInModal';
import skills from './skills';

const appReducers=combineReducers({kids, kidInModal, kidInPage, exerciseInModal, skills});

export default appReducers;
