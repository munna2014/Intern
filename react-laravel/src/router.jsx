import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/login.jsx";
import Register from "./views/register.jsx";
import Home from "./views/home.jsx";
import Users from "./views/users.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "users",
                element: <Users />,
            },
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ]
    },
]);

export default router;
