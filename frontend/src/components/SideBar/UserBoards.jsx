import React from "react";
import BoardCard from "../BoardCard";
import { useBoardStore } from "../../store/boards.store";

const UserBoards = ({ onBoardClick }) => {
  const { boards } = useBoardStore();

  return (
    <div
      className="
        absolute
        left-20
        top-0
        h-dvh
        w-[350px]
        bg-white
        rounded-r-3xl
        p-4
        shadow-xl
        z-50
      "
    >
      <h1 className="text-lg font-semibold mb-4">Your Boards</h1>

      <div className="flex flex-col gap-3">
        {boards.map((board) => (
          <BoardCard
            key={board._id}
            board={board}
            onClick={() => onBoardClick(board._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default UserBoards;
