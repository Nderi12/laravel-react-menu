import { createBrowserRouter, Navigate } from "react-router-dom"
import Signup from "./views/Signup"
import Login from "./views/Login"
import Dashboard from "./views/Dashboard"
import GuestLayout from "./components/GuestLayout"
import MenuPage from "./views/MenuPage"
import DefaultLayout from "./components/DefaultLayout"

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Navigate to="/" />
            },
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/menu-page',
                element: <MenuPage />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/signup',
                element: <Signup />
            },
            {
                path: '/login',
                element: <Login />
            },
        ]
    }
])

export default router;