import { Outlet } from "react-router-dom";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";


const Root = () => {
    return (
        <div className=" mx-auto">
            <div className="sticky  bg-[#ffffffdd] top-0 z-20"><Navbar></Navbar></div>
            <div className="min-h-screen"><Outlet></Outlet></div>
            <Footer></Footer>
        </div>
    );
};

export default Root;