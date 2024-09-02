import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { userStateContext } from "../contexts/ContextProvider";
import TopNavBar from "./TopNavBar";
import axiosClient from "../axios";

export default function DefaultLayout() {
  const { currentUser, userToken } = userStateContext()

  if (!userToken) {
    return <Navigate to='login' />
  }

  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch menu data from backend on component mount
  useEffect(() => {
    axiosClient.get('/menus')
      .then(response => {
        setMenuData(response.data); // Set fetched menu data
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
        setError('Failed to load menu data'); // Set error state
        setLoading(false); // Stop loading
      });
  }, []);

  const handleSelectMenu = (menu) => {
      setSelectedMenu(menu);
    };

  // Render loading state or error message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <TopNavBar />
      
      <div className="flex">

        <Sidebar menuData={menuData} onSelectMenu={handleSelectMenu} />
        
        <Outlet />
      </div>
    </>
    );
}