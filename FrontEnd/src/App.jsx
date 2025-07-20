// import "./App.css";
import "./AppLinkTri.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import AppContent from "./AppContent";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
