import Advertisements from "./Advertisements/Advertisements";
import Reviews from "./Reviews/Reviews";


const Home = () => {
    return (
        <div>
            <div>
                <h2>Advertisements</h2>
                <Advertisements></Advertisements>
            </div>
            <div>
                <h2>Latest Reviews</h2>
                <Reviews></Reviews>
            </div>
        </div>
    );
};

export default Home;