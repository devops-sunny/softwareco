import React from "react";

const UpdateProfileForm = ({ employee }) => {
  const pieChartStyle = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    backgroundImage: "conic-gradient(pink 70deg, lightblue 0 235deg, orange 0)",
  };

  return (
    <>
      <div className="details">
        <div className="items">
          <div className="cardHeader">
            <h2>User Info </h2>
          </div>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Address</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{employee?.name}</td>
                <td>{employee?.email}</td>
                <td>{employee?.mobile}</td>
                <td>{employee?.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="items">
          <div className="cardHeader">
            <h2> pie chat </h2>
            <div className="piechart" style={pieChartStyle}></div>
        </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfileForm;
