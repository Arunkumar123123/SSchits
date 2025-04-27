import React from 'react'
import { useState } from 'react';


import axios from "axios";
import { toast } from "react-toastify";


const CustomerEdit = ({ close, customers }) => {

    console.log(customers)
    const [formData, setFormData] = useState({

        name: customers.name,
        email: customers.email,
        phone: customers.phone,
        address: customers.address,
        zipcode:customers.zipcode,
        files: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token found");
            }
    
            const response = await axios.put(
                `public/api/customers/${customers.id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
    
            console.log("Response:", response);
            toast.success(response.data.message || "Customer updated successfully");
    
        } catch (error) {
            console.error("Error:", error);
            toast.error(error.response?.data?.message || "Update failed");
        }
    };
    


    return (
        <div>
            <div className="  col-span-3 bg-gray-200 p-6">
                <div className="max-w-7xl mx-auto md:px-8 flex justify-between items-center">
                    <dt className="text-xl font-medium leading-6">EDIT CUSTOMER</dt>
                    <button
                        onClick={close}
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

            <div className="max-w-7xl  p-6 bg-gray-100">
                <div className="md:grid md:gap-6">
                    <div className=" md:col-span-2">
                        <form onSubmit={handleSubmit} >
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
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
                                                    placeholder="Enter name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    autoComplete="name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="text-red-600 text-sm mt-1">
                                                    {/* {validation.data?.name} */}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="phone"
                                                    name="phone"
                                                    type="number"
                                                    placeholder="Enter phone"
                                                      value={formData.phone}
                                                      onChange={handleChange}
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="text-red-600 text-sm mt-1">
                                                    {/* {validation.data?.email} */}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
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
                                                    placeholder="Enter Email"
                                                      value={formData.email}
                                                      onChange={handleChange}
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="text-red-600 text-sm mt-1">
                                                    {/* {validation.data?.email} */}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <label
                                                htmlFor="address"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                 Address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="address"
                                                    name="address"
                                                    type="text"
                                                    placeholder="Enter Address"
                                                      value={formData.address}
                                                      onChange={handleChange}
                                                    autoComplete="address"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="text-red-600 text-sm mt-1">
                                                    {/* {validation.data?.email} */}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                zipcode
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="zipcode"
                                                    name="zipcode"
                                                    type="number"
                                                    placeholder="Enter zipcode"
                                                      value={formData.zipcode}
                                                      onChange={handleChange}
                                                    autoComplete="zipcode"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="text-red-600 text-sm mt-1">
                                                    {/* {validation.data?.email} */}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                        <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                File uplade
                                            </label>
                                            <input  type="files" id="files" name="files" value={formData.files}
                                             onChange={handleChange}
                                            ></input>
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
    )
}

export default CustomerEdit
