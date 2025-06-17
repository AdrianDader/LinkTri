import "./App.css";
import NavBar from "./components/shared/NavBar";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar />
      <AppRouter />
      </BrowserRouter>
    </>
  );
}

export default App;
