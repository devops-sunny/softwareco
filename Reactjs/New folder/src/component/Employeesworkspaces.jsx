import { useEffect, useState } from "react";
import TreeView from "./TreeView";
import { employeesworkspaces } from "../services/superAdminService";

const Employeesworkspaces = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    employeesworkspaces().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div className="details">
      <div className="items">
        <div className="cardHeader">
          <TreeView data={data} />
        </div>
      </div>
    </div>
  );
};

export default Employeesworkspaces;
