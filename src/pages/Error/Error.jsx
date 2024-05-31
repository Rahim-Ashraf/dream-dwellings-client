import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className="flex gap-6 p-10 justify-center items-center">
            <div className="w-full text-center">
                <h1 className="text-8xl font-bold text-[#0066ff]">ERROR</h1>
                <h3 className="my-4 text-2xl font-semibold">Page not found</h3>
                <Link to="/"><button className="btn bg-[#0055ff] text-white">Go to Home</button></Link>
            </div>
            <div className="w-full">
                <img src="https://i.ibb.co/Hd6FQHG/not-found.jpg" alt="" />
            </div>
        </div>
    );
};

export default Error;