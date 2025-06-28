// import "./App.css";
import "./AppLinkTri.css";
import NavBar from "./components/shared/NavBar";
import Footer from "./components/shared/Footer";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";


function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
