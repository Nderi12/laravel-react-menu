// src/components/MenuTree.jsx
import React, { useState, useEffect } from "react";
// import { PlusIcon } from "@heroicons/react/outline"; // Using Heroicons for the Add button

const MenuTree = ({ menuData, isExpanded, onSelectMenu, onAddChild }) => {
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const newExpandedState = {};
    menuData.forEach((item) => {
      newExpandedState[item.id] = isExpanded;
      if (item.children && item.children.length > 0) {
        item.children.forEach((child) => {
          newExpandedState[child.id] = isExpanded;
        });
      }
    });
    setExpandedItems(newExpandedState);
  }, [isExpanded, menuData]);

  const handleToggle = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div>
      {menuData.map((item) => (
        <div key={item.id} className="ml-4">
          {/* Toggle button and item name */}
          <div className="flex items-center cursor-pointer py-1">
            {/* Toggle icon */}
            <span className="mr-2" onClick={() => handleToggle(item.id)}>
              {item.children && item.children.length > 0
                ? expandedItems[item.id]
                  ? "▼"
                  : "►"
                : ""}
            </span>
            {/* Item name */}
            <span className="text-gray-800" onClick={() => onSelectMenu(item)}>
              {item.name}
            </span>
            {/* Add button */}
            <button
              className="ml-2 text-blue-500 hover:text-blue-700"
              onClick={() => onAddChild(item)}
            >
              {/* <PlusIcon className="h-4 w-4" /> */}
              Add
            </button>
          </div>

          {/* Render children if expanded and children exist */}
          {expandedItems[item.id] && item.children && item.children.length > 0 && (
            <MenuTree
              menuData={item.children}
              isExpanded={isExpanded}
              onSelectMenu={onSelectMenu}
              onAddChild={onAddChild} // Pass the handler down
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuTree;