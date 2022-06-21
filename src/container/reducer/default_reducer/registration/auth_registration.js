import React from 'react'
import { object } from "prop-types"
import { REGISTER_SUCCESS,ERROR_IN_REGISTER} from '../../../../action/types'
const INITIAL_STATE={
    username:'',
    error_msg:'',
    
}

export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case REGISTER_SUCCESS:
            return Object.assign({},state,{username:action.data.username,error_msg:""})
        case ERROR_IN_REGISTER:
            return Object.assign({},state,{error_msg:action.data})
       
        default:
            return state
            
    }
}