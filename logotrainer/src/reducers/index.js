import {combineReducers} from 'redux';
import kidInModal from './kidInModal';
import kids from './kids';

const appReducers=combineReducers({kids, kidInModal});

export default appReducers;
