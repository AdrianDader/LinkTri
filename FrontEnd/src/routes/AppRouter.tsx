import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/public/HomePage";
import DashboardPage from "../pages/private/DashboardPage";
import RegisterPage from "../pages/public/RegisterPage";
import LoginPage from "../pages/public/LoginPage";
import { useAuth } from "../context/useAuth";
import NotFound from "../pages/shared/NotFoundPage";
import UserProfile from "../pages/private/Profile";

export default function AppRouter() {
  const { userLogged } = useAuth();

  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* PRIVATE ROUTES */}
        {userLogged.id && <Route path="/dashboard" element={<DashboardPage />} />}
        {userLogged.id && <Route path="/profile" element={<UserProfile />} />}

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}
