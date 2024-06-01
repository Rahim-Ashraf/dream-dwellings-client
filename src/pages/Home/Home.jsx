import Advertisements from "./Advertisements/Advertisements";
import Reviews from "./Reviews/Reviews";


const Home = () => {
    return (
        <div>
            <div className="hero min-h-screen rounded-lg" style={{ backgroundImage: 'url(https://i.ibb.co/ccj5R7S/slide4.jpg)' }}>
                <div className="hero-overlay bg-opacity-60 rounded-lg"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <button className="btn bg-[#0055ff] text-white border-none">Get Started</button>
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
        </div>
    );
};

export default Home;