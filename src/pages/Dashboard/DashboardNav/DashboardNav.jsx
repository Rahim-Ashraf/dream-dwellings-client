import { NavLink } from "react-router-dom";


const DashboardNav = () => {
    return (
        <div className="bg-[#0055ff] flex flex-col p-4">
            <NavLink to="/dashboard/my-profile" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>My Profile</NavLink>
            <NavLink to="/dashboard/wishlist" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>Wishlist</NavLink>
            <NavLink to="/dashboard/property-bought" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>Property bought</NavLink>
            <NavLink to="/dashboard/my-reviews" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>My reviews</NavLink>
        </div>
    );
};

export default DashboardNav;