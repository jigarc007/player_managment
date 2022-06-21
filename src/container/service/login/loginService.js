import baseService from '../baseservice'
export const playe_login=(credentials)=>{
  return  baseService.post("/login_player",credentials);
}