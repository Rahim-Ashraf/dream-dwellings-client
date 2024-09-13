import { NavLink } from "react-router-dom";


const AdminNav = () => {
    return (
        <div className="bg-gradient-to-br from-teal-500 to-[#0060f0] flex flex-col p-4">
            <NavLink to="/admin-dashboard/my-profile" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>Admin Profile</NavLink>
            <NavLink to="/admin-dashboard/manage-properties" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>Manage Properties</NavLink>
            <NavLink to="/admin-dashboard/manage-users" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>Manage Users</NavLink>
            <NavLink to="/admin-dashboard/manage-reviews" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>Manage reviews</NavLink>
            <NavLink to="/admin-dashboard/advertise-property" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>Advertise property</NavLink>
        </div>
    );
};

export default AdminNav;