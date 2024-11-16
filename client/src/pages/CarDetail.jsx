import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../utils/server";
import { toast } from "react-hot-toast";
import { userContex } from "../contex/UserContex.js";

const CarDetail = () => {
  const { carId } = useParams();
  const [carDetail, setCarDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(userContex);
  const getCarDetails = async (carId) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${backendUrl}/cars/getcardetail/${carId}`
      );
      toast.success(data.message, {
        position: "top-center",
      });
      setCarDetail(data.car);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCarDetails(carId);
  }, []);

  return (
    <div className="min-h-screen bg-gray-300">
      {loading ? (
        <div
          className="animate-spin inline-block size-16 md:size-32 border-[3px] border-current
         border-t-transparent text-blue-600 rounded-full
          dark:text-blue-500 mt-52 ml-36 md:mt-52 md:ml-[600px]"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only"></span>
        </div>
      ) : (
        ""
      )}
      <div className="text-lg text-gray-700 flex flex-col gap-5 m-10 mt-0">
        <h1 className="mt-16">
          <strong>Car Name: </strong> {carDetail?.title}
        </h1>
        <h1>
          <strong>Car Id: </strong> {carDetail?.carId}
        </h1>
        <h1>
          <strong>Tags: </strong> {carDetail?.tags}
        </h1>
        <h1>
          <strong>Description: </strong> {carDetail?.description}
        </h1>
        <h1>
          <strong>User Name: </strong> {user?.name}
        </h1>
      </div>
      <h1 className="text-2xl font-bold text-gray-700 text-center">Images:</h1>
      <div className="m-5 mr-5 ml-5 pb-16">
        {carDetail.images && carDetail.images.length > 0 ? (
          <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
            {carDetail.images.map((image, index) => (
              <div key={index} className="flex justify-center items-center">
                <img
                  src={image}
                  alt="car image"
                  className="w-full md:w-[450px] h-[230px] md:h-[300px] object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default CarDetail;
