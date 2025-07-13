import { useLocation } from "react-router-dom";
import Footer from "./components/shared/Footer";
import NavBar from "./components/shared/NavBar";
import NavBarHam from "./components/shared/NavBarHam";
import useIsMobile from "./hooks/useMobile";
import AppRouter from "./routes/AppRouter";
import Loader from "./components/shared/loader";

function AppContent() {
  const location = useLocation();
  const isMobile = useIsMobile();

  const hideFooter = location.pathname.startsWith("/dashboard");
  return (
    <>
     {/* < Loader /> */}
      {isMobile ? <NavBarHam /> : <NavBar />}
      <AppRouter />
      {!hideFooter && <Footer />}
    </>
  );
}

export default AppContent;
