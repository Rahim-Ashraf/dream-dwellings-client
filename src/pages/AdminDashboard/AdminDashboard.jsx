import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav/AdminNav";


const AdminDashboard = () => {
    return (
        <div className="grid md:grid-cols-4 gap-2">
            <div className="col-span-4 md:col-span-1">
                <AdminNav></AdminNav>
            </div>
            <div className="col-span-4 md:col-span-3">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AdminDashboard;