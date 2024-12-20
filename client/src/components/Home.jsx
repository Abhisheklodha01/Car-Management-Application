import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../utils/server.js";
import { userContex } from "../contex/UserContex.js";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated } = useContext(userContex);
  const fetchCars = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/cars/getallcars`, {
        withCredentials: true,
      });
      setCars(data.cars);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const fetchCarsByQuery = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/cars/getcars/${keyword}`,
        {
          withCredentials: true,
        }
      );
      setCars(data.cars);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keyword !== "" && loading) {
      fetchCarsByQuery;
    } else {
      fetchCars();
    }
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen pb-2">
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
            to={isAuthenticated ? "/view-cars" : "/signup"}
            className="bg-white text-blue-500 px-6 py-3
             rounded shadow-md font-semibold hover:bg-blue-100 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
      {loading ? (
        <div
          className="animate-spin inline-block size-16 md:size-32 border-[3px] border-current
           border-t-transparent text-blue-600 rounded-full
            dark:text-blue-500 mt-56 ml-40 md:mt-40 md:ml-[700px]"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only"></span>
        </div>
      ) : (
        <div className="md:mt-[270px] mt-[390px] mb-20">
          <div className="pt-20">
            <div className="flex flex-col ml-10 text-gray-700 ">
              <label htmlFor="search" className="font-bold text-lg">
                Search By Keyword
              </label>
              <input
                className="py-2 w-[300px] px-6 mt-1 rounded-md outline-none border-2 border-gray-400"
                type="text"
                placeholder="Enter a keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                className="bg-blue-500 rounded-md py-2
               px-6 w-[300px] mt-2 text-white"
                onClick={fetchCarsByQuery}
              >
                Search
              </button>
              <h1 className="ml-32 mt-2 mb-2 text-xl">Or</h1>
              <button
                className="bg-blue-500 rounded-md py-2
               px-6 w-[300px] mt-2 text-white"
                onClick={fetchCars}
              >
                View All 
              </button>
            </div>
          </div>
          {cars.map((car, index) => (
            <div
              className="flex gap-5 m-5 ml-3 mr-6 md:mr-0  flex-col
           bg-white p-6 rounded-md mx-auto"
              key={car._id}
            >
              <h2>
                <strong>Car Name:</strong> {car.title.toUpperCase()}
              </h2>
              <p>
                <strong>Car ID:</strong> {car.carId}
              </p>
              <p>
                <strong>Description:</strong> {car.description}
              </p>
              <p>
                <strong>Tags:</strong> {car.tags.join(", ")}
              </p>
              <p>
                <strong>User:</strong> {car?.user || car?.userId}
              </p>
              <div className="flex flex-row">
                <Link
                  to={isAuthenticated ? `/cardetail/${car?._id}` : "/signup"}
                  className=" bg-green-500 py-2 px-6 
              rounded-md text-white text-center"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
