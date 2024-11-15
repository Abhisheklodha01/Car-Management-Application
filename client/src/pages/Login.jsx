import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import {backendUrl} from '../utils/server.js'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${backendUrl}/users/login`,
        {
          email,
          password,
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
      navigate("/user-profile");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
        
        
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-300">
      <div
        className="w-full max-w-md p-12  bg-white
      shadow-2xl shadow-gray-700 rounded-xl mr-5 ml-5"
      >
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Welcome Back to Car Store <span className="md:hidden">Manager</span>
        </h1>
        <h1 className="text-xl font-bold text-center text-gray-700 mt-2">
          Please Login to continue
        </h1>

        <form onSubmit={handleSubmit} className="mt-6">
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
            <Link to={"/forgot-password"} className="text-red-500">
              Forgot Password &rarr;
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded
             hover:bg-blue-600 focus:outline-none"
          >
            Login &rarr;
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
