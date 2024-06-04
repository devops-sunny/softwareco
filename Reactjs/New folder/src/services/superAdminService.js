import ApiService from "./ApiService";
import { API_URL } from "./AxiosInterceptor";
let URL = API_URL + "superadmin/";


export const workspacesremove = (id) => {
    return ApiService.Delete(`${URL}workspaces/${id}`);
};
  
export const workspacesadd = (data) => {
    return ApiService.post(`${URL}workspaces/`,data);
};
  
export const workspacesput = (id ,data) => {
    return ApiService.put(`${URL}workspaces/${id}` ,data);
};

export const employeesworkspaces = () => {
    return ApiService.get(`${URL}employeesworkspaces`);
};
  

