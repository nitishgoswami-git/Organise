import React, { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/auth.store";
import { useBoardStore } from "../store/boards.store";
import { useNavigate } from "react-router-dom";

import CreateBoard from "../components/CreateBoard";
import BoardCard from "../components/BoardCard";

import { authApi } from "../api/auth";
import { boardApi } from "../api/board";

const Dashboard = () => {
  const { user, clearUser, setUser } = useAuthStore();
  const { boards, setBoards, addBoard, clearBoards } = useBoardStore();

  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const navigate = useNavigate();


  // Logout handler
  const handleLogout = async () => {
    try {
      setLoadingLogout(true);
      await authApi.logout();
      clearUser();
      clearBoards();
      navigate("/login");
    } catch (err) {
      console.log("Logout error:", err.response?.data || err.message);
    } finally {
      setLoadingLogout(false);
    }
  };

  // Open/close create board modal
  const handleCreateBoard = () => setIsCreateBoardOpen(true);
  const closeCreateBoard = () => setIsCreateBoardOpen(false);

  // Handle new board creation
  const handleBoardCreate = async (data) => {
    try {
      const res = await boardApi.createBoard({ ...data, userId: user._id });
      addBoard(res.data);
      setUser({ ...user, Boards: [...(user.Boards || []), res.data._id] });
      closeCreateBoard();
    } catch (err) {
      console.log("Create board error:", err.response?.data || err.message);
    }
  };

  const handleBoardClick = (board) => {
    console.log("Open board:", board);
    navigate(`/boards/${board._id}`);
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

        <div className="flex-1"></div>

        <LogOut
          size={45}
          className={`mb-4 cursor-pointer p-2 rounded-full ${
            loadingLogout
              ? "bg-gray-500 text-gray-300"
              : "text-white hover:text-gray-800 hover:bg-gray-400"
          }`}
          onClick={handleLogout}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
          <button
            className="px-4 py-2 border-2 text-black rounded-lg font-semibold hover:bg-gray-700 hover:text-white transition"
            onClick={handleCreateBoard}
          >
            Create Board
          </button>
          {isCreateBoardOpen && (
            <CreateBoard
              onClose={closeCreateBoard}
              onCreate={handleBoardCreate}
            />
          )}
        </header>

        {/* Boards Grid */}
        {boards.length === 0 ? (
          <div className="bg-gray-800 border border-white/10 rounded-2xl p-6 text-gray-400">
            You don’t have any boards yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board) => (
              <BoardCard
                key={board._id}
                board={board}
                onClick={() => handleBoardClick(board)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
