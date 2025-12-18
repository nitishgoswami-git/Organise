import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash,
} from "lucide-react";

const Card = ({ card }) => {
  const [CardBody, setCardBody] = useState(true);

  const handleCardBody = () => {
    setCardBody((prev) => !prev);
  };

  // Fallback if no card data is provided
  if (!card) {
    return null;
  }

  return (
    <div className="m-2">
      <div
        className={`flex justify-between items-center bg-gray-800 text-white px-3 py-2 ${
          CardBody ? "rounded-t-2xl" : "rounded-2xl"
        }`}
      >
        <h1 className="text-sm font-medium">{card.Title || "Untitled"}</h1>
        <h2 className="text-xs">#{card.Postion || 1}</h2>
        <div className="flex gap-2 bg-neutral-600 rounded-full p-1 items-center">
          <Pencil size="18" className="cursor-pointer hover:scale-110 transition-transform" />
          <Trash 
            color={"#FF1E56"} 
            size={20} 
            className="cursor-pointer hover:scale-110 transition-transform"
          />
          {CardBody ? (
            <ChevronUp
              onClick={handleCardBody}
              className="cursor-pointer bg-gray-500 rounded-full p-1 hover:bg-gray-600"
            />
          ) : (
            <ChevronDown
              onClick={handleCardBody}
              className="cursor-pointer bg-gray-500 rounded-full p-1 hover:bg-gray-600"
            />
          )}
        </div>
      </div>

      {/* Card Body */}
      {CardBody && (
        <div className="bg-white border-2 p-2 flex flex-col items-start rounded-b-lg">
          {/* Description */}
          {card.Description ? (
            <p className="text-sm text-gray-700 mb-3 w-full">
              {card.Description}
            </p>
          ) : (
            <p className="text-sm text-gray-400 mb-3 italic">
              No description
            </p>
          )}

          {/* Card Details */}
          <ul className="flex flex-col gap-2 text-gray-600 text-sm w-full">
            {/* Assigned To */}
            <li className="flex items-center gap-2">
              <span className="font-semibold">Assigned To:</span>
              {card.AssignedTo && card.AssignedTo.length > 0 ? (
                <span>{card.AssignedTo.length} user(s)</span>
              ) : (
                <span className="text-gray-400">Unassigned</span>
              )}
            </li>

            {/* Labels */}
            <li className="flex items-center gap-2">
              <span className="font-semibold">Labels:</span>
              {card.Labels ? (
                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                  {card.Labels}
                </span>
              ) : (
                <span className="text-gray-400">No labels</span>
              )}
            </li>

            {/* Comments */}
            <li className="flex items-center gap-2">
              <span className="font-semibold">Comments:</span>
              {card.Comments && card.Comments.length > 0 ? (
                <span>{card.Comments.length} comment(s)</span>
              ) : (
                <span className="text-gray-400">No comments</span>
              )}
            </li>

            {/* Created At */}
            <li className="flex items-center gap-2 text-xs text-gray-500 mt-1">
              <span className="font-semibold">Created:</span>
              <span>{new Date(card.createdAt).toLocaleDateString()}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Card;