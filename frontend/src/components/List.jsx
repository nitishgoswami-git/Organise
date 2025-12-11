import React, { useState } from "react";
import Card from "./Card";
import {
  ArrowBigDown,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash,
} from "lucide-react";

const List = () => {
  const [ListBody, setListBody] = useState(true);

  const handleCardBody = () => {
    setListBody((prev) => !prev);
  };
  return (
    <>
      <div className="w-100 border-2 border-dotted  mx-10 my-5 rounded-2xl relative pb-4  ">
        {/* title of the card */}
        <div
          className={`flex justify-between items-center bg-gray-800 text-white px-3 py-2 ${
            ListBody ? "rounded-t-2xl" : "rounded-2xl"
          }`}
        >
          <h1>Name of the List</h1>
          <div className="flex gap-2 bg-neutral-600 rounded-full p-1 items-center">
            <Plus size={20} />
            <Trash color={"#FF1E56"} size={20} />
            {ListBody ? (
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
        {ListBody && (
          <>
            <Card />
            <Card />
          </>
        )}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-black rounded-full w-6 h-6 "></div>
      </div>
    </>
  );
};

export default List;
