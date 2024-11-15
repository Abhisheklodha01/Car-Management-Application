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
import Contex, { userContex } from "./contex/UserContex";
import { useContext, useEffect } from "react";

function App() {
  const { isAuthenticated, setUser, setIsAuthenticated } =
    useContext(userContex);
  const CheckUserIsAuthenticatedOrNot = async () => {
    try {
      const response = await Contex();
      setIsAuthenticated(true);
      setUser(response?.data.user);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    CheckUserIsAuthenticatedOrNot();
  }, [isAuthenticated]);

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
        <Route path="/cars:carId" element={<CarDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
