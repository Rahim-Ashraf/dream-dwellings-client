import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


const AgentRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [dbLoading, setDbLoading] = useState(true)
    const { data: dbUser } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user?email=${user.email}`);
            if (res.data) {
                setDbLoading(false);
            }
            return res.data;
        }
    })

    return (
        <div>
            {
                loading || dbLoading ? <div className="w-full flex justify-center">
                    <span className="loading loading-spinner loading-lg flex justify-center items-center h-screen"></span>
                </div> :
                    user && dbUser?.role === "agent" ? children : <Navigate to={"/"}></Navigate>
            }
        </div>
    );
};

export default AgentRoute;