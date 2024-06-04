import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupForm from "./Pages/SignupForm";
import LoginForm from "./Pages/Login";
import RoleBasedRoute from "./Routing/RoleBasedRoute";
import PublicRoutes from "./Routing/PublicRoutes";
import Workspaceadmin from "./Pages/Workspaceadmin/Workspace";
import Employees from "./Pages/Employee/Employees";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const privateAuth = [
    { roles: "login", path: "/", components: <LoginForm /> },
    { roles: "SignupForm", path: "/Signup", components: <SignupForm /> },
  ];

  const privateDashboard = [
    {
      roles: "employee",
      path: "/employee",
      components: <Employees  bit={true}  />,
      accessibleRoles: ["employee"],
    },
    {
      roles: "workspaceadmin",
      path: "/workspaceadmin",
      components: <Workspaceadmin />,
      accessibleRoles: ["workspaceadmin"],
    },
    {
      roles: "superadmin",
      path: "/superadmin",
      components: <Workspaceadmin />,
      accessibleRoles: ["superadmin"],
    },
  ];

  return (
    <>
    <ToastContainer />
      <Router>
        <Routes>
          {privateAuth.map((privateDB) => {
            return (
              true && (
                <Route
                  key={privateDB.path}
                  path={privateDB.path}
                  element={<PublicRoutes  paths={privateDB.path}>{privateDB.components}</PublicRoutes>}
                />
              )
            );
          })}
          {privateDashboard.map((privateDB) => {
            return (
              true && (
                <Route
                  key={privateDB.path}
                  path={privateDB.path}
                  element={
                    <RoleBasedRoute
                      accessibleRoles={privateDB.accessibleRoles}
                      paths={privateDB.path}
                    >
                      {privateDB.components}
                    </RoleBasedRoute>
                  }
                />
              )
            );
          })}
        </Routes>
      </Router>
    </>
  );
};
export default App;
