// src/components/MenuItem.jsx
import React, { useState } from "react";

export default function MenuItem ({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="flex items-center justify-between p-2 text-gray-300 hover:text-white cursor-pointer"
        onClick={toggleMenu}
      >
        <span>{title}</span>
        {/* Icon to indicate collapse/expand state */}
        <span>{isOpen ? "▼" : "►"}</span>
      </div>
      {/* Submenu */}
      {isOpen && <div className="pl-4">{children}</div>}
    </div>
  );
};