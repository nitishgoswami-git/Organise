import React, { useState } from "react";
import {
  LayersPlus,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  UserCircle,
} from "lucide-react";
import UserBoards from "./UserBoards";
import CreateList from "./CreateList";

const SideBar = () => {
  const [DashboardOpen, setDashboardOpen] = useState(false);
  const [AddList , setAddList] = useState(true);

  const handleDashboard = () => {
    setDashboardOpen(prev => !prev);
  };

  const handleListAdd =() => {
    setAddList ((prev) => !prev)
  }

  return (
    <>
      <div className="flex">
        
        {/* Sidebar */}
        <div className="flex flex-col bg-gray-700 w-20 h-dvh items-center py-6">
          {/* Top User Icon */}
          <div className="flex-1">
            <UserCircle size={50} className="p-2 rounded-full text-white" />
          </div>

          {/* CENTERED ICON GROUP */}
          <div className="flex flex-col gap-6 items-center">
            {DashboardOpen ? (<LayoutDashboard
              size={50}
              fill="white"
              className="p-2 rounded-full text-white cursor-pointer"
              onClick={handleDashboard}
            />):(<LayoutDashboard
              size={50}
              className="p-2 rounded-full text-white cursor-pointer"
              onClick={handleDashboard}
            />)}
            <LayersPlus size={50} className="p-2 rounded-full text-white" />
            <PlusCircle size={50} className="bg-white p-3 rounded-full" onClick={handleListAdd} />
          </div>

          {/* Bottom Spacer */}
          <div className="flex-1"></div>

          {/* Logout */}
          <LogOut size={30} className="text-white mb-4 cursor-pointer" />
        </div>

        {/* RIGHT SIDE — Show when DashboardOpen = true */}
        {DashboardOpen && (
          <div>
            <UserBoards />
          </div>
        )}
        {AddList &&  (
          <div>
            <CreateList/>
          </div>
        )}

      </div>
    </>
  );
};

export default SideBar;
