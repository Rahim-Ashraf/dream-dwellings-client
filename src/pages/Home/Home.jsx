import { Link } from "react-router-dom";
import Advertisements from "./Advertisements/Advertisements";
import Reviews from "./Reviews/Reviews";
import { PiBuilding } from "react-icons/pi";
import { HiOutlineBuildingLibrary } from "react-icons/hi2";
import { BiBuildings } from "react-icons/bi";


const Home = () => {
    return (
        <div>
            <div className="hero min-h-screen rounded-lg" style={{ backgroundImage: 'url(https://i.ibb.co/ccj5R7S/slide4.jpg)' }}>
                <div className="hero-overlay bg-opacity-60 rounded-lg"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">At Dream Dwelling, we help you find more than just a house—we help you discover the perfect home. With a curated selection of top-tier properties and personalized services, your dream home is just a click away. Begin your journey today and experience the difference with Dream Dwelling</p>
                        <Link to="/all-properties"><button className="btn bg-[#0055ff] text-white border-none">Get Started</button></Link>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-5xl font-bold text-center text-[#0055ff] my-6">Advertisements</h2>
                <Advertisements></Advertisements>
            </div>
            <div>
                <h2 className="text-5xl font-bold text-center text-[#0055ff] my-6">Latest Reviews</h2>
                <Reviews></Reviews>
            </div>
            <div>
                <h2 className="text-5xl font-bold text-center my-6">Real Estate services</h2>
                <div className="md:flex gap-4 bg-[#0055ff] bg-opacity-10 p-8 rounded-lg">
                    <div className="p-8 shadow-xl bg-base-100 rounded-md">
                        <PiBuilding className="text-[#E2837A] text-5xl" />
                        <h2 className="card-title">Buy A Property</h2>
                        <p>get your own luxurious home by buying properties</p>
                    </div>
                    <div className="p-8 shadow-xl bg-base-100 rounded-md">
                        <BiBuildings className="text-[#E2837A] text-5xl" />
                        <h2 className="card-title">Sell A Property</h2>
                        <p>Unlock the door to a seamless and rewarding property selling.</p>
                    </div>
                    <div className="p-8 shadow-xl bg-base-100 rounded-md">
                        <HiOutlineBuildingLibrary className="text-[#E2837A] text-5xl" />
                        <h2 className="card-title">Rent A Property</h2>
                        <p>Discover the perfect rental property that suits your new lifestyle.</p>
                    </div>
                </div>
            </div>
            {/* news letter */}
            <div className="my-10">
                <h2 className="text-4xl font-bold text-center text-[#e0737A]">newsletter</h2>
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
                        <button className="btn bg-[#0055ff] text-white">subscrib</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;