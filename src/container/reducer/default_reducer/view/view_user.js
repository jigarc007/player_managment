import {RETRIVE_USERS,ERROR_IN_RETERIVING,DELETE_SUCCESS,ERROR_IN_DELETING,EDIT_SUCCESS,ERROR_IN_EDITING, VIEW_SELECTED_USER, SEARCH_DATA_SUCCESS, ERROR_IN_SEARCHING} from '../../../../action/types' 
const INTIAL_STATE={
    data:[],
    current_page:'',
    total_record:'',
    error_msg:'',
    id:''
}
export default (state=INTIAL_STATE,action)=>{
    switch (action.type) {
        case RETRIVE_USERS:
           return  Object.assign({},state,{data:action.data,total_record:action.total_record,current_page:action.current_page,error_msg:""})
        case ERROR_IN_RETERIVING:
            return  Object.assign({},state,{error_msg:action.data.error_msg})
        case SEARCH_DATA_SUCCESS:
            debugger;
            return  Object.assign({},state,{data:action.data,total_record:action.total_record,current_page:action.current_page,error_msg:""})
        case ERROR_IN_SEARCHING:
            return  Object.assign({},state,{error_msg:action.data.error_msg})
        case DELETE_SUCCESS:
            
            return {data:state.data.filter(data=>data._id!==action.data.id),current_page:state.current_page,total_record:state.total_record}
            
        case ERROR_IN_DELETING:    
        return  Object.assign({},state,{error_msg:action.data})
        case EDIT_SUCCESS:
            return {data:state.data.map(data=>data._id===action.data.id?action.data:data),current_page:state.current_page,total_record:state.total_record}
        case ERROR_IN_EDITING:
            return  Object.assign({},state,{error_msg:action.data})                
        default:
          return state;
    }
}
