import Register from "../pages/Register/RegisterPage";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import { Routes, Route } from "react-router";

const RoutesMap = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default RoutesMap;
