import { combineReducers } from 'redux'
import auth_login from './default_reducer/login/auth_login'
import auth_register from './default_reducer/registration/auth_registration'

import view_user from './default_reducer/view/view_user'
import view_selected_user from './default_reducer/view/view_selected_user'

export default combineReducers({auth_login,auth_register,view_user,view_selected_user})