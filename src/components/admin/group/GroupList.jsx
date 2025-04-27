import React, { useState, useEffect } from 'react'
import { Fragment } from 'react'

import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Pagination } from "../../helper/HelperTwo";
import GroupCreate from './GroupCreate';
import GroupEdit from './GroupEdit';


const GroupList = () => {
  const [formData, setFormData] = useState([])
  const [groupCreateOpen, setGroupCreateOpen] = useState(false)
  const [groupEditOpen, setGroupEditOpen] = useState(false)
  const [pagination, setPagenation] = useState(null)
  const [pagenationLink, setPagenationLink] = useState([])
  const [groupId, setGroupID] = useState("")
  const [groupDelete, setGroupDelete] = useState(false)
  // const [loading, setLoading] = useState(true)
  const [deleteMsg, setDeleteMsg] = useState(
    "Are you sure you want to delete the group ?"
  );


  const handleClick = () => {
    setGroupCreateOpen(true);
  };

  const fetch = async () => {
    try {
      const token = localStorage.getItem("token");
      let endpoint = `public/api/groups`;
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      if (response.data.success) {
        setFormData(response.data.data.groups)
        setPagenation(response.data.data.pagination)
        setPagenationLink(response.data.data.links)

      }
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetch()
  }, [])

  const handleClose = () => {
    setGroupCreateOpen(false);
    setGroupEditOpen(false)

    fetch()
  }

  const handlePageChange = (page) => {
    if (page !== "...") {
      fetch(page);
    }
  };

  const handleClickForView = (person)=>{
    setGroupID(person)
    setGroupEditOpen(true)
  }

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold text-gray-900">Plan</h1>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={handleClick}
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Group
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
                        Plan Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Group Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Customer Count
                      </th>

                      <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {console.log(formData)}
                    {formData?.map((person, index) => (
                      <tr key={index}>
                        <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                          {person.plan.name}
                        </td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {person.group_name}</td>
                        <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                          {person.customers_count}</td>

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

                          // onClick={() =>
                          //   Delete(person.id)
                          // }

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

      <Transition.Root show={groupCreateOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setGroupCreateOpen}
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
                    <GroupCreate
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
       <Transition.Root show={groupEditOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setGroupEditOpen}
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
                    <GroupEdit
                      close={handleClose}
                      plan={groupId}

                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* Modal Edit*/}
    </div>
  )
}

export default GroupList
