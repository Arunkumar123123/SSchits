import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { XCircleIcon } from "@heroicons/react/20/solid";

const RoleEdit = ({ close, roleId, closeModal }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [validation, setValidation] = useState(null);
  const [roleBasedAccess, setRoleBasedAccess] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    color: "#000000",
    employee_role_based_access: [],
  });

  const keyMapping = {
    Employee: "employee_role_based_access",
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "public/api/admin/roles/data/for/create",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const response1 = await axios.get(
        `public/api/admin/roles/edit/${roleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setFormData({
        name: response1.data.role.name,
        color: response1.data.role.color,
        employee_role_based_access:
          response1.data.role.employee_role_based_access,
      });
      setRoleBasedAccess(response.data.role_based_access);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/crm/");
      }
      setError("Network Failed. Please try again.");
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChange = (event, arrayPosition, roleLabel) => {
    const accessType = keyMapping[roleLabel];
    const updatedAccess = [...formData[accessType]];
    updatedAccess[arrayPosition] = {
      ...updatedAccess[arrayPosition],
      label_value: event.target.checked ? 1 : 0,
    };
    setFormData((prevState) => ({ ...prevState, [accessType]: updatedAccess }));
  };

  const tryAgain = () => {
    setError(null);
    loadData();
  };

  const saveRole = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const labelIds = [1, 2, 3, 4, 5, 6];
      const labelIdsForSix = [1, 2, 3, 4, 5, 6];
      const labelIdsForTwo = [1, 2];

      const formattedAccess = (type) => {
        let ids;
        if (type === "task_role_based_access") {
          ids = labelIdsForSix;
        } else if (
          type === "sales_report_role_based_access" ||
          type === "followup_role_based_access"
        ) {
          ids = labelIdsForTwo;
        } else {
          ids = labelIds;
        }
        return ids.map((labelId, index) => {
          const access = formData[type][index];
          return access?.id === undefined
            ? {
                id: access?.id,
                label_id: labelId,
                label_value: access?.label_value ? 1 : 0,
              }
            : {
                id: access?.id,
                label_id: access?.label_id,
                label_value: access.label_value ? 1 : 0,
              };
        });
      };

      const formattedFormData = {
        name: formData.name,
        color: formData.color,

        employee_role_based_access: formattedAccess(
          "employee_role_based_access"
        ),
      };

      const response = await axios.put(
        `public/api/admin/roles/update/${roleId}`,
        formattedFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Role Updated successfully!");
        close();
      } else {
        const { data, status } = response;
        if (status === 200) {
          const { success } = data;
          if (!success) {
            if (data.request_validation) setValidation(data.data);
          }
        } else setError("Failed to save role");
      }
    } catch (error) {
      setError("Network Failed");
    }
  };

  const isCheckboxDisabled = (roleLabel, accessId, subIndex) => {
    const accessType = keyMapping[roleLabel];

    const getLabelValue = (id) =>
      formData[accessType]?.find((item) => item?.label_id === id)?.label_value;

    let label1Value = getLabelValue(1);
    let label2Value = getLabelValue(2);

    if (subIndex === 1 && label1Value === undefined) {
      label1Value = 1;
      label2Value = 0;
    } else if (subIndex === 2 && label2Value === undefined) {
      label1Value = 0;
      label2Value = 1;
    }

    return (accessId === 2 && label1Value) || (accessId === 1 && label2Value);
  };

  if (loading)
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

  if (error)
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

  return (
    <div className="container mx-auto">
      <div className="col-span-3 bg-gray-200 p-6">
        <div className="max-w-7xl mx-auto md:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">EDIT ROLE</h1>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
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
      <div className="max-w-7xl mx-auto p-6 bg-gray-50">
        <div className="md:grid md:gap-6">
          <div className="md:mt-0 md:col-span-2">
            <form
              onSubmit={saveRole}
              className="p-6 rounded-lg bg-white shadow-md"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-semibold mb-2"
                  >
                    Role Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInput}
                    className="border border-gray-400 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-red-500">{validation?.name}</p>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="color"
                    className="block text-gray-700 font-semibold mb-1"
                  >
                    Role Color <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="color"
                    name="color"
                    id="color"
                    value={formData.color}
                    onChange={handleInput}
                    className="border border-gray-300 w-full rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <p className="text-red-500 text-sm">{validation?.color}</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">Feature</th>
                      <th className="border border-gray-300 p-2">
                        Capabilities
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {roleBasedAccess.map((role, index) => (
                      <tr key={index}>
                        <td className="border border-gray-300 p-2">
                          <b>{role.label}</b>
                        </td>
                        <td className="border border-gray-300 p-2 w-3/4">
                          <div className="flex flex-wrap">
                            {role.label_value.map((access, subIndex) => (
                              <div
                                key={subIndex}
                                className="flex items-center mr-4 mb-2"
                              >
                                <input
                                  id={`${index}_${access.id}`}
                                  checked={
                                    formData[keyMapping[role.label]]?.[subIndex]
                                      ?.label_value === 1
                                  }
                                  onChange={(event) =>
                                    handleChange(event, subIndex, role.label)
                                  }
                                  type="checkbox"
                                  className="mr-2 border border-gray-400 rounded focus:ring-indigo-500"
                                  disabled={isCheckboxDisabled(
                                    role.label,
                                    access.id,
                                    subIndex
                                  )}
                                />
                                <label
                                  htmlFor={`${index}_${access.id}`}
                                  className="mr-2"
                                >
                                  {access.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-right">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleEdit;
