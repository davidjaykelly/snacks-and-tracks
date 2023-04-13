import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// pages & components
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Recommended from "./pages/Recommended";
import AlbumPage from "./pages/AlbumPage";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App" style={{overflowX: "clip"}}>
      <BrowserRouter>
        <Navbar />
        <div className="" style={{ marginTop: "40px" }}>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/recommended"
              element={user ? <Recommended /> : <Navigate to="/login" />}
            />
            <Route
              path="/albums/:artist/:album"
              element={user ? <AlbumPage /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
