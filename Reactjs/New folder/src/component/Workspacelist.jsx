import React, { useEffect, useState } from "react";
import { getviewWorkspaceData } from "../services/WorkspaceService";
import Img from "../assets/imgs/customer02.jpg";
import { useSelector } from "react-redux";
import { workspacesremove } from "../services/superAdminService";
import WorkspaceForm from "./WorkspaceForm";
import Modal from "./Modal";

const Workspacelist = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const role = useSelector((state) => state.Auth.role);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = () => {
    getviewWorkspaceData()
      .then((response) => setWorkspaces(response))
      .catch((error) => console.error("Error fetching workspaces:", error));
  };

  const handleDelete = (id) => {
    workspacesremove(id)
      .then(() => fetchWorkspaces())
      .catch((error) => console.error("Error deleting workspace:", error));
  };

  const handleSuccess = () => {
    fetchWorkspaces();
    setSelectedWorkspace(null);
    setIsModalOpen(false);
  };

  const openModal = (workspaceId = null) => {
    setSelectedWorkspace(workspaceId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedWorkspace(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal show={isModalOpen} onClose={closeModal}>
        <WorkspaceForm
          workspaceId={selectedWorkspace}
          onSuccess={handleSuccess}
          fetchWorkspaces={fetchWorkspaces}
        />
      </Modal>

      <div className="recentCustomers">
        <div className="cardHeader">
          <h2>Workspace list </h2>
          {role === "superadmin" && (
            <>
              <div className="btn" onClick={() => openModal()}>
                Add Workspace
              </div>
            </>
          )}
        </div>
        <table>
          <tbody>
            {workspaces?.map((item) => {
              return (
                <>
                  <tr>
                    <td width="60px">
                      <div className="imgBx">
                        <img src={Img} alt="" />
                      </div>
                    </td>
                    <td>
                      <h4>
                        <br />{" "}
                        <span>
                          {" "}
                          {item.name} &nbsp;&nbsp;
                          {item?.active ? (
                            <span class="status delivered">Activate</span>
                          ) : (
                            <span class="status return">Deactivate</span>
                          )}
                          &nbsp;
                        </span>
                        &nbsp;
                        {role === "superadmin" && (
                          <>
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(item._id);
                              }}
                            >
                              Remove
                            </span>{" "}
                            &nbsp;
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                openModal(item);
                              }}
                            >
                              Edit
                            </span>
                          </>
                        )}
                      </h4>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Workspacelist;
