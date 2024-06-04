import { Outlet } from "react-router-dom";
import AgentNav from "./AgentNav/AgentNav";


const AgentDashboard = () => {
    return (
        <div className="flex">
            <AgentNav></AgentNav>
            <Outlet></Outlet>
        </div>
    );
};

export default AgentDashboard;