// src/components/MenuTree.jsx
import React, { useState, useEffect } from "react";

const MenuTree = ({ menuData, isExpanded, onSelectMenu }) => {
  const [expandedItems, setExpandedItems] = useState({}); // State for each item's expanded state

  useEffect(() => {
    // Update all items' expand state when the global expand/collapse state changes
    const newExpandedState = {};
    menuData.forEach((item) => {
      newExpandedState[item.id] = isExpanded;
      // Check if the item has children and update their expand state
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
          <div
            className="flex items-center cursor-pointer py-1"
            onClick={() => handleToggle(item.id)}
          >
            {/* Toggle icon */}
            <span className="mr-2">
              {item.children && item.children.length > 0
                ? expandedItems[item.id]
                  ? "▼"
                  : "►"
                : ""}
            </span>
            <span
              className="text-gray-800"
              onClick={() => onSelectMenu(item)}
            >
              {item.name}
            </span>
          </div>

          {/* Render children if expanded and children exist */}
          {expandedItems[item.id] && item.children && item.children.length > 0 && (
            <MenuTree
              menuData={item.children}
              isExpanded={isExpanded}
              onSelectMenu={onSelectMenu}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuTree;
