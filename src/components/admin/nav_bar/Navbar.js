import React, { Fragment, useContext, useEffect, useState } from "react";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";


import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Bars3Icon,
  BellIcon,
  HomeIcon,
  XMarkIcon,
  DocumentIcon,
 CalendarDaysIcon
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
   RectangleGroupIcon,
   UserCircleIcon,
   DocumentTextIcon ,
   UserGroupIcon
  } from "@heroicons/react/16/solid";
import {
  Cog8ToothIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { GlobeAltIcon } from "@heroicons/react/24/solid";


import Arrival from "../../../assets/images/arrival1.png";
import { DataContext } from "../../../Context/HelperOne";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}



export default function NavBar(props) { 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { searchUi, setSearchData } = useContext(DataContext);
  const navigate = useNavigate();
  const [roleId, setRoleId] = useState(JSON.parse(localStorage.getItem("role_id")));
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [navigation, setNavigation] = React.useState([]);
  const [userName, setUserName] = React.useState(
    localStorage.getItem("user_name")?.replaceAll('"', "")
  );


  useEffect(() => {
    const initialNavigation = [];
    
   
    initialNavigation.push({
      name: "Dashboard",
      href: "/crm/dashboard",
      icon: HomeIcon,
      current: false,
      id:1,
    });
    initialNavigation.push({
      name: "Customer",
      href: "/crm/customer",
      icon: UserCircleIcon,
      current: false,
      id:2 ,
    });

    initialNavigation.push({
      name: "Plan",
      href: "/crm/plan",
      icon: DocumentTextIcon,
      current: false,
      id:3 ,
    });
    initialNavigation.push({
      name: "Group",
      href: "/crm/group",
      icon: UserGroupIcon,
      current: false,
      id:4,
    });

    initialNavigation.push({
      name: "Active Plan",
      href: "/crm/plan",
      icon: UserCircleIcon,
      current: false,
      id:5 ,
    });

    initialNavigation.push({
      name: "Chit Details",
      href: "/crm/plan",
      icon: RectangleGroupIcon,
      current: false,
      id:6 ,
    });

    initialNavigation.push({
      name: "Monthly Chit Entry",
      href: "/crm/plan",
      icon: CalendarDaysIcon,
      current: false,
      id:7 ,
    });
 
    initialNavigation.push({
      name: "Settings",
      icon: Cog8ToothIcon,
      current: false,
      id: 6,
      children: [
        
        // {
        //   name: "Employee Department",
        //   href: "/crm/employee/department",
        //   icon: GlobeAltIcon,
        //   current: false,
        //   id: 6,
        // },
      ],
    })


 {roleId == 1 && 
    initialNavigation.push({
      name: "Settings",
      icon: Cog8ToothIcon,
      current: false,
      id: 6,
      children: [
        // {
        //   name: "Roles",
        //   href: "/crm/roles",
        //   icon: ShieldCheckIcon,
        //   current: false,
        //   id: 6,
        // },
        {
          name: "Employee Designation",
          href: "/crm/employee/designation",
          icon: GlobeAltIcon,
          current: false,
          id: 6,
        },
        {
          name: "Employee Department",
          href: "/crm/employee/department",
          icon: GlobeAltIcon,
          current: false,
          id: 6,
        },
      ],
    });
  };

  const updatedNavigation = initialNavigation.map((item) => {
    
    if (item.id === props.menuId) {
      
      return { ...item, current: true };
    }
    return { ...item, current: false };
  });
  // console.log("Menu ID:", props.menuId);
  // console.log("Updated Navigation:", updatedNavigation);

    setNavigation(updatedNavigation);
  }, [props.menuId]);

  const search = (e) => {
    setSearchData(e.target.value);
  };
 
  const handleSignOut = async () => {
    setIsLoading(true);
    setHasError(false);
    var token = localStorage.getItem("token");
     console.log(token)
    try {
      const res = await axios.post("public/api/logout", {
        headers: {
          authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
        console.log(res)
      if (res.data.success) {
        localStorage.removeItem("token");
        // localStorage.removeItem("role_id");
        // localStorage.removeItem("user");
        navigate("/crm/");
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/crm/");
      }
      console.error("Error during sign out:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const userNavigation = [
    { name: "Sign out", href: "#", onClick: handleSignOut },
  ];

  const renderLoadingUI = () => (
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

  const renderErrorUI = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <div className="flex items-center justify-center mb-6">
          <svg
            className="h-12 w-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-gray-800 text-lg font-semibold mb-4 text-center">
          An error occurred during sign out.
        </p>
        <p className="text-gray-600 mb-8 text-center">
          Please check your internet connection and try again.
        </p>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
            onClick={handleSignOut}
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  const toggleFullScreen = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;
    const exitFullScreen =
      doc.exitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.webkitExitFullscreen ||
      doc.msExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement &&
      !doc.msFullscreenElement
    ) {
      requestFullScreen.call(docEl);
    } else {
      exitFullScreen.call(doc);
    }
  };

  return (
    <>
      <div className="border">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear  duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear bg-gray-500  duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0  bg-opacity-75  " />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col  max-w-xs w-full pt-5 pb-4 bg-gray-300 border border-gray-500">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2 ">
                    <button
                      type="button"
                      className="ml-1 flex items-center   justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-black"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex h-16 shrink-0   items-center">
                  <img
                    className="h-32 w-auto ml-4"
                    src={Arrival}
                    alt="Workflow"
                  />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto   border border-gray-500">
                  <nav
                    className="flex-1 px-2 space-y-1 bg-gray-300  "
                    aria-label="Sidebar"
                  >
                    {navigation.map((item) =>
                      !item.children ? (
                        <div key={item.name}>
                          <Link
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-50 text-gray-600"
                                : "hover:text-gray-600 hover:bg-gray-50",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-black"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500"
                                  : "text-gray-700 group-hover:text-gray-500",
                                "h-6 w-6 shrink-0"
                              )}
                              aria-hidden="true"
                            />

                            {item.name}
                          </Link>
                        </div>
                      ) : (
                        <Disclosure
                          as="div"
                          key={item.name}
                          className="space-y-1"
                          defaultOpen={
                            props.menuId == 6 && item.name == "Settings"
                          }
                        >
                          {({ open }) => (
                            <>
                              <Disclosure.Button
                                className={classNames(
                                  item.current
                                    ? "bg-gray-600 text-gray-600"
                                    : "hover:text-gray-500 hover:bg-white",
                                  "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? "text-gray-500"
                                      : "text-gray-700 group-hover:text-gray-500",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />

                                <span className="flex-1">{item.name}</span>
                                <ChevronRightIcon
                                  className={classNames(
                                    open
                                      ? "rotate-90 text-gray-500"
                                      : "text-gray-400",
                                    "ml-auto h-5 w-5 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="space-y-1">
                                {item.children.map((subItem) => (
                                 
                                  <Disclosure.Button
                                    key={subItem.name}
                                    as="a"
                                    href={subItem.href}
                                    className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                                  >
                                    {subItem.name}
                                  </Disclosure.Button>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      )
                    )}
                  </nav>
                  <div className="flex flex-shrink-0 border-t border-gray-700  p-4">
                    <Link to="#" className="group block w-full flex-shrink-0 gb-gray-300">
                      <div className="flex items-center gb-gray-300">
                        <div className="ml-3 gb-gray-300">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                            @ Arrival
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow border-r border-gray-500 pt-5 bg-gray-200 overflow-y-auto ">
            <div className="px-4 flex h-16 shrink-0 items-center border">
              <img className="h-32 w-auto" src={Arrival} />
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav
                className="flex-1 px-2 space-y-1 bg-gray-200 border  border-gray-400"
                aria-label="Sidebar"
              >
                {navigation.map((item) =>
                  !item.children ? (
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-50 text-gray-600"
                            : "hover:text-gray-600 hover:bg-gray-50",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-black"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-700 group-hover:text-gray-500",
                            "h-6 w-6 shrink-0 "
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </div>
                  ) : (
                    <Disclosure
                      as="div"
                      key={item.name}
                      className="space-y-1"
                      defaultOpen={props.menuId == 6 && item.name == "Settings"}
                    >
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current
                                ? "bg-gray-50 text-indigo-600"
                                : "hover:text-indigo-600 hover:bg-gray-50",
                              "flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-600"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "h-6 w-6 shrink-0 mr-3"
                              )}
                              aria-hidden="true"
                            />

                            <span className="flex-1">{item.name}</span>
                            <ChevronRightIcon
                              className={classNames(
                                open
                                  ? "rotate-90 text-gray-500"
                                  : "text-gray-400",
                                "ml-auto h-5 w-5 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="space-y-1">
                            {item.children.map((subItem) => (
                              <Link
                              key={subItem.id} // Use a unique key for sub-items
                              to={subItem.href}
                                className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )
                )}
              </nav>
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                <Link to="#"  className="group block w-full flex-shrink-0">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-black group-hover:text-gray-900">
                        @ Arrival
                      </p>
                    </div>
                  </div>
                </Link >
              </div>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-gray-200 border border-b-gray-500 shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex ">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  {searchUi && (
                    <form
                      className="relative flex flex-1"
                      action="#"
                      method="GET"
                    >
                      <label htmlFor="search-field" className="sr-only">
                        Search
                      </label>
                      <MagnifyingGlassIcon
                        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <input
                        id="search-field"
                        className="block  w-full border-0 rounded-xl    pl-8 pr-0 text-gray-500 bg-white text-with placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                        placeholder="Search..."
                        type="search"
                        onChange={search}
                        name="search"
                      />
                    </form>
                  )}
                </form>
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5 text-black hover:text-gray-500"
                    onClick={toggleFullScreen}
                  >
                    {document.fullscreenElement ? (
                      <BiExitFullscreen
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <BiFullscreen className="h-6 w-6" aria-hidden="true" />
                    )}
                  </button>

                  <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Separator */}
                  <div
                    className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                    aria-hidden="true"
                  />

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative">
                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                      <span className="sr-only">Open user menu</span>
                      <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                        <svg
                          className="h-full w-full text-gray-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <span className="hidden lg:flex lg:items-center">
                        <span
                          className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                          aria-hidden="true"
                        >
                          {userName}
                        </span>
                        <ChevronDownIcon
                          className="ml-2 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link
                                to={item.href}
                                onClick={
                                  item.onClick ? item.onClick : undefined
                                }
                                className={classNames(
                                  active ? "bg-gray-50" : "",
                                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                                )}
                              >
                                {item.name}
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            renderLoadingUI()
          ) : hasError ? (
            renderErrorUI()
          ) : (
            <div className=" bg-gray-100 border">
              <body className="p-6 min-h-screen">
                <main className="h-full bg-gray-100 p-4 rounded">
                  
                  <div>
                    <div>{props.childrenPage}</div>
                  </div>
                </main>
              </body>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
