import axios from "axios";
import ApiService from "./ApiService";
import { API_URL } from "./AxiosInterceptor";
let URL = API_URL + "workspaceadmin/";

export const getemployeespace = () => {
  return ApiService.get(URL + "data");
};

export const employeesremove = (id) => {
  return ApiService.Delete(`${URL}employees/${id}`);
};

export const employeesadd = (data) => {
  return ApiService.post(`${URL}employees/`, data);
};

export const employeesput = (id, data) => {
  return ApiService.put(`${URL}employees/${id}`, data);
};

export const getviewWorkspaceData = () => {
  return ApiService.get(URL + "viewWorkspaceData");
};

export const downloadCSV = () => {
  console.log("hi");
  const token = localStorage.getItem("Token");
  axios({
    url: `${URL}export-employees`,
    method: "GET",
    responseType: "blob",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "employees.csv");
      document.body.appendChild(link);
      link.click();
    })
    .catch((error) => {
      console.error("Error downloading the file", error);
    });
};
