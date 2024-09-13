import { Link } from "react-router-dom";
import Advertisements from "./Advertisements/Advertisements";
import { PiBuilding } from "react-icons/pi";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { BiBuildings } from "react-icons/bi";


const Home = () => {
    return (
        <div>
            <div className="hero min-h-screen hero-clip" style={{ backgroundImage: 'url(https://i.ibb.co.com/jbvp5nt/bangkok.jpg)' }}>
                <div className="hero-overlay bg-gradient-to-t from-[#0044aa] via-[#0044aa90] to-[#14b8a640] rounded-lg"></div>
                <div className="text-center text-gray-100 max-w-xl mx-auto">
                    <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                    <p className="mb-5">At Dream Dwelling, we help you find more than just a house—we help you discover the perfect home. With a curated selection of top-tier properties and personalized services, your dream home is just a click away. Begin your journey today and experience the difference with Dream Dwelling</p>
                    <Link to="/all-properties"><button className="btn border-none bg-gradient-to-br from-teal-500 to-[#0060f0] transition delay-100 hover:-translate-y-1 hover:scale-110 duration-500 text-white">Get Started</button></Link>
                </div>
            </div>
            <div className=" py-16 max-w-screen-xl mx-auto">
                <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0] pb-8">Advertisements</h2>
                <Advertisements></Advertisements>
            </div>

            <div className="bg-cover bg-fixed bg-gradient-to-br from-teal-500 to-[#0060f0] p-16 primary-clip" style={{ backgroundImage: 'url(https://i.ibb.co.com/7XHkx2P/funiture1.jpg)' }}>
                <div className="max-w-screen-xl mx-auto">
                    <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]">Real Estate services</h2>
                    <div className="md:flex gap-4">
                        <div className="p-8 shadow-lg shadow-teal-200 bg-base-100 rounded-md">
                            <PiBuilding className="text-[#E2837A] text-5xl" />
                            <h2 className="card-title">Buy A Property</h2>
                            <p>get your own luxurious home by buying properties</p>
                        </div>
                        <div className="p-8 shadow-lg shadow-teal-200 bg-base-100 rounded-md">
                            <BiBuildings className="text-[#E2837A] text-5xl" />
                            <h2 className="card-title">Sell A Property</h2>
                            <p>Unlock the door to a seamless and rewarding property selling.</p>
                        </div>
                        <div className="p-8 shadow-lg shadow-teal-200 bg-base-100 rounded-md">
                            <HiOutlineBuildingLibrary className="text-[#E2837A] text-5xl" />
                            <h2 className="card-title">Rent A Property</h2>
                            <p>Discover the perfect rental property that suits your new lifestyle.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* news letter */}
            <div className="my-10">
                <div className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input type="email" placeholder="Your Name" className="input input-bordered" required />
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input type="email" placeholder="Your Email" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">subscrib</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;