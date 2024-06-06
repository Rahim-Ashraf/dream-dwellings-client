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
import MyProfile from "../shared/MyProfile/MyProfile";
import Wishlist from "../pages/Dashboard/Wishlist/Wishlist";
import MakeOffer from "../pages/MakeOffer/MakeOffer";
import PropertyBought from "../pages/Dashboard/PropertyBought/PropertyBought";
import Payment from "../pages/Payment/Payment";
import MyReviews from "../pages/Dashboard/MyReviews/MyReviews";
import AgentRoute from "../AgentRoute/AgentRoute";
import AgentDashboard from "../pages/AgentDashboard/AgentDashboard";
import AddProperty from "../pages/AgentDashboard/AddProperty/AddProperty";
import RequestedProperties from "../pages/AgentDashboard/RequestedProperties/RequestedProperties";
import MySoldProperties from "../pages/AgentDashboard/MySoldProperties/MySoldProperties";
import MyAddedProperties from "../pages/AgentDashboard/MyAddedProperties/MyAddedProperties";
import PropertyUpdate from "../pages/AgentDashboard/PropertyUpdate/PropertyUpdate";
import AdminRoute from "../AdminRoute/AdminRoute";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import ManageReviews from "../pages/AdminDashboard/ManageReviews/ManageReviews";
import ManageProperties from "../pages/AdminDashboard/ManageProperties/ManageProperties";
import ManageUsers from "../pages/AdminDashboard/ManageUsers/ManageUsers";
import AdvertiseProperty from "../pages/AdminDashboard/AdvertiseProperty/AdvertiseProperty";


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
                    {
                        path: "/dashboard/my-reviews",
                        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
                    }
                ]
            },
            {
                path: "/agent-dashboard",
                element: <AgentRoute><AgentDashboard></AgentDashboard></AgentRoute>,
                children: [
                    {
                        path: "/agent-dashboard/my-profile",
                        element: <AgentRoute><MyProfile></MyProfile></AgentRoute>
                    },
                    {
                        path: "/agent-dashboard/add-property",
                        element: <AgentRoute><AddProperty></AddProperty></AgentRoute>
                    },
                    {
                        path: "/agent-dashboard/my-added-properties",
                        element: <AgentRoute><MyAddedProperties></MyAddedProperties></AgentRoute>
                    },
                    {
                        path: "/agent-dashboard/my-sold-properties",
                        element: <AgentRoute><MySoldProperties></MySoldProperties></AgentRoute>
                    },
                    {
                        path: "/agent-dashboard/requested-properties",
                        element: <AgentRoute><RequestedProperties></RequestedProperties></AgentRoute>
                    },
                    {
                        path: "/agent-dashboard/property-update/:id",
                        element: <AgentRoute><PropertyUpdate></PropertyUpdate></AgentRoute>
                    },
                ]
            },
            {
                path: "/admin-dashboard",
                element: <AdminRoute><AdminDashboard></AdminDashboard></AdminRoute>,
                children: [
                    {
                        path: "/admin-dashboard/my-profile",
                        element: <AdminRoute><MyProfile></MyProfile></AdminRoute>
                    },
                    {
                        path: "/admin-dashboard/manage-properties",
                        element: <AdminRoute><ManageProperties></ManageProperties></AdminRoute>
                    },
                    {
                        path: "/admin-dashboard/manage-users",
                        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
                    },
                    {
                        path: "/admin-dashboard/manage-reviews",
                        element: <AdminRoute><ManageReviews></ManageReviews></AdminRoute>
                    },
                    {
                        path: "/admin-dashboard/advertise-property",
                        element: <AdminRoute><AdvertiseProperty></AdvertiseProperty></AdminRoute>
                    },
                ]
            },
            {
                path: "/make-offer/:id",
                element: <PrivateRoute><MakeOffer></MakeOffer></PrivateRoute>
            },
            {
                path: "/payment/:id",
                element: <PrivateRoute><Payment></Payment></PrivateRoute>
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