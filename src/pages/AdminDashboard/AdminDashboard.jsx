import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav/AdminNav";


const AdminDashboard = () => {
    return (
        <div className="flex">
            <AdminNav></AdminNav>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminDashboard;