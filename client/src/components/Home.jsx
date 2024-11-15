import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto px-4 py-12 text-center pt-44">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to Car Store Manager
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Effortlessly manage your cars, upload images, and keep track of all
          your vehicles in one place.
        </p>
        <div className="mt-6">
          <Link
            to={"/signup"}
            className="bg-white text-blue-500 px-6 py-3
             rounded shadow-md font-semibold hover:bg-blue-100 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
