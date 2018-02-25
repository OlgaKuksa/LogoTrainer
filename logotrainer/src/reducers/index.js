import {combineReducers} from 'redux';
import kidInModal from './kidInModal';
import kids from './kids';
import kidInPage from './kidInPage';
import exerciseInModal from './exerciseInModal';

const appReducers=combineReducers({kids, kidInModal, kidInPage, exerciseInModal});

export default appReducers;
