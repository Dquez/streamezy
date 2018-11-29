import {combineReducers} from 'redux';
import GoogleAuthReducer from './GoogleAuthReducer';
export default combineReducers({
    auth:  GoogleAuthReducer
})