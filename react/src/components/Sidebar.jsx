// src/components/Sidebar.jsx
import React from "react";
import MenuItem from "./MenuItems/MenuItem";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 h-screen text-white">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold mb-6">CLOIT</h2>
        <nav className="mt-8">
          <ul>
            <li className="mb-4">
              <MenuItem title="Systems">
                <ul className="text-sm">
                  <li className="mb-2">
                    <a href="#" className="text-gray-300 hover:text-white">
                      System Code
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-gray-300 hover:text-white">
                      Properties
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/menu-page" className="text-gray-300 hover:text-white">
                      Menus
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-gray-300 hover:text-white">
                      API List
                    </a>
                  </li>
                </ul>
              </MenuItem>

              <MenuItem title="API List">
                <ul className="text-sm">
                  <li className="mb-2">
                    <a href="#" className="text-gray-300 hover:text-white">
                      API Registration
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-gray-300 hover:text-white">
                      API Edit
                    </a>
                  </li>
                </ul>
              </MenuItem>

              <MenuItem title="Users & Groups">
                <ul className="text-sm">
                  <li className="mb-2">
                    <a href="#" className="text-gray-300 hover:text-white">
                      Users
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-gray-300 hover:text-white">
                      User Account Registration
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="#" className="text-gray-300 hover:text-white">
                      Groups
                    </a>
                  </li>
                </ul>
              </MenuItem>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
