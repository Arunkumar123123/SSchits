import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SettingPageEdit = ({ ListtoEdit, close, editID , closeModal}) => {
  const [data, setData] = useState(ListtoEdit);

  const saveItem = async (e) => {
    e.preventDefault();

    let url = "";
    data.forEach((item) => {
      url = item.url;
    });

    const name = data[0].data;
    const color = data[1].data;

    const token = localStorage.getItem("token");
    const headers = {
      authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
    try {
      const res = await axios.put(
        `public/${url}/${editID}`,
        { name, color },
        { headers }
      );
      if (res.data.success) {
        close();
    
          toast.success(`${data[0].label} Updated successfully!`);
      
      } else {
      }
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  };

  const handleInputName = (e, index) => {
    const newData = [...data];
    newData[index].data = e.target.value;
    setData(newData);
  };

  return (
    <>
      <main className="flex-1">
        <div>
          <div>
            <div className="col-span-3 bg-gray-200 p-6">
              <div className="max-w-7xl mx-auto md:px-8 flex justify-between items-center">
                <dt className="text-xl font-medium leading-6 uppercase">
                  {" "}
                  {data[0].heading}
                </dt>
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
          </div>

          <div className="max-w-7xl  p-6 bg-gray-100 ">
            <div className="md:grid md:gap-6">
              <div className=" md:col-span-2">
                <form onSubmit={saveItem}>
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        {data.map((item, index) => (
                          <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                            <label
                              htmlFor={item.label}
                              className="block text-sm font-medium text-gray-700"
                            >
                              {item.label}
                              {item.name}
                            </label>
                            <input
                              type={item.type}
                              name={item.name}
                              id={item.name}
                              value={item.data}
                              onChange={(evt) => handleInputName(evt, index)}
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md "
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-white text-center sm:px-6">
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
      </main>
    </>
  );
};

export default SettingPageEdit;
