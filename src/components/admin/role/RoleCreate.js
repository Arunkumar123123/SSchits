import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RoleCreate = ({ close , closeModal }) => {
  const [error, setError] = useState(null);
  const [validation, setValidation] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [roleBasedAccess, setRoleBasedAccess] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    color: "#000000",
    roleBasedAccess: {},
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("public/api/admin/roles/data/for/create", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const { data, status } = response;
      if (status === 200) {
        const { success, role_based_access } = data;
        if (success) {
          setRoleBasedAccess(role_based_access);
          initializeFormData(role_based_access);
        } else {
          setError(data.message);
        }
      } else {
        setError("Failed to fetch data");
      }
      setLoading(false);
    } catch (error) {
      handleErrors(error);
    }
  };

  const initializeFormData = (roleBasedAccess) => {
    const initialFormData = {
      name: "",
      color: "#000000",
      roleBasedAccess: {},
    };

    roleBasedAccess.forEach((role) => {
      initialFormData.roleBasedAccess[role.label] = role.label_value.map(
        (access) => ({
          label_id: access.id,
          label_value: false,
        })
      );
    });

    setFormData(initialFormData);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (roleLabel, arrayPosition, labelId) => {
    setFormData((prevState) => ({
      ...prevState,
      roleBasedAccess: {
        ...prevState.roleBasedAccess,
        [roleLabel]: prevState.roleBasedAccess[roleLabel].map((item, index) =>
          index === arrayPosition
            ? { ...item, label_value: !item.label_value }
            : item
        ),
      },
    }));
  };

  const saveRole = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const formattedFormData = {
        name: formData.name,
        color: formData.color,
        ...formatAccess(formData.roleBasedAccess),
      };

      const response = await axios.post("public/api/admin/roles/store", formattedFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data, status } = response;
      if (status === 200) {
        if (data.success) {
          toast.success("Role created successfully!");
          close();
        } else {
          setValidation(data.data);
        }
      }
    } catch (error) {
      handleErrors(error);
    } finally {
      setLoading(false);
    }
  };

  const handleErrors = (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      navigate("/crm/");
    }
    console.error("Error fetching roles:", error);
    setError("Network Failed. Please try again.");
    setLoading(false);
  };

  const formatAccess = (accessObject) => {
    const keyMapping = {
      Employee: "employee_role_based_access",
    };

    const formattedAccess = {
      employee_role_based_access: [],
    };

    Object.keys(accessObject).forEach((roleLabel) => {
      if (keyMapping[roleLabel]) {
        formattedAccess[keyMapping[roleLabel]] = accessObject[roleLabel].map(
          (access) => ({
            label_id: access.label_id,
            label_value: access.label_value ? 1 : 0,
          })
        );
      }
    });

    return formattedAccess;
  };

  const isCheckboxDisabled = (roleLabel, accessId) => {
    const roleAccess = formData.roleBasedAccess[roleLabel];
    return (
      (accessId === 2 &&
        roleAccess.find((item) => item.label_id === 1)?.label_value) ||
      (accessId === 1 &&
        roleAccess.find((item) => item.label_id === 2)?.label_value)
    );
  };

  const tryAgain = () => {
    setError(null);
    loadData();
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
    <>
      <div className="bg-gray-200 p-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">NEW ROLE</h1>
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
      <div className="container mx-auto p-6 bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={saveRole} className="space-y-4">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-1"
                >
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInput}
                  className="border border-gray-300 px-3 py-2 w-full rounded-md focus:outline-none focus:border-blue-500"
                />
                <p className="text-red-500 text-sm">{validation?.name}</p>
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
                    <th className="border border-gray-300 p-2">Capabilities</th>
                  </tr>
                </thead>
                <tbody>
                  {roleBasedAccess.map((role, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2">
                        <b>{role.label}</b>
                      </td>
                      <td className="border border-gray-300 p-2 w-3/4">
                        <div className="flex flex-wrap">
                          {role.label_value.map((access, subIndex) => (
                            <div key={subIndex} className="flex items-center mr-4 mb-2">
                              <input
                                id={`${role.label}_${access.id}`}
                                checked={formData.roleBasedAccess[role.label][subIndex].label_value}
                                onChange={() => handleChange(role.label, subIndex, access.id)}
                                type="checkbox"
                                className="mr-2 border border-gray-400 rounded focus:ring-indigo-500"
                                disabled={isCheckboxDisabled(role.label, access.id)}
                              />
                              <label htmlFor={`${role.label}_${access.id}`} className="mr-2">
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
            <div className="text-right">
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
    </>
  );
};

export default RoleCreate;
