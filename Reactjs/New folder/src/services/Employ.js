import ApiService from "./ApiService";
import { API_URL } from "./AxiosInterceptor";
let URL = API_URL + "employee/profile/";


export const getEmployeeId = (id, options = null) => {
  return ApiService.get(URL + id);
};

