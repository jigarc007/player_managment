
import * as loginService from '../../container/service/login/loginService'
import { LOGIN_SUCCESS, INVALID_USER, LOGOUT } from '../types'
import { resolve } from 'dns'
import { reject } from 'q'

export const login_user = (credentials) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            loginService.playe_login(credentials)
                .then((res) => {
                    console.log(res)
                    if (res.status == 200) {
                        debugger;
                        localStorage.setItem("token", res.data.token)
                        localStorage.setItem("role", res.data.role)
                        dispatch({
                            type: LOGIN_SUCCESS,
                            data: { id: res.data.id, token: res.data.token, role: res.data.role }
                        })

                        debugger;
                        return resolve(res.data);

                    }
                }).catch((error) => {
                    debugger;
                    dispatch({
                        type: INVALID_USER,
                        data: error.data
                    })
                    debugger;

                    return reject(error.response.data)
                })

        })
    }
}
export const logout_user=()=>{
    return (dispatch)=>{
        dispatch({
            type:LOGOUT
        })
        localStorage.removeItem("token")
        localStorage.removeItem("role")

    }
}