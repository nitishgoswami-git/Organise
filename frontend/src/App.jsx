import { useAuthStore } from "./store/auth.store"; 
import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/auth/me", {
          withCredentials: true, // important to send the cookie
        });
        setUser(res.data.data); // hydrate the store
      } catch (err) {
        clearUser(); // user not logged in
      }
    };

    fetchMe();
  }, [setUser, clearUser]);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
