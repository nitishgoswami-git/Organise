import React, { useEffect } from "react";
import socket from "../socket";
import List from "../components/List";
import SideBar from "../components/SideBar/SideBar";

const BoardPage = ({ boardId }) => {

  useEffect(() => {
    if (!boardId) return;

    // Join the board room
    socket.emit("join-board", boardId);
    console.log("Joined board:", boardId);

    // When unmounting → leave the room
    return () => {
      socket.emit("leave-board", boardId);
      console.log("Left board:", boardId);
    };

  }, [boardId]);

  return (
    <div className="flex">
      <SideBar />

      {/* Lists */}
      <div className="flex-1 bg-gray-100">
        <List />
      </div>
    </div>
  );
};

export default BoardPage;
