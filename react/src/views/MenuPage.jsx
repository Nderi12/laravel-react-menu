// src/pages/MenuPage.jsx
import React, { useEffect, useState } from "react";
import MenuDetails from "../components/MenuItems/MenuDetails";
import axiosClient from "../axios";
import MenuTree from "../components/MenuItems/MenuTree";

const MenuPage = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingChild, setIsAddingChild] = useState(false); // State to handle adding mode

  useEffect(() => {
    axiosClient
      .get("/menus")
      .then((response) => {
        setMenuData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching menu data");
        setLoading(false);
      });
  }, []);

  const handleSelectMenu = (menu) => {
    setSelectedMenu(menu);
    setIsAddingChild(false); // Reset adding mode
  };

  const handleAddChild = (parentMenu) => {
    setSelectedMenu({ parent_id: parentMenu.id }); // Set selected menu for new child
    setIsAddingChild(true); // Enter adding mode
  };

  const handleExpandCollapseAll = (expand) => {
    setIsExpanded(expand);
  };

  const handleSaveMenu = (menu) => {
    if (isAddingChild) {
      // Handle creation of new child menu
      axiosClient.post("/menus", menu).then((response) => {
        // Add new child to the menu data
        const updatedMenuData = menuData.map((item) =>
          item.id === menu.parent_id
            ? { ...item, children: [...(item.children || []), response.data] }
            : item
        );
        setMenuData(updatedMenuData);
        setIsAddingChild(false); // Reset adding mode
        setSelectedMenu(null); // Deselect the menu
      });
    } else {
      // Handle update of existing menu
      axiosClient.put(`/menus/${menu.id}`, menu).then((response) => {
        setMenuData(
          menuData.map((item) =>
            item.id === response.data.id ? response.data : item
          )
        );
        setSelectedMenu(response.data);
      });
    }
  };

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex w-full h-screen">
      {/* Menu Tree Section */}
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
            onAddChild={handleAddChild}
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
