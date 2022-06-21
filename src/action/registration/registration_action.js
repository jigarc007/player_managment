import * as registerService from '../../container/service/Registration/registration_service'
import { REGISTER_SUCCESS,ERROR_IN_REGISTER} from '../types' 
import { resolve } from 'dns'
import { reject } from 'q'

export const player_registration=(credential)=>{
   
    return(dispatch,getState)=>{
        return new Promise((resolve,reject)=>{
            registerService.register_player(credential).then((res)=>{
                if(res.status==200){
                    localStorage.setItem("username",res.data.username)
                    console.log(res)
                
                    dispatch({
                        
                        type:REGISTER_SUCCESS,
                        data:res.data
                    })
                    return resolve(res.data);
                }
            }).catch((error) =>{
              
                dispatch({
                    type:ERROR_IN_REGISTER,
                    data:error.response.data
                })
                return reject(error.response.data)
            })
        })
        
    }
}
