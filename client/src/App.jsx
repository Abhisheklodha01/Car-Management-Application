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

function App() {
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
