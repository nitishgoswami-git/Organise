import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, clearUser } = useAuthStore();
  const [addListOpen, setAddListOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Optional: tell backend to clear refresh token cookie
      await axios.post(
        "http://localhost:8000/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );

      // Clear Zustand store
      clearUser();

      // Redirect to login
      navigate("/login");
    } catch (err) {
      console.log("Logout error:", err.response?.data || err.message);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-700 flex items-center justify-center text-white">
        Loading dashboard...
      </div>
    );
  }

  const firstLetter = user.FirstName?.[0] || "?";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="flex flex-col bg-gray-800 w-20 h-dvh items-center py-6">
        {/* Top User Icon */}
        <div className="flex-1">
          {user.photo ? (
            <img
              src={user.photo}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover border border-white/20"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-lg font-bold text-white border border-white/20">
              {firstLetter}
            </div>
          )}
        </div>

        {/* Bottom Spacer */}
        <div className="flex-1"></div>

        {/* Logout */}
        <LogOut
          size={45}
          className="text-white mb-4 cursor-pointer p-2 rounded-full hover:text-gray-800 hover:bg-gray-400"
          onClick={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
          <button className="px-4 py-2 border-2 text-black rounded-lg font-semibold hover:bg-gray-700 hover:text-white transition">
            Create Board
          </button>
        </header>

        {/* Boards */}
        {!user.Boards || user.Boards.length === 0 ? (
          <div className="bg-gray-800 border border-white/10 rounded-2xl p-6 text-gray-400">
            You don’t have any boards yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.Boards.map((boardId) => (
              <div
                key={boardId}
                className="bg-gray-900 border border-white/10 rounded-2xl p-4 hover:border-white transition cursor-pointer"
              >
                <h4 className="font-semibold text-lg">Board</h4>
                <p className="text-sm text-gray-400">Board ID: {boardId}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
