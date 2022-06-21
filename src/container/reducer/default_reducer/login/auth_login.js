
import { LOGIN_SUCCESS,INVALID_USER,LOGOUT} from '../../../../action/types'
const INITIAL_STATE={
    id:'',
    token:'',
    error_msg:'',
    role:''
}


export default (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({},state,{id:action.data.id,token:action.data.token,role:action.data.role,error_msg:""})
        case INVALID_USER:
            return Object.assign({},state,{error_msg:action.data})
        case LOGOUT:
            return Object.assign({},state,{id:"",token:"",role:"",error_msg:""})
        default:
            return state
            
    }
}