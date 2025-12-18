import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import { useAuthStore } from "./store/auth.store";
import { useBoardStore } from "./store/boards.store";

import { authApi } from "./api/auth";
import { boardApi } from "./api/board";

import ProtectedRoutes from "./routes/ProtectedRoutes";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import BoardPage from "./pages/BoardPage";

function App() {
  const { setUser, clearUser } = useAuthStore();
  const { setBoards, clearBoards } = useBoardStore();

  useEffect(() => {
    const hydrateApp = async () => {
      try {
        // 1 Auth
        const meRes = await authApi.me();
        const user = meRes.data;
        setUser(user);

        // 2 Boards
        const boardsRes = await boardApi.getMyBoards(user._id);
        setBoards(boardsRes.data);
      } catch (err) {
        clearUser();
        clearBoards();
      }
    };

    hydrateApp();
  }, [setUser, clearUser, setBoards, clearBoards]);

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/boards/:id" element={<BoardPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
