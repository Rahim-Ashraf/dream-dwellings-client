import { NavLink } from "react-router-dom";


const DashboardNav = () => {
    return (
        <div className="rounded-lg flex flex-col p-4">
            <NavLink to="/dashboard/my-profile" className={({ isActive }) => isActive ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] font-bold" : "text-gray-800 font-bold"
            }>My Profile</NavLink>
            <NavLink to="/dashboard/wishlist" className={({ isActive }) => isActive ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] font-bold" : "text-gray-800 font-bold"
            }>Wishlist</NavLink>
            <NavLink to="/dashboard/property-bought" className={({ isActive }) => isActive ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] font-bold" : "text-gray-800 font-bold"
            }>Property bought</NavLink>
            <NavLink to="/dashboard/my-reviews" className={({ isActive }) => isActive ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] font-bold" : "text-gray-800 font-bold"
            }>My reviews</NavLink>
        </div>
    );
};

export default DashboardNav;