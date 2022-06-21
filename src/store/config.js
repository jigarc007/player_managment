import thunk from 'redux-thunk'
import React from 'react'
import rootReducer from '../container/reducer/index'
import {applyMiddleware,compose,createStore} from 'redux'

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);
const token=localStorage.getItem("token");
const role=localStorage.getItem("role");


const INITIAL_STATE={
  auth_login:{
  id:'',
  token:'',
  error_msg:'',
  role:''
  }
}
if(token){
  debugger;
  
  INITIAL_STATE.auth_login.token=token
  INITIAL_STATE.auth_login.role=role
  
}

export  default createStore(rootReducer,INITIAL_STATE,enhancer);
