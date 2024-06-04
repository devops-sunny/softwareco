import { useEffect, useState } from "react";
import Navigation from "../../Layout/Navigation";
import CardBox from "../../component/CardBox";
import { getemployeespace } from "../../services/WorkspaceService";
import Employees from "../Employee/Employees";
import AllEmployeeForm from "./AllEmployeeForm";
import Img  from "../../assets/imgs/customer02.jpg"
import Employeesworkspaces from "../../component/Employeesworkspaces";

const Workspace = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getemployeespace().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      <div className="container">
        <Navigation />
        <div className="main">
          <div className="topbar">
            <div className="toggle">
              <ion-icon name="menu-outline" />
            </div>
            <div className="search">
              <label>
                <input type="text" placeholder="Search here" />
                <ion-icon name="search-outline" />
              </label>
            </div>
            <div className="user">
              <img src={Img} alt="" />
            </div>
          </div>
          <CardBox />
          <Employees   bit={false}/>
          {data && <AllEmployeeForm data={data} />}
      <Employeesworkspaces />
        </div>
      </div>
    </>
  );
};

export default Workspace;
