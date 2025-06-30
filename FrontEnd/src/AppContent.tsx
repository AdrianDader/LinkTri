import { useLocation } from "react-router-dom";
import Footer from "./components/shared/Footer";
import NavBar from "./components/shared/NavBar";
import AppRouter from "./routes/AppRouter";

function AppContent() {
    const location = useLocation();

  const hideFooter = location.pathname.startsWith('/dashboard');
  return (
    <>
      <NavBar />
      <AppRouter />
      {!hideFooter && <Footer />}
    </>
  );
}

export default AppContent;
