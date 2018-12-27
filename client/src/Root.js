import React from "react";
import {Provider} from "react-redux";
import { createStore, applyMiddleware, compose} from "redux";
import reduxThunk from 'redux-thunk'; 
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));

export default ({children, initialState = {}}) => {
    const createStoreWithMiddleware = composeEnhancers(applyMiddleware(reduxThunk)(createStore));
    return(
     // data returned from reducers acts as redux store
    <Provider store={createStoreWithMiddleware(reducers, initialState)}>
        {children}
    </Provider>
   )    
}