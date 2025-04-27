import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "../../helper/HelperTwo";
import { DataContext } from "../../../Context/HelperOne"; 
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import {
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoleCreate from "./RoleCreate";
import RoleEdit from "./RoleEdit";
import { Tooltip } from "react-tooltip";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchData } = useContext(DataContext);
  const [paginationData, setPaginationData] = useState(null);
  const [currentPage, setCurrentPage] = useState();
  const [roleCreateOpen, setRoleCreateOpen] = useState(false);
  const [roleEditOpen, setRoleEditOpen] = useState(false);
  const [roleViewOpen, setRoleViewOpen] = useState(false);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const [createStatus, setCreateStatus] = useState(1);
  const [editStatus, setEditStatus] = useState(1);
  const [deleteStatus, setDeleteStatus] = useState(1);
  const [selectedRoleIdCrypt, setSelectedRoleIdCrypt] = useState(null);
  const [deleteAlartMsg, setDeleteAlartMsg] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState(
    "Are you sure you want to delete the Role ?"
  );
  

  useEffect(() => {
    fetchRoles();
  }, [searchData, sortBy, sortDirection]);

  const fetchRoles = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      let endpoint = `public/api/admin/roles/pagination?page=${page}&orderBy=${sortBy}&order=${sortDirection}`;

      if (searchData) {
        endpoint += `&search=${searchData}`;
      }
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (response.data.success) {
        setRoles(response.data.roles.data);
        setPaginationData(response.data.roles);
        setCurrentPage(response.data.roles.current_page);
      } else {
        if (response.data.hasOwnProperty("validation_controller")) {
          setError(response.data.error + " Contact Admin");
        }
      }

      setLoading(false);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/crm/");
      }
      console.error("Error fetching roles:", error);
      setError("Network Failed. Please try again.");
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page !== "...") {
      fetchRoles(page);
    }
  };

  const tryAgain = () => {
    setError(null);
    fetchRoles();
  };

  const handleClick = () => {
    setRoleCreateOpen(true);
  };

  const handleClickForEdit = (id_crypt) => {
    setSelectedRoleIdCrypt(id_crypt);
    setRoleEditOpen(true);
  };

  const Delete = (id_crypt) => {
    setDeleteAlartMsg(true);
    setSelectedRoleIdCrypt(id_crypt);
  };

  const handleClickForDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.delete(
        `public/api/admin/roles/delete/${selectedRoleIdCrypt}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("Role Deleted successfully!");
        fetchRoles(currentPage);
        setDeleteAlartMsg(false);
      } else {
        setDeleteMsg(response.data.message);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/crm/");
      }
      console.error("Error:", error);
    }
  };

  const handleSort = (column) => {
    if (column === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleClose = () => {
    setRoleCreateOpen(false);
    setRoleEditOpen(false);

    if (roleEditOpen) {
      fetchRoles(currentPage);
    }

    if (roleCreateOpen) {
      setCurrentPage(1);
      fetchRoles(1);
    }
  };

  const closeModal = () => {
    setRoleCreateOpen(false);
    setRoleEditOpen(false);
  };

  if (loading) {
    return (
      <div class="h-screen bg-white">
        <div class="flex justify-center items-center h-full">
          <img
            class="h-16 w-16"
            src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
            alt="loader"
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <div className="animate-fadeInUp bg-white p-8 rounded-lg shadow-lg text-center">
          <p className="text-red-500 mb-4 font-semibold">{error}</p>
          <button
            type="button"
            onClick={tryAgain}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-300 transition-transform transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Roles
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the roles.
            </p>
          </div>
          {createStatus === 1 && (
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                onClick={handleClick}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Role
              </button>
            </div>
          )}
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8 cursor-pointer"
                      >
                        S.no
                      </th>
                      <th
                        scope="col"
                        onClick={() => handleSort("name")}
                        className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8 cursor-pointer"
                      >
                        Name
                        {sortBy === "name" && (
                          <span className="ml-1">
                            {sortDirection === "asc" ? "↑" : "↓"}
                          </span>
                        )}
                      </th>
                      <th
                       scope="col"
                       className="px-4 py-4 text-center text-sm font-semibold text-gray-900"
                      >
                        Color
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-4 text-center text-sm font-semibold text-gray-900"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {roles.length > 0 ? (
                      roles.map((role , index) => (
                        <tr key={role.phone_number}>
                          <td className="whitespace-nowrap text-sm font-sm text-gray-600 sm:pl-8">
                            {index + 1 + (currentPage - 1) * 10}
                          </td>
                          <td className="whitespace-nowrap text-center py-2 pl-4 text-sm font-medium text-gray-600 sm:pl-6 lg:pl-6">
                            {role.name}
                          </td>
                          <td className="whitespace-nowrap px-4 py-4 text-center text-sm text-gray-500">
                            <div >
                              {role?.color && (
                                <span
                                  className="rounded-lg border h-6 w-6 inline-block mr-1"
                                  style={{
                                    backgroundColor:
                                    role.color,
                                  }}
                                ></span>
                              )}
                              
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-4 py-3 text-center text-sm text-gray-500">
                            <div className="flex items-center justify-center space-x-2">
                              {/* <span className="cursor-pointer bg-blue-400 rounded-md p-1" onClick={() => handleClickForView(role.id_crypt)}>
                                                                <EyeIcon className="h-5 w-5 text-white" />
                                                            </span> */}
                              {editStatus === 1 && (
                                <span
                                  className="cursor-pointer bg-green-400 rounded-md p-1 my-anchor-edit"
                                  onClick={() =>
                                    handleClickForEdit(role.id_crypt)
                                  }
                                >
                                  <PencilSquareIcon className="h-5 w-5 text-white" />
                                  <Tooltip
                                    anchorSelect=".my-anchor-edit"
                                    place="top"
                                  >
                                    Edit
                                  </Tooltip>
                                </span>
                              )}

                              {deleteStatus === 1 && role.id != 1 && (
                                <span
                                  className="cursor-pointer bg-red-400 rounded-md p-1 my-anchor-delete"
                                  onClick={() => Delete(role.id_crypt)}
                                >
                                  <TrashIcon className="h-5 w-5 text-white" />
                                  <Tooltip
                                    anchorSelect=".my-anchor-delete"
                                    place="top"
                                  >
                                    Delete
                                  </Tooltip>
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="2"
                          className="text-center py-4 text-gray-500 text-sm"
                        >
                          No roles found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {paginationData && (
        <Pagination
          links={paginationData.links}
          currentPage={paginationData.current_page}
          totalResults={paginationData.total}
          from={paginationData.from}
          to={paginationData.to}
          lastPage={paginationData.last_page}
          onPageChange={handlePageChange}
        />
      )}

      {/*Modal Create */}
      <Transition.Root show={roleCreateOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setRoleCreateOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end lg:items-center  justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8  md:max-w-screen-md lg:max-w-screen-lg sm:w-full">
                  <div>
                    <RoleCreate close={handleClose} closeModal={closeModal} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Modal Create*/}

      {/*Modal Edit */}
      <Transition.Root show={roleEditOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setRoleEditOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end lg:items-center  justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8  md:max-w-screen-md lg:max-w-screen-lg sm:w-full">
                  <div>
                    <RoleEdit
                      close={handleClose}
                      roleId={selectedRoleIdCrypt}
                      closeModal={closeModal}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Modal Edit*/}

      {/*Modal View */}
      <Transition.Root show={roleViewOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setRoleViewOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end lg:items-center  justify-center min-h-full p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8  md:max-w-screen-md lg:max-w-screen-lg sm:w-full">
                  <div>
                    {/* <RoleView close={handleClose} closeModal={closeModal}> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Modal View*/}

      {/*DeleteAlert */}
      <Transition.Root show={deleteAlartMsg} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          onClose={() => {
            setDeleteAlartMsg(false);
          }}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      setDeleteAlartMsg(false);
                      setDeleteMsg(
                        "Are you sure you want to delete the Role ?"
                      );
                    }}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationCircleIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      Delete role
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{deleteMsg}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={handleClickForDelete}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => setDeleteAlartMsg(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/*End DeleteAlert */}
    </div>
  );
};

export default RoleList;
