import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MenuItem from "./MenuItems/MenuItem";
import { Bars2Icon } from '@heroicons/react/24/solid';

export default function Sidebar() {
  // Hook to get the current URL path
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    // Determine the active item based on the current URL
    const path = location.pathname;
    if (path.includes("menu-page")) {
      setActiveItem("menu-page");
    } else if (path.includes("systems")) {
      setActiveItem("systems");
    } else if (path.includes("api-registration")) {
      setActiveItem("api-registration");
    } else if (path.includes("users")) {
      setActiveItem("users");
    } else {
      setActiveItem(null);
    }
  }, [location.pathname]);

  // Helper function to determine if an item is active
  const isActive = (item) => activeItem === item;

  return (
    <div className="w-64 bg-gray-900 h-screen text-white rounded-xl shadow-lg absolute top-0 left-0 mt-4 ml-4">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold mb-6">CLOIT</h2>
        <nav className="mt-8">
          <ul>
            <li className="mb-4">
              <div className="bg-gray-100 bg-opacity-10 rounded-md py-2 px-2">
                <MenuItem title="Systems" defaultOpen={isActive('menu-page')}>
                  <ul className="text-sm block">
                    <li className="mb-2">
                      <a 
                        href="#" 
                        className={`block px-2 py-2 rounded-md ${isActive('systems-code') ? 'bg-green-500 text-white' : 'text-gray-300'} hover:bg-green-700`} 
                        onClick={() => setActiveItem('systems-code')}
                      >
                        <Bars2Icon className="w-4 inline mr-2" />
                        System Code
                      </a>
                    </li>
                    <li className="mb-2">
                      <a 
                        href="#" 
                        className={`block px-2 py-2 rounded-md ${isActive('properties') ? 'bg-green-500 text-white' : 'text-gray-300'} hover:bg-green-700`} 
                        onClick={() => setActiveItem('properties')}
                      >
                        <Bars2Icon className="w-4 inline mr-2" />
                        Properties
                      </a>
                    </li>
                    <li className="mb-2">
                      <a 
                        href="/menu-page" 
                        className={`block px-2 py-2 rounded-md ${isActive('menu-page') ? 'bg-green-500 text-white' : 'text-gray-300'} hover:bg-green-700`} 
                        onClick={() => setActiveItem('menu-page')}
                      >
                        <Bars2Icon className="w-4 inline mr-2" />
                        Menus
                      </a>
                    </li>
                    <li className="mb-2">
                      <a 
                        href="#" 
                        className={`block px-2 py-2 rounded-md ${isActive('api-list') ? 'bg-green-500 text-white' : 'text-gray-300'} hover:bg-green-700`} 
                        onClick={() => setActiveItem('api-list')}
                      >
                        <Bars2Icon className="w-4 inline mr-2" />
                        API List
                      </a>
                    </li>
                  </ul>
                </MenuItem>
              </div>

              <MenuItem title="API List">
                <ul className="text-sm">
                  <li className="mb-2">
                    <a 
                      href="#" 
                      className={`block px-2 py-2 rounded-md ${isActive('api-registration') ? 'bg-green-500 text-white' : 'text-gray-300'} hover:bg-green-700`} 
                      onClick={() => setActiveItem('api-registration')}
                    >
                      <Bars2Icon className="w-4 inline mr-2" />
                      API Registration
                    </a>
                  </li>
                  <li className="mb-2">
                    <a 
                      href="#" 
                      className={`block px-2 py-2 rounded-md ${isActive('api-edit') ? 'bg-green-500 text-white' : 'text-gray-300'} hover:bg-green-700`} 
                      onClick={() => setActiveItem('api-edit')}
                    >
                      <Bars2Icon className="w-4 inline mr-2" />
                      API Edit
                    </a>
                  </li>
                </ul>
              </MenuItem>

              <MenuItem title="Users & Groups">
                <ul className="text-sm">
                  <li className="mb-2">
                    <a 
                      href="#" 
                      className={`block px-2 py-2 rounded-md ${isActive('users') ? 'bg-green-500 text-white' : 'text-gray-300'} hover:bg-green-700`} 
                      onClick={() => setActiveItem('users')}
                    >
                      <Bars2Icon className="w-4 inline mr-2" />
                      Users
                    </a>
                  </li>
                  <li className="mb-2">
                    <a 
                      href="#" 
                      className={`block px-2 py-2 rounded-md ${isActive('user-registration') ? 'bg-green-500 text-white' : 'text-gray-300'} hover:bg-green-700`} 
                      onClick={() => setActiveItem('user-registration')}
                    >
                      <Bars2Icon className="w-4 inline mr-2" />
                      User Account Registration
                    </a>
                  </li>
                  <li className="mb-2">
                    <a 
                      href="#" 
                      className={`block px-2 py-2 rounded-md ${isActive('groups') ? 'bg-green-500 text-white' : 'text-gray-300'} hover:bg-green-700`} 
                      onClick={() => setActiveItem('groups')}
                    >
                      <Bars2Icon className="w-4 inline mr-2" />
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
}
