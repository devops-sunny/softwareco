import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.Auth.role);

  const signout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const links = [
    {
      role: "employee",
      to: "/employee",
      icon: "people-outline",
      title: "Employee",
    },
    {
      role: "workspaceadmin",
      to: "/workspaceadmin",
      icon: "people-outline",
      title: "Workspace Admin",
    },
    {
      role: "superadmin",
      to: "/superadmin",
      icon: "people-outline",
      title: "Dashboard",
    },
  ];

  return (
    <div className="navigation">
      <ul>
        <li>
          <Link to="/">
            <span className="icon"></span>
            <span className="title">softwareco</span>
          </Link>
        </li>
        {links
          .filter((link) => link.role === role)
          .map((link, index) => (
            <li key={index}>
              <Link to={link.to}>
                <span className="icon">
                  <ion-icon name={link.icon} />
                </span>
                <span className="title">{link.title}</span>
              </Link>
            </li>
          ))}
        <li onClick={signout}>
          <Link to="#">
            <span className="icon">
              <ion-icon name="log-out-outline" />
            </span>
            <span className="title">Sign Out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
