import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const AgentRoute = ({ children }) => {
    const { user, loading, logOut } = useAuth()
    const axiosPublic = useAxiosPublic();
    const { data: dbUser } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user?email=${user.email}`);
            return res.data;
        }
    })
    const location = useLocation();
    if (dbUser?.role !== "agent") {
        logOut();
    }

    return (
        <div>
            {
                loading ? <div className="w-full flex justify-center">
                    <span className="loading loading-spinner loading-lg flex justify-center items-center h-screen"></span>
                </div> :
                    user && dbUser?.role === "agent" ? children : <Navigate state={location.pathname} to={"/login"}></Navigate>
            }
        </div>
    );
};

export default AgentRoute;