import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  alertType: null,
};


const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    successAlert: (state, action) => {
      state.message = action.payload;
      state.alertType = "success";
    },
    warningAlert: (state, action) => {
      state.message = action.payload;
      state.alertType = "warning";
    },
    infoAlert: (state, action) => {
      state.message = action.payload;
      state.alertType = "info";
    },
    errorAlert: (state, action) => {
      state.message = action.payload;
      state.alertType = "error";
    },
    clearAlert: (state) => {
      state.message = "";
      state.alertType = null;
    },
  },
});

export const { successAlert, warningAlert, infoAlert, errorAlert, clearAlert } =
  alertsSlice.actions;

export default alertsSlice.reducer;
