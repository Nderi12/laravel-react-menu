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

  // Render loading state or error message
  if (loading) return <div className="fixed inset-0 flex items-center justify-center z-50">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div className="flex flex-col h-screen">
        <TopNavBar />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 ml-64 p-4 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </>
    );
}