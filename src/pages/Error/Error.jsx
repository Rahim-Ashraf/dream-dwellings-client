import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className="flex flex-col md:flex-row-reverse gap-6 p-10 justify-center items-center">
            <div className="w-full md:w-1/2">
                <img src="https://i.ibb.co/Hd6FQHG/not-found.jpg" alt="" />
            </div>
            <div className="w-full md:w-1/2 text-center">
                <h1 className="text-5xl md:text-8xl font-bold text-[#0066ff]">ERROR</h1>
                <h3 className="my-4 text-2xl font-semibold">Page not found</h3>
                <Link to="/"><button className="btn bg-[#0055ff] text-white">Go to Home</button></Link>
            </div>
        </div>
    );
};

export default Error;