import { useSelector } from "react-redux";
import {Navigate } from "react-router-dom";

const useAuth = () => {
  const token = useSelector((state) => state.Auth.token);

  if (token) {
    return true;
  } else {
    return false;
  }
};

export default function PublicRoutes({ children , paths }) {
  const auth = useAuth();
  const role = useSelector((state) => state.Auth.role);

  if (auth) {
    if (role === "superadmin") {
      return <Navigate to="/superadmin" />;
    }
    if (role === "workspaceadmin") {
      return <Navigate to="/workspaceadmin" />;
    }
    if (role === "employee") {
      return <Navigate to="/employee" />;
    }
  } else {
    return <>{children}</>;
  }
};

