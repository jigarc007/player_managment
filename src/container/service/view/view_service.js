import baseService from '../baseservice'
export function view(credential){
   debugger
   return baseService.get('/list_user?page='+credential.page+'&limit='+credential.limit)
}
export function delete_user(credential){
   return baseService.delete(`/delete_user/${credential.id}`)
}
export function edit(id,credential){
   return baseService.put(`/update_user/${id}`,credential)
}
export function view_by_id(credential){
   debugger;
   return baseService.post("/list_user_by_id",credential)
}
export function search(credential){
   debugger;
   return baseService.get('/search?page='+credential.page+'&search='+credential.search+'&filter='+credential.filter+'&type='+credential.type+'&limit='+credential.limit)
}
