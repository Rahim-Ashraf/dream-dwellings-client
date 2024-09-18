import { Outlet } from "react-router-dom";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";


const Root = () => {
    return (
        <>
            <div className="sticky  bg-[#ffffffdd] top-0 z-20"><Navbar></Navbar></div>
            <div className="min-h-screen"><Outlet></Outlet></div>
            <Footer></Footer>
        </>
    );
};

export default Root;