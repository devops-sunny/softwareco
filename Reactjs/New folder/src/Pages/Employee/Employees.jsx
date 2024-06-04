import { useEffect, useState } from "react";
import Navigation from "../../Layout/Navigation";
import CardBox from "../../component/CardBox";
import { useSelector } from "react-redux";
import { getEmployeeId } from "../../services/Employ";
import UpdateProfileForm from "./UpdateProfileForm";
import Img from "../../assets/imgs/customer02.jpg";

const Employees = (bit) => {
  const id = useSelector((state) => state.Auth?.id);
  const role = useSelector((state) => state.Auth.role);

  const [data, setData] = useState();

  useEffect(() => {
    if (id) {
      getEmployeeId(id).then((res) => {
        setData(res);
      });
    }
  }, [id]);

  return (
    <>
      {!bit ? (
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
            {data && (
              <>
                <UpdateProfileForm employee={data} setData={setData} />
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          {role !== "employee" ? (
            <UpdateProfileForm employee={data} />
          ) : (
            <div className="container">
              <Navigation />
              <div className="main">
                <UpdateProfileForm employee={data} />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Employees;
