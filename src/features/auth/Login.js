import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Arrival from "../../images/arrival.png";

import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/crm/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("public/api/login", {
        email: email,
        password: password,
      });
       console.log( response.data.token)
       localStorage.setItem("token", response.data.token);
       navigate("/crm/dashboard");
       window.location.reload();
      if (response.data.success) {
        
        // localStorage.setItem("role_id", response.data.user.fixed_role_id);
        // localStorage.setItem("user", JSON.stringify(response.data.user));
        // localStorage.setItem("user_id", JSON.stringify(response.data.user.id));
        // localStorage.setItem(
        //   "user_name",
        //   JSON.stringify(response.data.user.name)
        // );
       
      } else {
        setError(response.data);
        setErrorMessage(response.data.message);
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

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
      {/* <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
      >
        <div className="max-w-md w-full shadow-lg overflow-hidden p-8 bg-white">
          <div className="flex items-center justify-center flex-col  ">
            <img
              className=" h-40 w-auto "
              src={Arrival}
              alt="Workflow"
            />

            <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-700">
              Sign in to your account
            </h2>
          </div>

          <button
            type="button"
            className="absolute top-0 right-0 m-4 p-2 text-gray-400 hover:text-gray-500 bg-gray-100 rounded"
            onClick={toggleFullScreen}
          >
            {document.fullscreenElement ? (
              <BiExitFullscreen
                className="text-gray-600 h-6 w-6"
                aria-hidden="true"
              />
            ) : (
              <BiFullscreen
                className="text-gray-600 h-6 w-6"
                aria-hidden="true"
              />
            )}
          </button>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500  sm:text-sm"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 py-3 text-gray-600"
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
              </div>
            </div>
            {errorMessage && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errorMessage}
              </p>
            )}

            <div className="flex items-center justify-end">
             

              <div className="text-sm">
                                <Link to="/forgot/password" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</Link>
                            </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0112 4v4a4 4 0 00-4 4h4a4 4 0 004-4h4a8 8 0 01-8 8v-4a4 4 0 00-4-4z"
                    ></path>
                  </svg>
                ) : null}
                {!loading && "Sign in"}
              </button>
            </div>
          </form>
         
        </div>
      </div> */}
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl lg:flex">
        <div className="w-full p-10 lg:w-1/2">
          <div className="flex justify-center">
            <img className="h-24" src={Arrival} alt="Logo" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-center text-gray-500">Sign in to continue</p>
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-700 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-300"
                required
              />
            </div>
            {errorMessage && (
              <p className="text-sm text-red-600">{errorMessage}</p>
            )}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-purple-500 focus:ring-purple-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to="/crm/forgot/password"
                className="text-sm text-purple-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 px-4 py-3 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:from-purple-600 hover:to-indigo-600 focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            className="h-full w-full object-cover rounded-r-3xl"
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
            alt="Background"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-6 text-center">
            <h2 className="text-3xl font-bold">Join Us Today</h2>
            <p className="mt-2 text-lg">Sign in and explore endless possibilities.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
