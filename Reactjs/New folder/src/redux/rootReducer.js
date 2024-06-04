import { combineReducers } from "redux";
import AlertsReducer from "./Alerts/alertSlice";
import AuthReducer  from "./Auth/AuthProfile";

const rootReducer = combineReducers({
  Alerts: AlertsReducer,
  Auth :AuthReducer,
});

export default rootReducer;
