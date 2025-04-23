import React from 'react'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'

const CustomerCreate = () => {
    return (
        <div>
            <div className="col-span-3 bg-gray-200 p-6">
                <div className="max-w-7xl mx-auto md:px-8 flex justify-between items-center">
                    <dt className="text-xl font-medium leading-6">NEW EMPLOYEE</dt>
                    <button
                        // onClick={closeModal}
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
                        <form >
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
                                                    // value={formData.name}
                                                    // onChange={handleChange}
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
                                                Email address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    placeholder="Enter Email"
                                                    //   value={formData.email}
                                                    //   onChange={handleChange}
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
                                                    //   value={formData.email}
                                                    //   onChange={handleChange}
                                                    autoComplete="email"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                                <p className="text-red-600 text-sm mt-1">
                                                    {/* {validation.data?.email} */}
                                                </p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default CustomerCreate
