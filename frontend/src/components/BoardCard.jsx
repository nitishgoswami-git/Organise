import React from "react";

const BoardCard = ({ board, onClick }) => {
  return (
    <div
      onClick={() => onClick?.(board)}
      className="bg-gray-900 border border-white/10 rounded-xl p-4 hover:border-white transition cursor-pointer"
    >
      <h4 className="font-semibold text-white text-lg">{board.Title}</h4>
      <p className="text-lg text-gray-400">{board.Description}</p>
    </div>
  );
};

export default BoardCard;
