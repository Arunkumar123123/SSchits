import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { XCircleIcon} from "@heroicons/react/20/solid";

const RoleAssignEdit = ({ close, roleAssignId , closeModal }) => {
  const [formData, setFormData] = useState({
    role_id: "",
    employee_id: "",
    employees: [],
    roles: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [validation, setValidation] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchRoleAssign = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    try {
      const response1 = await axios.get("public/api/admin/employees", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response2 = await axios.get("public/api/admin/roles", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const response3 = await axios.get(
        `public/api/admin/role/assign/edit/${roleAssignId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFormData({
        employee_id: response3.data.role_assign?.employee_id,
        role_id: response3.data.role_assign?.role_id,
      });
      setEmployees(response1.data.employees);
      setRoles(response2.data.roles);
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/crm/");
      }
      console.error("Error fetching employee types:", error);
      setError("Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoleAssign();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.put(
        `public/api/admin/role/assign/update/${roleAssignId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("Role Assigned successfully!");
        close();
      } else {
        setValidation(response.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/crm/");
      }
      console.error("Error:", error);
    }
  };

  const tryAgain = () => {
    setError(null);
    fetchRoleAssign();
  };

  return (
    <div>
      {loading ? (
        <div class="h-screen bg-white">
        <div class="flex justify-center items-center h-full">
          <img
            class="h-16 w-16"
            src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
            alt="loader"
          />
        </div>
      </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-300 bg-opacity-50 z-50">
        <div className="shadow-lg p-4 px-12 bg-white rounded-md flex flex-col items-center">
          <XCircleIcon className="h-12 w-12 text-red-600 opacity-75 mb-2" />
          <div className="mb-2 text-center text-gray-800 font-medium">
            {error}
          </div>
          <button
            onClick={tryAgain}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded"
          >
            Retry
          </button>
        </div>
      </div>
      ) : (
        <div>
          <div className="col-span-3 bg-gray-200 p-6">
            <div className="max-w-7xl mx-auto md:px-8 flex justify-between items-center">
              <dt className="text-xl font-medium leading-6">
                EDIT ROLE ASSIGN
              </dt>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="black"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div className="max-w-7xl  p-6 bg-gray-100 ">
            <div className="md:grid md:gap-6">
              <div className=" md:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className=" shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                          <label
                            htmlFor="employee_id"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Employee Name<span className="text-red-500">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="employee_id"
                              name="employee_id"
                              value={formData.employee_id}
                              onChange={handleChange}
                              disabled={true}
                              autoComplete="employee_id"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option value={""}>Select Employee</option>
                              {employees?.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
                            <p className="text-red-600 text-sm mt-1">
                              {validation.data?.employee_id}
                            </p>
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                          <label
                            htmlFor="role_id"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Role Name<span className="text-red-500">*</span>
                          </label>
                          <div className="mt-2">
                            <select
                              id="role_id"
                              name="role_id"
                              value={formData?.role_id}
                              onChange={handleChange}
                              autoComplete="role_id"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option value={""}>Select Role</option>
                              {roles?.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type?.name}
                                </option>
                              ))}
                            </select>
                            <p className="text-red-600 text-sm mt-1">
                              {validation.data?.role_id}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-white text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoleAssignEdit;
