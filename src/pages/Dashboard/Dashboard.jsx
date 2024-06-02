import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav/DashboardNav";


const Dashboard = () => {
    return (
        <div className="flex gap-2">
            <DashboardNav></DashboardNav>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;