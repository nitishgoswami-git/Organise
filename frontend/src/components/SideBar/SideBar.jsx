import React, { useState } from "react";
import {
  Home,
  LayersPlus,
  LayoutDashboard,
  LogOut,
  PlusCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import UserBoards from "./UserBoards";
import CreateList from "./CreateList";
import CreateBoard from "../../components/CreateBoard";

import { authApi } from "../../api/auth";
import { boardApi } from "../../api/board";
import { listApi } from "../../api/list";
import { useAuthStore } from "../../store/auth.store";
import { useBoardStore } from "../../store/boards.store";
import { useListStore } from "../../store/lists.store"; // NEW

// Accept boardId so lists are created on the active board
const SideBar = ({ boardId }) => {
  console.log("SideBar boardId prop:", boardId);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [isCreateBoardOpen, setIsCreateBoardOpen] = useState(false);
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const { user, clearUser, setUser } = useAuthStore();
  const { boards, clearBoards, setBoards, addBoard } = useBoardStore();
  const { lists, setLists, addList } = useListStore(); // adjust to your store
  const navigate = useNavigate();

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

  // BOARD: open/close + create
  const handleCreateBoardOpen = () => setIsCreateBoardOpen(true);
  const handleCreateBoardClose = () => setIsCreateBoardOpen(false);

  const handleBoardCreate = async (data) => {
    try {
      if (!user?._id) return;

      const res = await boardApi.createBoard({ ...data, userId: user._id });

      if (typeof addBoard === "function") {
        addBoard(res.data);
      } else {
        setBoards([...(boards || []), res.data]);
      }

      setUser({
        ...user,
        Boards: [...(user.Boards || []), res.data._id],
      });

      handleCreateBoardClose();
    } catch (err) {
      console.log("Create board error:", err.response?.data || err.message);
    }
  };

  // LIST: open/close + create (same pattern as boards)
  const handleCreateListOpen = () => setIsCreateListOpen(true);
  const handleCreateListClose = () => setIsCreateListOpen(false);

  const handleListCreate = async (data) => {
    try {
      // need an active board to attach the list
      if (!boardId) return;

      console.log("List data before sending", data, boardId);

      // data typically has { title } or { name } from CreateList form
      const res = await listApi.createList({ ...data, boardId });

      if (typeof addList === "function") {
        addList(res.data);
      } else {
        setLists([...(lists || []), res.data]);
      }

      handleCreateListClose();
    } catch (err) {
      console.log("Create list error:", err.response?.data || err.message);
    }
  };

  const handleDashboard = () => {
    setDashboardOpen((prev) => !prev);
    setIsCreateListOpen(false);
  };

  const handleBoardClick = (id) => {
    navigate(`/boards/${id}`);
    setDashboardOpen(false);
  };

  const firstLetter = user?.FirstName?.[0] || "?";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="flex flex-col bg-gray-800 w-20 h-dvh items-center py-6">
        {/* User avatar */}
        <div className="flex-1">
          {user?.photo ? (
            <img
              src={user.photo}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-white">
              {firstLetter}
            </div>
          )}
        </div>

        {/* Icons */}
        <div className="flex flex-col gap-6 items-center">
          <Link to="/dashboard">
            <Home
              size={50}
              className="p-2 rounded-full cursor-pointer text-white hover:bg-gray-500 hover:text-gray-700"
            />
          </Link>

          <LayoutDashboard
            size={50}
            className="p-2 rounded-full text-white cursor-pointer hover:bg-gray-500 hover:text-gray-700"
            onClick={handleDashboard}
          />

          <LayersPlus
            size={50}
            className="p-2 rounded-full text-white hover:bg-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={handleCreateBoardOpen}
          />

          {/* Create List icon uses same modal pattern as CreateBoard */}
          <PlusCircle
            size={50}
            className="bg-white p-3 rounded-full cursor-pointer"
            onClick={handleCreateListOpen}
          />
        </div>

        <div className="flex-1" />

        {/* Logout */}
        <LogOut
          size={45}
          className={`mb-4 cursor-pointer p-2 rounded-full ${
            loadingLogout
              ? "bg-gray-500 text-gray-300"
              : "text-white hover:bg-gray-400 hover:text-gray-800"
          }`}
          onClick={loadingLogout ? undefined : handleLogout}
        />
      </div>

      {/* Right Panels */}
      {dashboardOpen && <UserBoards onBoardClick={handleBoardClick} />}

      {/* List create modal (same pattern as CreateBoard) */}
      {isCreateListOpen && (
        <CreateList
          onClose={handleCreateListClose}
          onCreate={handleListCreate}
        />
      )}

      {/* Board create modal */}
      {isCreateBoardOpen && (
        <CreateBoard
          onClose={handleCreateBoardClose}
          onCreate={handleBoardCreate}
        />
      )}
    </div>
  );
};

export default SideBar;
