import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import { faBank } from "@fortawesome/free-solid-svg-icons";
import { XCircleIcon } from "@heroicons/react/20/solid";



const EmployeeView = ({ employeeId, closeModal }) => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchCustomerTypes = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    try {
      const response4 = await axios.get(
        `public/api/admin/employees/edit/${employeeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setFormData({
        name: response4.data.employees?.name,
        email: response4.data.employees?.email,
        password: response4.data.employees?.password,
        designation: response4.data.employees?.employee_designation?.name,
        phone: response4.data.employees?.phone,
        country:
          response4.data.employees.employee_address?.employee_country?.name,
        address_street_one:
          response4.data.employees.employee_address?.address_street_one,
        address_street_two:
          response4.data.employees.employee_address?.address_street_two,
        city: response4.data.employees.employee_address?.city,
        state: response4.data.employees.employee_address?.employee_state?.name,
        zip_code: response4.data.employees.employee_address?.zip_code,
        employee_department: response4.data.employees?.employee_other_details,
        employee_role: response4.data.employees?.employee_role?.name,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/crm/");
      }
      console.error("Error fetching customer types:", error);
      setError("Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerTypes();
  }, []);

  const tryAgain = () => {
    setError(null);
    fetchCustomerTypes();
  };
  if (loading) {
    return (
      <div className="h-screen bg-white">
        <div className="flex justify-center items-center h-full">
          <img
            className="h-16 w-16"
            src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
            alt="loader"
          />
        </div>
      </div>
    );
  }
  if (error) {
    return (
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
    );
  }

  return (
    <div>
      <div>
        <div className="col-span-3 bg-gray-200 p-6">
          <div className="max-w-7xl mx-auto md:px-8 flex justify-between items-center">
            <dt className="text-xl font-medium leading-6">VIEW EMPLOYEE</dt>
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

        <div className="p-6 bg-gray-50">
          <div className="p-6 border rounded-lg bg-white shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center bg-blue-100 rounded-full w-10 h-10">
                  <span className="text-blue-600 text-lg">👤</span>
                </div>
                <div className="mb-4">
                  <p className="text-md font-semibold text-gray-800">
                    {formData?.name}
                  </p>
                  <h4 className="text-sm text-gray-600">Name</h4>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center bg-green-100 rounded-full w-10 h-10">
                  <span className="text-green-600 text-lg">📧</span>
                </div>
                <div className="mb-4">
                  <p className="text-md font-semibold text-gray-800">
                    {formData?.email}
                  </p>
                  <h4 className="text-sm text-gray-600">Email</h4>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center bg-yellow-100 rounded-full w-10 h-10">
                  <span className="text-yellow-600 text-lg">📞</span>
                </div>
                <div className="mb-4">
                  <p className="text-md font-semibold text-gray-800">
                    {formData?.phone}
                  </p>
                  <h4 className="text-sm text-gray-600">Phone</h4>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center bg-red-100 rounded-full w-10 h-10">
                  <span className="text-red-600 text-lg">💼</span>
                </div>
                <div className="mb-4">
                  <p className="text-md font-semibold text-gray-800">
                    {formData?.designation}
                  </p>
                  <h4 className="text-sm text-gray-600">
                    {" "}
                    Employee Designation
                  </h4>
                </div>
              </div>

              {/* <div className="flex items-start space-x-4">
                  <div className="flex items-center justify-center bg-red-100 rounded-full w-10 h-10">
                  <span className="text-red-600 text-lg">💻</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-md font-semibold text-gray-800">
                      {formData?.employee_role}
                    </p>
                    <h4 className="text-sm text-gray-600">Role Name</h4>
                  </div>
                </div> */}

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center bg-purple-100 rounded-full w-10 h-10">
                  <span className="text-purple-600 text-lg">🏢</span>
                </div>
                <div className="mb-4">
                  <p className="text-md font-semibold text-gray-800">
                    {formData?.employee_department
                      ?.map((dep) => dep.employee_department.name)
                      .join(", ")}
                  </p>
                  <h4 className="text-sm text-gray-600">Department</h4>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center bg-purple-100 rounded-full w-10 h-10">
                  <span className="text-purple-600 text-lg">📍</span>
                </div>
                <div className="mb-4">
                  <p className="text-md font-semibold text-gray-800">
                    {formData?.country}
                  </p>
                  <h4 className="text-sm text-gray-600">Country/Region</h4>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center bg-yellow-100 rounded-full w-10 h-10">
                  <span className="text-purple-600 text-lg">🏠</span>
                </div>
                <div className="mb-4">
                  <p className="text-md font-semibold text-gray-800">
                    {formData?.address_street_one}
                  </p>
                  <h4 className="text-sm text-gray-600">Address Street One</h4>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center bg-red-100 rounded-full w-10 h-10">
                  <span className="text-purple-600 text-lg">🏠</span>
                </div>
                <div className="mb-4">
                  <p className="text-md font-semibold text-gray-800">
                    {formData?.address_street_two}
                  </p>
                  <h4 className="text-sm text-gray-600">Address Street Two</h4>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center bg-green-100 rounded-full w-10 h-10">
                  <span className="text-purple-600 text-xl"> 🌆</span>
                </div>
                <div className="mb-4">
                  <p className="text-md font-semibold text-gray-800">
                    {formData?.city}
                  </p>
                  <h4 className="text-sm text-gray-600">City</h4>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center bg-blue-100 rounded-full w-10 h-10">
                  <span className="text-purple-600 text-xl">🗺️</span>
                </div>
                <div className="mb-4">
                  <p className="text-md font-semibold text-gray-800">
                    {formData?.state}
                  </p>
                  <h4 className="text-sm text-gray-600">State / Province</h4>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center bg-purple-100 rounded-full w-10 h-10">
                  <span className="text-purple-600 text-xl">✉️</span>
                </div>
                <div className="mb-4">
                  <p className="text-md font-semibold text-gray-800">
                    {formData?.zip_code}
                  </p>
                  <h4 className="text-sm text-gray-600">Zip code</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeView;
