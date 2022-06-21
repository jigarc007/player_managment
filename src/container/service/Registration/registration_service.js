import baseService from '../baseservice'
export function register_player(credential){
   return baseService.post("/create_player",credential)
}