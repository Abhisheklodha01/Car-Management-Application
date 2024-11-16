import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { userContex } from "../contex/UserContex.js";
import toast from "react-hot-toast";
const NavBar = () => {
  const [nav, setNav] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(userContex);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logout Successfully", {
      position: "top-center",
    });
    setIsAuthenticated(false);
    navigate("/");
  };
  return (
    <div className="h-16 flex flex-row justify-between items-center">
      <div className="">
        <h1 className="p-4 text-xl text-gray-700">CarStore</h1>
      </div>
      {isAuthenticated === true ? (
        <div className="hidden md:inline">
          <Link to={"/"} className="hover:text-amber-700 mr-10">
            Home
          </Link>
          <Link to={"/view-cars"} className="hover:text-amber-700 ml-10 mr-20">
            View Cars
          </Link>
          <Link to={"/upload-cars"} className="hover:text-amber-700">
           Your Profile
          </Link>
        </div>
      ) : (
        <div className="hidden md:inline">
          <Link to={"/"} className="hover:text-amber-700 mr-10">
            Home
          </Link>
        </div>
      )}
      {isAuthenticated === false ? (
        <div>
          <Link to={"/login"} className="mr-5">
            <button className="px-6 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <span className="relative z-20">Login</span>
            </button>
          </Link>
          <Link to={"/signup"} className="md:mr-5">
            <button className="px-6 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <span className="relative z-20">Signup</span>
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to={"/upload-cars"} className="mr-3">
            <button className="px-6 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <span className="relative z-20">Upload</span>
            </button>
          </Link>
          <button onClick={handleLogout} className="md:mr-5">
            <button className="px-6 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
              <span className="relative z-20">Logout</span>
            </button>
          </button>
        </div>
      )}
      <div
        onClick={() => setNav(!nav)}
        className="md:hidden cursor-pointer pr-4 z-30 text-gray-700"
      >
        {nav ? (
          <FaTimes size={30} className="text-gray-300 mr-36 mt-10" />
        ) : (
          <FaBars size={30} />
        )}
      </div>
      {nav && (
        <div
          onClick={() => setNav(!nav)}
          className="flex flex-col z-20 justify-center items-center absolute top-0 left-0
         w-full h-screen bg-slate-800 text-gray-200"
        >
          {isAuthenticated === true ? (
            <div className=" flex flex-col justify-center items-center">
              <Link to={"/"} className="mb-10">
                Home
              </Link>
              <Link to={"/view-cars"} className="mb-10">
                View Cars
              </Link>
              <Link className="mb-10" to={"/upload-cars"}>
                Upload Cars
              </Link>
              <Link className="mb-10" to={"/upload-cars"}>
                Your Profile
              </Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className=" flex flex-col justify-center items-center">
              <Link to={"/"} className="mb-10">
                Home
              </Link>
              <Link to={"/view-cars"} className="mb-10">
                Login
              </Link>
              <Link to={"/upload-cars"}>Signup</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
