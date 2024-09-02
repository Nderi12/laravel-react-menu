import React, { useState, useEffect } from "react";

const MenuDetails = ({ selectedMenu, onUpdateMenu }) => {
  const [menuData, setMenuData] = useState(selectedMenu);

  useEffect(() => {
    setMenuData(selectedMenu); // Update local state when selected menu changes
  }, [selectedMenu]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuData({ ...menuData, [name]: value });
  };

  const handleSave = () => {
    onUpdateMenu(menuData); // Pass updated data back to parent
  };

  const handleCancel = () => {
    setMenuData(selectedMenu); // Reset to initial state
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Menu Details</h2>
      <form>
        {/* Form fields */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Menu ID
          </label>
          <input
            name="menuId"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={menuData.menuId || ""}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Depth
          </label>
          <input
            name="depth"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={menuData.depth || ""}
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Parent Data
          </label>
          <input
            name="parentData"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={menuData.parentData || ""}
            onChange={handleChange}
          />
        </div>
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
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default MenuDetails;
