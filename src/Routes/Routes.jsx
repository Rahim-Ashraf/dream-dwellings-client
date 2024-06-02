import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import AllProperties from "../pages/AllProperties/AllProperties";
import Error from "../pages/Error/Error";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Details from "../pages/Details/Details";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import Wishlist from "../pages/Dashboard/Wishlist/Wishlist";
import MakeOffer from "../pages/MakeOffer/MakeOffer";
import PropertyBought from "../pages/Dashboard/PropertyBought/PropertyBought";

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
            },
            {
                path: "/dashboard",
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    {
                        path: "/dashboard/my-profile",
                        element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
                    },
                    {
                        path: "/dashboard/wishlist",
                        element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
                    },
                    {
                        path: "/dashboard/property-bought",
                        element: <PrivateRoute><PropertyBought></PropertyBought></PrivateRoute>
                    },
                ]
            },
            {
                path: "/make-offer/:id",
                element: <PrivateRoute><MakeOffer></MakeOffer></PrivateRoute>
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