import React, { useState, useEffect } from "react";
import { FolderIcon } from '@heroicons/react/24/solid';

export default function MenuItem({ title, children, defaultOpen }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        className="flex items-center p-2 text-gray-300 hover:text-white cursor-pointer"
        onClick={toggleMenu}
      >
        <FolderIcon className="w-6" /><span className="ml-2">{title}</span>
      </div>
      {/* Submenu */}
      {isOpen && <div className="pl-4">{children}</div>}
    </div>
  );
}
