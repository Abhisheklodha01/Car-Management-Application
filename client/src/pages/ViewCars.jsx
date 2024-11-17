import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../utils/server.js";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { userContex } from "../contex/UserContex.js";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("CarStore-Auth_Token");
  const { user } = useContext(userContex);
  const fetchCars = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/cars/getcars`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCars([...data.cars]);
      toast.success(data.message, {
        position: "top-center",
      });
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCars();
  }, [refresh]);

  const deleteCar = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${backendUrl}/cars/deletecar/${id}`,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message, {
        position: "top-center",
      });
      setRefresh(!refresh);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
      setRefresh(!refresh);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-300 flex
     flex-row justify-between text-gray-700"
    >
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
        <div className="mt-10 mb-10">
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
                <strong>User Name:</strong> {user?.name}
              </p>
              <div className="flex flex-row">
                <Link
                  to={`/cardetail/${car._id}`}
                  className=" bg-green-500 py-2 px-6 
              rounded-md text-white text-center"
                >
                  Details
                </Link>
                <Link
                  to={`/updatecardetail/${car._id}`}
                  className=" bg-yellow-500 py-2 px-6 
              rounded-md text-white text-center ml-5"
                >
                  Update
                </Link>
                <button
                  onClick={() => deleteCar(car?._id)}
                  className="bg-red-500 py-2 px-6 rounded-md text-white ml-5 text-c"
                >
                  {loading ? (
                    <div
                      className="animate-spin inline-block size-6 
                      border-[3px] border-current border-t-transparent
                       text-blue-600 rounded-full dark:text-blue-500"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewCars;
