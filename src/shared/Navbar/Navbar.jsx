import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";


const Navbar = () => {
    const { user, logOut } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: dbUser } = useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user?email=${user.email}`);
            return res.data;
        }
    })

    const handleLogout = () => {
        logOut()
    }

    const menu = <>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] font-bold" : "text-gray-800 font-bold"
        }>Home</NavLink>
        <NavLink to="/all-properties" className={({ isActive }) => isActive ? "ml-4 text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] font-bold" : "text-gray-800 ml-4 font-bold"
        }>All properties</NavLink>
        {user && <>
            <NavLink to={dbUser?.role === "admin" ? "/admin-dashboard/my-profile" : dbUser?.role === "agent" ? "/agent-dashboard/my-profile" : "/dashboard/my-profile"} className={({ isActive }) => isActive ? "ml-4 text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] font-bold" : "text-gray-800 ml-4 font-bold"
            }>Dashboard</NavLink>
        </>}
    </>
    return (
        <div className="navbar max-w-screen-xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl text-gray-800 font-extrabold">Dream <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]">Dwellings</span></Link>
            </div>

            <div className="navbar-end">
                <div className="hidden lg:flex mr-8">
                    <ul className="menu menu-horizontal px-1">
                        {menu}
                    </ul>
                </div>
                {user ? <details className="dropdown dropdown-end">
                    <summary tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                        </div>
                    </summary >
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><button onClick={handleLogout} className="btn btn-error text-white">Logout</button></li>
                    </ul>
                </details>
                    : <Link to="/login"><button className="ml-4 btn bg-gradient-to-br from-teal-500 to-[#0060f0] text-white font-bold">Login</button></Link>}
            </div>

        </div>
    );
};

export default Navbar;