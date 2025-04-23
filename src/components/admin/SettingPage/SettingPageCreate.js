import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SettingPage = ({ ListtoCreate, close , closeModal }) => {
  const [data, setSetData] = useState(ListtoCreate);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");

  const handleInput = (e) => {
    if (e.target.type == "color") {
      setColor(e.target.value);
    } else {
      setName(e.target.value);
    }
  };

  const saveItem = async (e) => {
    e.preventDefault();

    let url = "";
    data.forEach((item) => {
      url = item.url;
      setName(item.name);
      setColor(item.color);
    });

    const token = localStorage.getItem("token");
    const headers = {
      authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    try {
      const res = await axios.post(
        "public/" + data[0].url,
        { name, color },
        { headers }
      );
      if (res.data.success) {
        close();
        data.map((item) => {
          toast.success(`${item[0].label} Created successfully!`);
        });
      } else {
      }
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  };

  return (
    <>
      <main className="flex-1">
        <div>
          <div>
            <div className="col-span-3 bg-gray-200 p-6">
              <div className="max-w-7xl mx-auto md:px-8 flex justify-between items-center">
                <dt className="text-xl font-medium leading-6 uppercase">
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
                        {data.map((item) => (
                          <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                            <label
                              htmlFor={item.label}
                              className="block text-sm font-medium text-gray-700"
                            >
                              <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                                {item.label}
                              </span>
                            </label>
                            <input
                              type={item.type}
                              name={item.name}
                              id={item.name}
                              required
                              onChange={handleInput}
                              autoComplete={item.name}
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

export default SettingPage;
