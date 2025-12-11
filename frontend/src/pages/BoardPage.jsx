import React from "react";
import List from "../components/List";
import SideBar from "../components/SideBar/SideBar";

const BoardPage = () => {
  return (
    <>
      <div className="flex">
        <SideBar />

        {/* Lists */}
        <div className="flex-1 bg-gray-100">
          <List />
        </div>
      </div>
    </>
  );
};

export default BoardPage;
