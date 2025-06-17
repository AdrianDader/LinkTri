import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import DashboardPage from "../pages/private/DashboardPage";
import RegisterPage from "../pages/public/RegisterPage";

export default function AppRouter() {
  return (
    <>

        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* PRIVATE ROUTES */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>

    </>
  );
}
