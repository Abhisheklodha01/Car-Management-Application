import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../utils/server.js";

const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const token = localStorage.getItem("CarStore-Auth_Token");
  const fetchCars = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/cars/getcars`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  fetchCars();
  return <div>hello</div>;
};

export default ViewCars;
