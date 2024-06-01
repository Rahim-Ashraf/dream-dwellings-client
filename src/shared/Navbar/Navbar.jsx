import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Navbar = () => {
    const { user, logOut } = useAuth()
    const handleLogout = () => {
        logOut()
    }

    const menu = <>
        <NavLink to="/" className={({ isActive }) => isActive ? "text-[#0066ff] font-bold" : "text-[#0055ff] font-bold"
        }>Home</NavLink>
        <NavLink to="/all-properties" className={({ isActive }) => isActive ? "ml-4 text-[#0066ff] font-bold" : "ml-4 text-[#0055ff] font-bold"
        }>All properties</NavLink>
    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost text-xl text-[#0055ff] font-black">Dream Dwellings</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {menu}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? <details className="dropdown dropdown-end">
                    <summary tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                        </div>
                    </summary >
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><NavLink to={"/dashboard"} className={({ isActive }) => isActive ? "ml-4 text-[#0066ff] font-bold text-center btn btn-sm btn-ghost" : "ml-4 text-[#0055ff] font-bold text-center btn btn-sm btn-ghost"
                        }>Dashboard</NavLink></li>
                        <li><button onClick={handleLogout} className="btn btn-error text-white">Logout</button></li>
                    </ul>
                </details>
                    : <div className="flex">
                        <Link to="/register"><button className="ml-4 text-[#0055ff] font-bold">Register</button></Link>
                        <Link to="/login"><button className="ml-4 text-[#0055ff] font-bold">Login</button></Link>
                    </div>}
            </div>

        </div>
    );
};

export default Navbar;