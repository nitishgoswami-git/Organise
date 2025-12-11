import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash,
} from "lucide-react";

const Card = () => {
  const [CardBody, setCardBody] = useState(true);

  const handleCardBody = () => {
    setCardBody((prev) => !prev);
  };

  return (
    <div className="m-2">
      <div
          className={`flex justify-between items-center bg-gray-800 text-white px-3 py-2 ${
            CardBody ? "rounded-t-2xl" : "rounded-2xl"
          }`}
        >
        <h1>Title of the card</h1>
        <h2>No:1</h2>
        <div className="flex gap-2 bg-neutral-600 rounded-full p-1 items-center">
            <Pencil size="18"/>
          <Trash color={"#FF1E56"} size={20} />
          {CardBody ? (
            <ChevronUp
              onClick={handleCardBody}
              className="cursor-pointer bg-gray-500 rounded-full p-1"
            />
          ) : (
            <ChevronDown
              onClick={handleCardBody}
              className="cursor-pointer  bg-gray-500 rounded-full p-1"
            />
          )}
        </div>
      </div>

      {/* Card Body */}
      {CardBody && (
        <div className="bg-white border-2   p-2 flex flex-col items-center rounded-b-lg">
          <p className="text-sm text-gray-700 mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo dicta
            dignissimos, a aliquam est dolores! Eaque molestiae dolore quas?
          </p>

          <ul className="flex flex-col gap-1 text-gray-600 text-sm">
            <li>assignedTo</li>
            <li>labels</li>
            <li>comments</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Card;
