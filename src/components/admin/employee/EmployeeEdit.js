import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { XCircleIcon } from "@heroicons/react/20/solid";

const EmployeeEdit = ({ close, employeeId, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    salary: "",
    gross_salary: "",
    pf_amount: "",
    esi_amount: "",
    p_tax_amount: "",
    joning_date: "",
    role_id: "",
    designation_id: "",
    country_id: 101,
    address_street_one: "",
    address_street_two: "",
    city: "",
    state_id: "",
    zip_code: "",
    employee_department: [],
    roles: [],
  });
  const [designation, setDesignation] = useState([]);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [validation, setValidation] = useState([]);
  const [department, setDepartment] = useState([]);
  const animatedComponents = makeAnimated();
  const [roles, setRoles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeforMultiSelect = (selectedDepartment) => {
    setFormData((prevState) => ({
      ...prevState,
      employee_department: selectedDepartment,
    }));
  };

  const fetchEmployee = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    try {
      // Fetch all the necessary data
      const response1 = await axios.get(
        "public/api/admin/employees/designation/index",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const response2 = await axios.get("public/api/admin/other/country", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response3 = await axios.get("public/api/admin/other/state", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const response4 = await axios.get(
        `public/api/admin/employees/edit/${employeeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const response5 = await axios.get(
        "public/api/admin/employees/department/index",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const response6 = await axios.get("public/api/admin/roles", {
        headers: { Authorization: `Bearer ${token}` },
      });
    

      // Map the department data
      const formattedDepartments =
        response4.data.employees?.employee_other_details.map((detail) => ({
          label: detail.employee_department?.name,
          value: detail.employee_department?.id,
        }));

      // Set the fetched data into the state
      setFormData({
        name: response4.data.employees?.name || "",
        email: response4.data.employees?.email || "",
        role_id: response4.data.employees?.role_id || "",
        password: response4.data.employees?.password || "",
        designation_id: response4.data.employees?.designation_id || "",
        phone: response4.data.employees?.phone || "",
        country_id:
          response4.data.employees.employee_address?.country_id || 101,
        address_street_one:
          response4.data.employees.employee_address?.address_street_one || "",
        address_street_two:
          response4.data.employees.employee_address?.address_street_two || "",
        city: response4.data.employees.employee_address?.city || "",
        state_id: response4.data.employees.employee_address?.state_id || "",
        zip_code: response4.data.employees.employee_address?.zip_code || "",

        employee_department: formattedDepartments,
      });

      setDesignation(response1.data.employee_designation);
      setCountry(response2.data.country);
      setState(response3.data.states);
      setDepartment(response5.data.employee_department);
      setRoles(response6.data.roles);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/crm/");
      }
      setError("Network Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const departmentIds = formData.employee_department.map((option) => ({
        department_id: option.value,
      }));

      const formDataWithDepartments = {
        ...formData,
        employee_department: departmentIds,
      };

      const response = await axios.put(
        `public/api/admin/employees/update/${employeeId}`,
        formDataWithDepartments,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("Employee Updated successfully!");
        close();
      } else {
        setValidation(response.data);
      }
    } catch (error) {
      if (error.response.status === 404) {
        localStorage.removeItem("token");
        navigate("/crm/");
      }
      console.error("Error:", error);
    }
  };

  const tryAgain = () => {
    setError(null);
    fetchEmployee();
  };

  return (
    <div>
      {loading ? (
        <div className="h-screen bg-white">
          <div className="flex justify-center items-center h-full">
            <img
              className="h-16 w-16"
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
          <div className="  col-span-3 bg-gray-200 p-6">
            <div className="max-w-7xl mx-auto md:px-8 flex justify-between items-center">
              <dt className="text-xl font-medium leading-6">EDIT EMPLOYEE</dt>
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
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="name"
                              name="name"
                              type="text"
                              value={formData.name}
                              onChange={handleChange}
                              autoComplete="name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="text-red-600 text-sm mt-1">
                              {validation.data?.name}
                            </p>
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              autoComplete="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="text-red-600 text-sm mt-1">
                              {validation.data?.email}
                            </p>
                          </div>
                        </div>

                        {/* <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Password
                          </label>
                          <div className="mt-2">
                            <input
                              id="password"
                              name="password"
                              type="password"
                              value={formData.password}
                              onChange={handleChange}
                              autoComplete="password"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="text-red-600 text-sm mt-1">
                              {validation.data?.password}
                            </p>
                          </div>
                        </div> */}

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone Number
                          </label>
                          <div className="mt-2">
                            <input
                              id="phone"
                              name="phone"
                              type="number"
                              value={formData.phone}
                              onChange={handleChange}
                              autoComplete="phone"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          <p className="text-red-600 text-sm mt-1">
                            {validation.data?.phone}
                          </p>
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="designation_id"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Designation
                          </label>
                          <div className="mt-2">
                            <select
                              id="designation_id"
                              name="designation_id"
                              value={formData.designation_id}
                              onChange={handleChange}
                              autoComplete="designation_id"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option value={""}>Select Designation</option>
                              {designation?.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="employee_department"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Department
                          </label>
                          <div className="mt-2">
                            <Select
                              label="Department"
                              name="employee_department"
                              placeholder="Select Department"
                              options={department.map((department) => ({
                                value: department.id,
                                label: department.name,
                              }))}
                              onChange={handleChangeforMultiSelect}
                              value={formData.employee_department}
                              withStar={false}
                              isMulti
                              components={animatedComponents}
                            />
                          </div>
                        </div>

                        {/* <div className="col-span-6 sm:col-span-6 lg:col-span-2">
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
                              value={formData.role_id}
                              onChange={handleChange}
                              autoComplete="role_id"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                              <option value={""}>Select Role</option>
                              {roles?.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
                            <p className="text-red-600 text-sm mt-1">
                              {validation.data?.role_id}
                            </p>
                          </div>
                        </div> */}

                    
                      </div>

                    

                      <h1 className="mt-8 font-medium mb-2">ADDRESS</h1>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="country_id"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Country / Region
                          </label>
                          <div className="mt-2">
                            <select
                              id="country_id"
                              name="country_id"
                              value={formData.country_id}
                              onChange={handleChange}
                              disabled={true}
                              autoComplete="country_id-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value={""}>Select Country</option>
                              {country?.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="address_street_one"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Address Street One
                          </label>
                          <div className="mt-2">
                            <input
                              id="address_street_one"
                              name="address_street_one"
                              type="text"
                              value={formData.address_street_one}
                              onChange={handleChange}
                              autoComplete="address_street_one"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="address_street_two"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Address Street Two
                          </label>
                          <div className="mt-2">
                            <input
                              id="address_street_two"
                              name="address_street_two"
                              type="text"
                              value={formData.address_street_two}
                              onChange={handleChange}
                              autoComplete="address_street_two"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              id="city"
                              name="city"
                              type="text"
                              value={formData.city}
                              onChange={handleChange}
                              autoComplete="city"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="state_id"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <select
                              id="state_id"
                              name="state_id"
                              value={formData.state_id}
                              onChange={handleChange}
                              autoComplete="state_id-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value={""}>Select State</option>
                              {state?.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="zip_code"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Zip Code
                          </label>
                          <div className="mt-2">
                            <input
                              id="zip_code"
                              name="zip_code"
                              type="text"
                              value={formData.zip_code}
                              onChange={handleChange}
                              autoComplete="zip_code"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-white text-right sm:px-6 ">
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

export default EmployeeEdit;
