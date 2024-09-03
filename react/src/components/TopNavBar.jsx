import React, { useState } from "react";
import axiosClient from "../axios";
import { userStateContext } from "../contexts/ContextProvider";

export default function TopNavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setUserToken } = userStateContext()

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = (event) => {
    event.preventDefault();
    
    axiosClient.post('/logout')
      .then(res => {
        setUserToken(null)
      });
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo or Title */}
      <div className="text-xl font-semibold text-gray-800">Dashboard</div>

      {/* User Profile Section */}
      <div className="relative">
        {/* Avatar and Username */}
        <button
          onClick={handleDropdownToggle}
          className="flex items-center focus:outline-none"
        >
          {/* <UserIcon> */}
          <span className="text-gray-700 font-medium">User</span>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-10">
            <button
              onClick={handleSignOut}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
