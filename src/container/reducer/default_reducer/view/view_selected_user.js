import {VIEW_SELECTED_USER,ERROR_IN_SELECTING} from '../../../../action/types' 
const INTIAL_STATE={
    data:[],
    error_msg:'',
}
export default (state=INTIAL_STATE,action)=>{
    switch (action.type) {
        case VIEW_SELECTED_USER:
           return  Object.assign({},state,{data:action.data,error_msg:""})
        case ERROR_IN_SELECTING:
            return  Object.assign({},state,{error_msg:action.data})
        default:
          return state;
    }
}
