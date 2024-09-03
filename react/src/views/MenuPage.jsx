// src/pages/MenuPage.jsx
import React, { useEffect, useState } from "react";
import MenuTree from "../components/MenuItems/MenuTree";
import MenuDetails from "../components/MenuItems/MenuDetails";
import axiosClient from "../axios";

const MenuPage = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(menuData[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to handle menu item selection
  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
  };

  // Function to handle expand/collapse all
  const handleExpandCollapseAll = (expand) => {
    setIsExpanded(expand);
  };

  // Fetch the menu data when the component mounts
  useEffect(() => {
    axiosClient.get('/menus')
      .then(response => {
        setMenuData(response.data); // Set fetched menu data to state
        setLoading(false); // Stop loading
      })
      .catch(error => {
        setError('Error fetching menu data');
        setLoading(false); // Stop loading
      });
  }, []);

  const handleDeleteMenu = async (menuId) => {
    const menuItem = menuData.find((item) => item.id === menuId);

    if (menuItem && menuItem.children && menuItem.children.length > 0) {
      alert("Cannot delete a menu item with children.")
      return;
    }

    try {
      await axiosClient.delete(`/menus/${menuId}`);
      setMenuData(menuData.filter((item) => item.id !== menuId));
      setSelectedMenu(null);
    } catch (err) {
      console.error("Error deleting menu item:", err);
      alert("Failed to delete the menu item.");
    }
  }

  // Render loading, error or the menu tree
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
            onDeleteMenu={handleDeleteMenu}
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
