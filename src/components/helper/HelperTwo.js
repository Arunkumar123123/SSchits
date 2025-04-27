import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export const Unauthorized = () => {
  const navigate = useNavigate();

  const goBackToPreviousPage = () => {
    navigate('/crm/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <ExclamationCircleIcon className="h-12 w-12 text-red-500 mx-auto" />
        <h1 className="text-3xl font-bold my-4">Unauthorized Access</h1>
        <p className="text-lg mb-6">
          You are not authorized to view this page.
        </p>
        <button
          onClick={goBackToPreviousPage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export const LoaderOne = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-4 rounded-md">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full border-4 border-l-blue-500 border-r-blue-500 border-t-blue-500 border-white-300 h-12 w-12"></div>
        </div>
        <p className="text-center mt-4">Loading...</p>
      </div>
    </div>
  );
};

export const Pagination = ({
  links,
  currentPage,
  totalResults,
  onPageChange,
  from,
  to,
  lastPage,
}) => {
  const handlePageChange = (event, page) => {
    event.preventDefault();
    onPageChange(page);
  };

  const handlePrevClick = (event) => {
    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    handlePageChange(event, prevPage);
  };

  const handleNextClick = (event) => {
    const nextPage = currentPage < lastPage ? currentPage + 1 : lastPage;
    handlePageChange(event, nextPage);
  };

  return (

    <>
      <div className="flex items-center justify-between  px-4 py-3 sm:px-6">
        {/* Mobile pagination */}
        <div className="flex flex-1 justify-between  sm:hidden">
          <button
            onClick={handlePrevClick}
            className="inline-flex items-center rounded-lg border border-gray-300  px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Previous
          </button>
          <button
            onClick={handleNextClick}
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Next
          </button>
        </div>

        {/* Desktop pagination */}
        <div className="hidden sm:flex sm:flex-1  sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-semibold">{from}</span> to{" "}
              <span className="font-semibold">{to}</span> of{" "}
              <span className="font-semibold">{totalResults}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={handlePrevClick}
                className="relative inline-flex items-center rounded-l-md bg-blue-100 px-2 py-2 text-gray-500 hover:bg-gray-100 focus:z-20 focus:ring-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {console.log(links)}
              {links
                ?.filter((link) => link.url !== "Previous" && link.url !== "Next")
                .map((link, index) => (
                  <button
                    key={index}
                    onClick={(e) => handlePageChange(e, link.url)}
                    aria-current={link.active ? "page" : undefined}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${link.active
                        ? "z-10 bg-indigo-50 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        : "text-gray-700 bg-white hover:bg-gray-100 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      }`}
                  >
                    {link.page}
                    
                  </button>
                ))}
              <button
                onClick={handleNextClick}
                className="relative inline-flex items-center rounded-r-md bg-blue-100  px-2 py-2 text-gray-500 hover:bg-gray-100 focus:z-20 focus:ring-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>







    </>
  );
};
