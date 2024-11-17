import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../utils/server.js";
import { userContex } from "../contex/UserContex.js";

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false)
  const { isAuthenticated } = useContext(userContex);
  const fetchCars = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${backendUrl}/cars/getallcars`, {
        withCredentials: true,
      });
      setCars(data.cars);
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

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
            to={isAuthenticated ? "/view-cars" :"/signup"}
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
            dark:text-blue-500 mt-56 ml-40 md:mt-52 md:ml-[600px]"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only"></span>
        </div>
      ) : (
      <div className="md:mt-[270px] mt-[390px] mb-20">
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
