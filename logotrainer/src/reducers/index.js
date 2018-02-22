import {combineReducers} from 'redux';
import kidInModal from './kidInModal';
import kids from './kids';
import kidInPage from './kidInPage';

const appReducers=combineReducers({kids, kidInModal, kidInPage});

export default appReducers;
