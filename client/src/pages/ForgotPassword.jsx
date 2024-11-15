import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <div
        className="w-full max-w-md p-8  bg-white mt-[-100px] md:mt-[-70px]
    shadow-2xl shadow-gray-700 rounded-xl mr-5 ml-5"
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Forgot Password
        </h1>
        <form className="mt-6">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded focus:outline-none border-gray-500
                      focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 border rounded focus:outline-none border-gray-500
                      focus:ring-2 focus:ring-blue-500"
              required
            />
            <Link className="text-green-500">Back To Login &rarr;</Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded
           hover:bg-blue-600 focus:outline-none"
          >
            Change Password &rarr;
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
