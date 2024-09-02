// src/pages/MenuPage.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MenuTree from "../components/MenuItems/MenuTree";
import MenuDetails from "../components/MenuItems/MenuDetails";
import { menuData as initialMenuData } from "../data/menuData"; // Import initial menu data

const MenuPage = () => {
  const [menuData, setMenuData] = useState(initialMenuData); // Central state for menu items
  const [selectedMenu, setSelectedMenu] = useState(menuData[0]); // Initially select the first item
  const [isExpanded, setIsExpanded] = useState(false); // State to manage the expand/collapse of the entire tree

  // Function to handle menu item selection
  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  // Function to handle expand/collapse all
  const handleExpandCollapseAll = (expand) => {
    setIsExpanded(expand);
  };

  return (
    <div className="flex w-full h-screen">
      {/* Menu Details Form Section */}
      <div className="w-2/3 bg-white p-6 overflow-auto">
        <div className="w-full bg-gray-100 p-4">
          {/* Expand/Collapse Buttons */}
          <div className="flex justify-between mb-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleExpandCollapseAll(true)}
            >
              Expand All
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleExpandCollapseAll(false)}
            >
              Collapse All
            </button>
          </div>

          {/* Menu Tree */}
          <MenuTree
            menuData={menuData}
            isExpanded={isExpanded}
            onSelectMenu={handleSelectMenu}
          />
        </div>
      </div>

      {/* Menu Details Form Section */}
      <div className="w-2/3 bg-white p-6 overflow-auto">
        {selectedMenu ? (
          <MenuDetails
            selectedMenu={selectedMenu}
            onUpdateMenu={(updatedMenu) =>
              setMenuData(
                menuData.map((item) =>
                  item.id === updatedMenu.id ? updatedMenu : item
                )
              )
            }
          />
        ) : (
          <div className="text-center text-gray-500">
            Select a menu item to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
