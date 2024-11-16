import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../utils/server.js";
import { userContex } from "../contex/UserContex.js";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setIsAuthenticated, setUser } = useContext(
    userContex
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/users/signup`,
        {
          name: fullName,
          email,
          password,
          phoneNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      localStorage.setItem("CarStore-Auth_Token", data.token);
      toast.success(data.message, {
        position: "top-center",
      });
      setIsAuthenticated(true);
      setUser(data.user)
      navigate("/user-profile");
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <div
        className="w-full max-w-md p-8  bg-white mt-[-100px] md:mt-[-70px]
      shadow-2xl shadow-gray-700 rounded-xl mr-5 ml-5"
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Welcome to Car Store
        </h1>
        <h1 className="text-xl font-bold text-center text-gray-600">
          Create your account
        </h1>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-600">
              FullName
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border rounded focus:outline-none border-gray-500
                        focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 border rounded focus:outline-none border-gray-500
                        focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-600">
              Phone Number
            </label>
            <input
              type="number"
              name="phoneNumber"
              className="w-full px-4 py-2 border rounded focus:outline-none border-gray-500
                        focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
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
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Register &rarr;
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here &rarr;
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
