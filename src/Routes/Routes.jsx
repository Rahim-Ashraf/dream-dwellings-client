import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root/Root";
import Home from "../pages/Home/Home";
import AllProperties from "../pages/AllProperties/AllProperties";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/all-properties",
                element: <AllProperties></AllProperties>
            }
        ]
    },
]);

export default router