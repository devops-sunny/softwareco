import React, {  useEffect, useState } from "react";
import { downloadCSV, employeesremove, getemployeespace } from "../../services/WorkspaceService";
import Workspacelist from "../../component/Workspacelist";
import EmployeeForm from "../../component/EmployeeForm";
import Modal from "../../component/Modal";

const AllEmployeeForm = ({ data }) => {
  const [alldata, setALLData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const remove = (id) => {
    employeesremove(id).then((res) => {
      getemployeespace().then(data => setALLData(data));
    });
  };


  useEffect(()=>{
    setALLData(data)
  },[data])

  const handleSearch = (event) => {
    const filteredEmployees = data.filter((employee) =>
      employee.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setALLData(filteredEmployees);
  };

  const openModal = (employeeId = null) => {
    setSelectedEmployee(employeeId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  };

  const handleSuccess = (newData) => {
    getemployeespace().then(data => setALLData(data));
    closeModal();
  };

  return (
    <>
      <div className="details">
        <div className="items">
          <div className="cardHeader">
            <h2>Employee </h2>
            <div className="search">
              <label>
                <input
                  type="text"
                  placeholder="Search here"
                  onChange={handleSearch}
                />
                <ion-icon
                  name="search-outline"
                  role="img"
                  className="md hydrated"
                  aria-label="search outline"
                />
              </label>
            </div>
            <div className="btn" onClick={downloadCSV}>
              View csv
            </div>
            <div className="btn" onClick={() => openModal()}>ADD Employee</div>
          </div>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Status</td>
                <td>Remove</td>
                <td>Edit</td>
              </tr>
            </thead>
            <tbody>
              {alldata?.map((employee) => {
                return (
                  <tr key={employee._id}>
                    <td>{employee?.name}</td>
                    <td>{employee?.email}</td>
                    <td>
                      {employee?.active ? (
                        <span className="status delivered">Activate</span>
                      ) : (
                        <span className="status return">Deactivate</span>
                      )}
                    </td>
               
                    <td>
                      <span
                        className="pending"
                        onClick={(e) => {
                          e.preventDefault();
                          remove(employee._id);
                        }}
                      >
                        Remove
                      </span>
                    </td>
                    <td onClick={() => openModal(employee)}>edit</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <Workspacelist />
        <Modal show={isModalOpen} onClose={closeModal}>
          <EmployeeForm employeeId={selectedEmployee} onSuccess={handleSuccess} />
        </Modal>
      </div>
    </>
  );
};

export default AllEmployeeForm;
