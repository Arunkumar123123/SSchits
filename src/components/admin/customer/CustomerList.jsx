import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'


import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import CustomerCreate from './CustomerCreate';
import CustomerEdit from './CustomerEdit';
import { Pagination } from "../../helper/HelperTwo";




const CustomerList = () => {

  const [customerCreateOpen, setCustomerCreateOpen] = useState(false)
  const [customerEditOpen, setCustomerEditOpen] = useState(false);
  const [customerViewOpen, setCustomerViewOpen] = useState(false);
  const [formData, setFormData] = useState([])
  const [pagination, setPagenation] = useState(null)
  const [pagenationLink, setPagenationLink] = useState([])
  const [customerId, setCustomerId] = useState("")
  const [customerDelete, setCustomerDelete] = useState(false)
  // const [loading, setLoading] = useState(true)
   const [deleteMsg, setDeleteMsg] = useState(
      "Are you sure you want to delete the Customer ?"
    );
  




  const handleClick = () => {
    setCustomerCreateOpen(true);
  };
  const handleClose = () => {
    setCustomerCreateOpen(false);
    setCustomerEditOpen(false)
    fetch()
  }

  const fetch = async () => {
    try {
      const token = localStorage.getItem("token");
      let endpoint = `public/api/customers`;
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (response.data.success) {
        setFormData(response.data.data.customers)
        setPagenation(response.data.data.pagination)
        setPagenationLink(response.data.data.links)

      }


    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetch()
  }, [])


  const handlePageChange = (page) => {
    if (page !== "...") {
      fetch(page);
    }
  };


  const handleClickForView = (id) => {
    setCustomerId(id);

    setCustomerEditOpen(true);
  };

  const handleClickForDelete = async ()=>{
    try {
      const token = localStorage.getItem("token");
      const response= await axios.delete(
        `public/api/customers/${customerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if(response.data){
           toast.success("Customer Deleted successfully!");
           fetch()
           setCustomerDelete(false)
          
      }
      console.log(response)
     
    } catch (error) {
      
    }
  }

  const Delete = (id_crypt) => {
    setCustomerDelete(true);
    setCustomerId(id_crypt);
  };


  // if (loading) {
  //   return (
  //     <span className="inline-block w-12 h-12 rounded-full border-[5px] border-[#FF3D00] border-r-transparent animate-spin"></span>

    


  //   )
  // }


  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Customer</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={handleClick}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Customer
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-sm ring-1 ring-black/5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300 shadow-xl">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Phone
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Email
                      </th>

                      <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {formData.map((person, index) => (
                      <tr key={index}>
                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                          {person.name}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{person.phone}</td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{person.email}</td>
                        <td className="px-3 py-4  text-center text-sm font-medium whitespace-nowrap sm:pr-6 gap-2">
                          <button
                            type="button"
                            className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"

                            onClick={() =>
                              handleClickForView(person)
                            }
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="rounded-full bg-red-200 px-2.5 py-1 text-xs font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"

                            onClick={() =>
                              Delete(person.id)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {pagination && (
        <Pagination
          links={pagenationLink}
          currentPage={pagination.current_page}
          totalResults={pagination.total}
          from={pagination.from}
          to={pagination.to}
          lastPage={pagination.last_page}
          onPageChange={handlePageChange}
        />
      )}

      <Transition.Root show={customerCreateOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setCustomerCreateOpen}
        >
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
                    <CustomerCreate
                      close={handleClose}
                    // closeModal={closeModal}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>




      {/*Modal Edit */}
      <Transition.Root show={customerEditOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setCustomerEditOpen}
        >
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
                    <CustomerEdit
                      close={handleClose}
                      customers={customerId}

                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Modal Edit*/}

      <Transition.Root show={customerDelete} as={Fragment}>
            <Dialog
              as="div"
              className="fixed z-10 inset-0 overflow-y-auto"
              onClose={() => setCustomerDelete(false)}
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
                          setCustomerDelete(false);
                          setDeleteMsg(
                            "Are you sure you want to delete the Delete customer ?"
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
                          Delete Customer
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
                        onClick={() => setCustomerDelete(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>


    </div>
  )
}

export default CustomerList
