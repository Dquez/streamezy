import {POST_STREAM} from '../actions/types';

export default function (state={}, action){
    switch (action.type){
        case POST_STREAM:
            return state;
        default: 
            return state;
    }
}