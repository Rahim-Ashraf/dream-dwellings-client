import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    const location = useLocation()

    return (
        <div>
            {
                loading ? <div className="w-full flex justify-center">
                    <span className="loading loading-spinner loading-lg flex justify-center items-center h-screen"></span>
                </div> :
                    user ? children :
                        <Navigate state={location.pathname} to={"/login"}></Navigate>
            }
        </div>
    );
};

export default PrivateRoute;