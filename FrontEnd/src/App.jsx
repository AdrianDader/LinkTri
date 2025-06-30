// import "./App.css";
import "./AppLinkTri.css";
import NavBar from "./components/shared/NavBar";
import Footer from "./components/shared/Footer";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthProvider";
import AppContent from "./AppContent";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
          {/* <NavBar />
          <AppRouter />
          <Footer /> */}
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
