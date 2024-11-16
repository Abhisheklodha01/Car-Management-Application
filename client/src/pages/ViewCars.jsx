import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../utils/server.js";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { userContex } from "../contex/UserContex.js";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const token = localStorage.getItem("CarStore-Auth_Token");
  const { user } = useContext(userContex);
  const fetchCars = async () => {
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
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };
  useEffect(() => {
    fetchCars();
  }, [refresh]);

  const deleteCar = async (id) => {
    console.log(id);
    
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
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-center",
      });
      setRefresh(!refresh);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-300 flex
     flex-row justify-between text-gray-700"
    >
      <div className="mt-10 mb-10">
        {cars.map((car, index) => (
          <div
            className="flex gap-5 m-5 ml-3 mr-3 md:mr-0  flex-col
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
              <Link className=" bg-green-500 py-2 px-8 rounded-md text-white text-center">
                View Full details
              </Link>
              <button
                onClick={() => deleteCar(car?._id)}
                className="bg-red-500 py-2 px-8 rounded-md text-white ml-5 text-c"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCars;
