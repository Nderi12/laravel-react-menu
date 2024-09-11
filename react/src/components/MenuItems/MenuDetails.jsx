import React, { useState, useEffect } from "react";
import axiosClient from "../../axios";

const MenuDetails = ({ selectedMenu, onUpdateMenu, onDeleteMenu }) => {
  const [menuData, setMenuData] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const isNewMenu = !menuData.id;

  // Update local state when the selected menu changes
  useEffect(() => {
    if (selectedMenu && selectedMenu.id) {
      axiosClient
        .get(`/menus/${selectedMenu.id}`)
        .then((response) => {
          setMenuData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching menu data", error);
        });
    } else {
      // Reset form when adding a new menu item
      setMenuData({ parent_id: selectedMenu?.parent_id || null });
    }
  }, [selectedMenu]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuData({ ...menuData, [name]: value });
  };

  const handleSave = () => {
    setIsSaving(true); // Start saving

    const request = isNewMenu
      ? axiosClient.post("/menus", menuData) // Create a new menu item
      : axiosClient.put(`/menus/${menuData.id}`, menuData); // Update existing menu item

    request
      .then((response) => {
        onUpdateMenu(response.data);
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error updating menu:", error);
      })
      .finally(() => {
        setIsSaving(false); // End saving
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      onDeleteMenu(menuData.id); // Call delete function from parent
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {isNewMenu ? "New Menu" : `${menuData.name} Details`}
      </h2>
      <form onSubmit={handleSave}>
        {/* Menu ID Field */}
        {!isNewMenu && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Menu ID
            </label>
            <input
              name="uuid"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={menuData.uuid || ""}
              data-cy="menu-id-input"
              readOnly
            />
          </div>
        )}

        {/* Depth Field */}
        {!isNewMenu && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Depth
            </label>
            <input
              name="depth"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={menuData.order || "0"}
              data-cy="menu-depth-input"
              readOnly
            />
          </div>
        )}

        {/* Parent ID Field */}
        {isNewMenu && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Parent Data
            </label>
            <input
              name="parent_id"
            type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={menuData.parent_id || ""}
              onChange={handleChange}
              data-cy="menu-parent-id-input"
            />
          </div>
        )}

        {/* Parent Data Field */}
        {!isNewMenu && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Parent Name
            </label>
            <input
              name="name"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={menuData.parent ? menuData.parent.name : "No Parent"}
              data-cy="menu-name-input"
              onChange={handleChange}
            />
          </div>
        )}

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            name="name"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={menuData.name || ""}
            onChange={handleChange}
            data-cy="menu-name-input"
          />
        </div>

        {/* Save and Cancel Buttons */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded mr-2 ${
              isSaving ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleSave}
            disabled={isSaving} // Disable button while saving
            data-cy="save-menu-button"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
          {!isNewMenu && (
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDelete}
              data-cy="delete-menu-button"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MenuDetails;
