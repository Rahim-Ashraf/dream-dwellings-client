import { NavLink } from "react-router-dom";


const AgentNav = () => {
    return (
        <div className="bg-[#0055ff] flex flex-col p-4">
            <NavLink to="/agent-dashboard/my-profile" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>Agent Profile</NavLink>
            <NavLink to="/agent-dashboard/add-property" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>Add Property</NavLink>
            <NavLink to="/agent-dashboard/my-added-properties" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>My added properties</NavLink>
            <NavLink to="/agent-dashboard/my-sold-properties" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>My sold properties</NavLink>
            <NavLink to="/agent-dashboard/requested-properties" className={({ isActive }) => isActive ? "text-gray-100 font-bold" : "font-bold"
            }>Requested properties</NavLink>
        </div>
    );
};

export default AgentNav;