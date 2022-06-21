import * as View_service from '../../container/service/view/view_service'
import {ERROR_IN_RETERIVING,RETRIVE_USERS,DELETE_SUCCESS,ERROR_IN_DELETING,ERROR_IN_SELECTING,VIEW_SELECTED_USER,SEARCH_DATA_SUCCESS,ERROR_IN_SEARCHING} from '../types'
import { returnStatement } from '@babel/types'
export const view_users=(credentials)=>{
  
    return(dispatch,getState)=>{
        return new Promise((resolve,reject)=>{
            View_service.view(credentials)
            .then((res)=>{
                debugger;
            
                    if(res.status==200){
                        console.log("data",res)
                        dispatch({
                            type:RETRIVE_USERS,
                            data:res.data.player,
                            total_record:res.data.total_record,
                            current_page:res.data.current_page
                        })
                       
                        return resolve(res.data)
                    }
            }).catch((error)=>{
                debugger;              
                dispatch({
                    type:ERROR_IN_RETERIVING,
                    data:error.data
                })

                return reject(error.data)
            })
        })
    }
}
export const search_user_data=(credentials)=>{
  
    return(dispatch,getState)=>{
        return new Promise((resolve,reject)=>{
            View_service.search(credentials)
            .then((res)=>{
            
                    if(res.status==200){
                        console.log("data",res)
                        debugger;
                        dispatch({
                            type:SEARCH_DATA_SUCCESS,
                            data:res.data.player,
                            total_record:res.data.total_record,
                            current_page:res.data.current_page
                        })
                       
                        return resolve(res.data)
                    }
            }).catch((error)=>{
              debugger;
                dispatch({
                    type:ERROR_IN_SEARCHING,
                    data:error.response.data
                })

                return reject(error.response.data)
            })
        })
    }
}

export const delete_player=(credential)=>{
    return (dispatch,getstate)=>{
        return new Promise((resolve,reject)=>{
            View_service.delete_user(credential)
            .then((res)=>{
                if(res.status==200)
                {
                    console.log(res.data)
                    debugger;
                    dispatch({
                        type:DELETE_SUCCESS,
                        data:{id:res.data._id,data:res.data}

                    })
                }
                return resolve(res.data)
            }).catch((error)=>{
                debugger;
                dispatch({
                    type:ERROR_IN_DELETING,
                    data:error.data
                })
                return reject(error.data)
            })
            
        })
    }

}

export const user_view_by_id=(credential)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve,reject)=>{
            View_service.view_by_id(credential)
            .then((res)=>{
                if(res.status==200){
                    console.log(res)
                    debugger;
                    dispatch({
                        type:VIEW_SELECTED_USER,
                        data:{data:res.data}
                    })
                    return resolve(res.data)
                }
            }).catch((error)=>{
                debugger;
                dispatch({
                    type:ERROR_IN_SELECTING,
                    data:error.data
                })
                return reject(error.data)
            })
        })
    }
}
