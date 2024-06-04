import { LoginIn, RegisterIn } from "../../services/AuthService";
import { AuthDetails } from "./AuthProfile";

export const loginAction = (data ,navigate) => {
    return function (dispatch) {
      LoginIn(data)
          .then((res) => {

            localStorage.setItem("Token",res?.token)
            localStorage.setItem("role",res?.role)
            
            if (res?.role === "superadmin") {
              navigate("/superadmin")
            }
            if (res?.role === "workspaceadmin") {
              navigate("/workspaceadmin")
            }
            if (res?.role === "employee") {
              navigate("/employee")
            }
  
            dispatch(AuthDetails(res));
          })
          .catch((error) => {
            console.log("error", error);
          });
      };
};

export const registerAction = (data) => {
    return function (dispatch) {
      RegisterIn(data)
          .then((res) => {
            console.log(res)
          })
          .catch((error) => {
            console.log("error", error);
          });
      };
};

  