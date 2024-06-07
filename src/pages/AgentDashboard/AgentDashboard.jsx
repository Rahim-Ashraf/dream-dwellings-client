import { Outlet } from "react-router-dom";
import AgentNav from "./AgentNav/AgentNav";


const AgentDashboard = () => {
    return (
        <div className="grid md:grid-cols-4 gap-2">
            <div className="col-span-4 md:col-span-1">
                <AgentNav></AgentNav>
            </div>
            <div className="col-span-4 md:col-span-3">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AgentDashboard;