import { AlignRight } from "lucide-react";
import React from "react";

const CreateList = () => {
  return (
    <>
      <div
        className="
      absolute
      
      left-1/2 
      -translate-x-1/2 
      translate-y-1/2
      w-[350px]
      bg-white
      
      p-4
      shadow-xl
      z-50
    "
      >
        <h1>Create a New List</h1>
        <input type="text" name="" id="" className="border-2 w-full p-2 mt-2" placeholder="New List"/>
        <div className="flex gap-2 justify-end mt-2">
          <button type="button" className="bg-gray-800 text-white p-2" >Cancel</button>
          <button type="button" className="bg-gray-800 text-white p-2">Create</button>
        </div>
      </div>
    </>
  );
};

export default CreateList;
