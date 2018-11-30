import {combineReducers} from 'redux';
import GoogleAuthReducer from './GoogleAuthReducer';
import {reducer as formReducer} from 'redux-form';
export default combineReducers({
    auth:  GoogleAuthReducer,
    form: formReducer
})