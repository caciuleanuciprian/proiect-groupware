import Register from "../pages/Register/RegisterPage";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Profile from "../components/Profile/Profile";
import { Routes, Route } from "react-router";
import StrangerProfile from "../components/Profile/StrangerProfile";

const RoutesMap = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/stranger" element={<StrangerProfile />} />
    </Routes>
  );
};

export default RoutesMap;
