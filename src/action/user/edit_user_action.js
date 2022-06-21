import * as View_service from '../../container/service/view/view_service'
import {EDIT_SUCCESS,ERROR_IN_EDITING} from '../types'

export const edit_user=(id,credential)=>{
    return (dispatch,getState)=>{
        return new Promise((resolve,reject)=>{
            View_service.edit(id,credential)
            .then((res)=>{
                if(res.status==200){
                    console.log(res)
                    debugger;
                    dispatch({
                        type:EDIT_SUCCESS,
                        data:{data:res.data}
                    })
                    return resolve(res.data)
                }

            }).catch((error)=>{
                debugger;
                dispatch({
                    type:ERROR_IN_EDITING,
                    data:error.data
                })
                return reject(error.data)
            })
        })
    }
}
