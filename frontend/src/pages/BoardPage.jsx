import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// import socket from "../socket";

import SideBar from "../components/SideBar/SideBar";
import List from "../components/List/List";

import { useBoardStore } from "../store/boards.store";
import { useListStore } from "../store/lists.store";
import { boardApi } from "../api/board";
import { listApi } from "../api/list";

const BoardPage = () => {
  const { id: boardId } = useParams();
  console.log("BoardPage boardId:", boardId);

  const { boards, setBoards } = useBoardStore();
  const { setLists } = useListStore();

  const board = boards.find((b) => b._id === boardId);

  // Optional: hydrate board if not in store
  useEffect(() => {
    if (!boardId || board) return;

    const fetchBoard = async () => {
      try {
        const res = await boardApi.getBoardById(boardId);
        setBoards([res.data]);
      } catch (err) {
        console.error("Failed to fetch board", err);
      }
    };

    fetchBoard();
  }, [boardId, board, setBoards]);

  // Fetch lists for this board
  useEffect(() => {
    if (!boardId) return;

    const fetchLists = async () => {
      try {
        const res = await listApi.getLists(boardId);
        // if getListbyBoard returns res.data directly, adjust accordingly
        setLists(res.data);
      } catch (err) {
        console.error("Failed to fetch lists", err);
      }
    };

    fetchLists();
  }, [boardId, setLists]);

  // Socket room handling
  // useEffect(() => {
  //   if (!boardId) return;

  //   socket.emit("join-board", boardId);
  //   return () => {
  //     socket.emit("leave-board", boardId);
  //   };
  // }, [boardId]);

  if (!board) {
    return <div className="p-6">Loading board...</div>;
  }

  return (
    <div className="flex">
      <SideBar boardId={boardId} />

      <div className="flex-1">
        <div className="border-l-2 bg-gray-800 font-extralight text-white text-2xl px-6 py-4">
          {board.Title}
        </div>

        <List boardId={boardId} />
      </div>
    </div>
  );
};

export default BoardPage;
