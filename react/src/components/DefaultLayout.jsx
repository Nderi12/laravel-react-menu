import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { menuData as initialMenuData } from "../data/menuData"; // Import initial menu data
import { userStateContext } from "../contexts/ContextProvider";
import TopNavBar from "./TopNavBar";

export default function DefaultLayout() {
  const { currentUser, userToken } = userStateContext()

  if (!userToken) {
    return <Navigate to='login' />
  }

  const [menuData] = useState(initialMenuData); // Central state for menu items

  const handleSelectMenu = (menu) => {
      setSelectedMenu(menu);
    };

  return (
    <>
      <TopNavBar />
      
      <div className="flex">

        <Sidebar menuData={menuData} onSelectMenu={handleSelectMenu} />
        
        <Outlet />
      </div>
    </>
    );
}