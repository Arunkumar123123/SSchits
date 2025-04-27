import React, { useState } from 'react'

import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PlanCreate = ({ close }) => {
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
    });

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
        
          const response = await axios.post(
            "public/api/plans",
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log(response)
          toast.success(response.data.message);
          close()
        
        } catch (error) {
    
          console.error("Error:", error);
        }
      };


    return (
        <div>

            <div className="col-span-3 bg-gray-200 p-6">
                <div className="max-w-7xl mx-auto md:px-8 flex justify-between items-center">
                    <dt className="text-xl font-medium leading-6">NEW PLAN</dt>
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
                        <form
                         onSubmit={handleSubmit}
                          >
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
                                                htmlFor="amount"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Amount
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="amount"
                                                    name="amount"
                                                    type="number"
                                                    placeholder="Enter Amount"
                                                      value={formData.amount}
                                                      onChange={handleChange}
                                                    autoComplete="amount"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="text-red-600 text-sm mt-1">
                                                    {/* {validation.data?.email} */}
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
    )
}

export default PlanCreate
