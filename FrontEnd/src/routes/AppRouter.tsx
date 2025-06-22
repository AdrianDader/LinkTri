import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import DashboardPage from "../pages/private/DashboardPage";
import RegisterPage from "../pages/public/RegisterPage";
import ScrollToHash from "../hooks/ScrollToHash";

export default function AppRouter() {
  return (
    <>
      {/* Detecta enlaces dentro de la misma página para hacer scroll-smooth */}
      {/* <ScrollToHash />  */}
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
