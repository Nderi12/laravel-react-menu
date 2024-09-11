import React, { useState, useEffect } from "react";
import { PlusCircleIcon } from '@heroicons/react/24/solid';

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
    <div className="relative">
      {menuData.map((item) => (
        <div key={item.id} className="ml-4 relative" data-cy="individual-menu-item">
          {/* Toggle button and item name */}
          <div className="flex items-center cursor-pointer py-1 relative">
            {/* Vertical line for child connections */}
            {item.children && item.children.length > 0 && (
              <div
                className={`absolute left-[-16px] top-0 w-0.5 bg-gray-300 ${
                  expandedItems[item.id] ? "h-full" : "h-4"
                }`}
              />
            )}

            {/* Horizontal line connecting to children */}
            {item.children && item.children.length > 0 && (
              <div
                className={`absolute left-[-16px] top-4 w-4 border-t border-gray-300 ${
                  expandedItems[item.id] ? "h-full" : "h-4"
                }`}
              />
            )}

            {/* Toggle icon */}
            <span className="mr-2 relative z-10" onClick={() => handleToggle(item.id)}>
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
              <PlusCircleIcon className="h-8 w-8 rounded-full" data-cy="add-menu-item" />
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
