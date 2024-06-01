import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import AllProperties from "../pages/AllProperties/AllProperties";
import Error from "../pages/Error/Error";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Details from "../pages/Details/Details";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/all-properties",
                element: <PrivateRoute><AllProperties></AllProperties></PrivateRoute>
            },
            {
                path: "/details/:id",
                element: <PrivateRoute><Details></Details></PrivateRoute>
            }
        ],
    },

    {
        path: "/register",
        element: <Register></Register>
    },
    {
        path: "/login",
        element: <Login></Login>
    }
]);

export default router