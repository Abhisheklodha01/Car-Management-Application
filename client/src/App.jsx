import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import UploadCars from "./pages/UploadCars";
import ViewCars from "./pages/ViewCars";
import CarDetail from "./pages/CarDetail";
import ForgotPassword from "./pages/ForgotPassword";
import { userContex } from "./contex/UserContex";
import { useContext, useEffect } from "react";
import { backendUrl } from "./utils/server";
import axios from "axios";
import UpdateCarDetails from "./pages/UpdateCarDetaills";

function App() {
  const { isAuthenticated, setUser, setIsAuthenticated} =
    useContext(userContex);
    const token = localStorage.getItem("CarStore-Auth_Token");
  useEffect(() => {
    axios
      .get(`${backendUrl}/users/user-profile`, {
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token}`,
        }

      })
      .then((res) => {
        setUser(res.data.user)
        setIsAuthenticated(true)
      })
      .catch((error) => {
        setUser({})
        setIsAuthenticated(false)
      });
  }, [isAuthenticated])

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/upload-cars" element={<UploadCars />} />
        <Route path="/view-cars" element={<ViewCars />} />
        <Route path="/cardetail/:carId" element={<CarDetail />} />
        <Route path="/updatecardetail/:carId" element={<UpdateCarDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
