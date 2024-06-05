import useAxiosPublic from "../../hooks/useAxiosPublic"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AllProperties = () => {
    const axiosPublic = useAxiosPublic();
    const [allProperties, setAllProperties] = useState([]);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        axiosPublic.get("/verified-properties")
            .then(res => {
                setProperties(res.data)
                setAllProperties(res.data);
            });
    }, [axiosPublic]);

    const handleCategoryChange = e => {
        if (e.target.value === "All") {
            setProperties(allProperties);
            return
        }
        const filteredProperties = allProperties.filter(property => {
            const filterdLowPrice = parseInt(e.target.value.split('-')[0]);
            const filterdHighPrice = parseInt(e.target.value.split('-')[1]);
            const dbLowPrice = parseInt(property.price_range.split('-')[0]);
            const dbHighPrice = parseInt(property.price_range.split('-')[1]);
            if (dbLowPrice >= filterdLowPrice && dbHighPrice <= filterdHighPrice) {
                return property
            }
        })
        setProperties(filteredProperties);
    }
    const handleSearch = e => {
        e.preventDefault();
        const text = e.target.search.value;
        axiosPublic.get(`/verified-properties-search?text=${text}`)
            .then(res => {
                setProperties(res.data)
                // console.log(res.data)
            });
        e.target.search.value = ""
    }

    return (
        <>
            <div className="flex justify-center items-center gap-10">
                <div className="">
                    <h2 className="text-xl font-bold">Search by Location</h2>
                    <form onSubmit={handleSearch}>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" name="search" className="grow" placeholder="Search" />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                        </label>
                    </form>
                </div>
                <div className=" flex justify-center">
                    <div>
                        <label className="label">
                            <h3 className="font-bold">filter by Price Range</h3>
                        </label>
                        <select onChange={handleCategoryChange} name="category" className="select select-bordered w-fit">
                            <option value="All">All</option>
                            <option value="0-100">0-100</option>
                            <option value="101-1000">101-1000</option>
                            <option value="1001-10000">1001-10000</option>
                            <option value="10001-100000">10001-100000</option>
                            <option value="100001-1000000">100001-1000000</option>
                        </select>
                    </div>
                </div>
            </div>
            <h1 className="text-5xl font-bold text-center text-[#0055ff] my-6">All properties </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* advertisement cards */}
                {properties.map(property => <div key={property._id} className="card card-compact bg-base-100 shadow-xl">
                    <figure><img src={property.property_image} alt="" /></figure>
                    <div className="flex justify-between gap-4 p-4">
                        <div>
                            <p>{property.price_range}</p>
                            <p>{property.property_location}</p>
                            <p>{property.agent_name}</p>
                            <p>{property.agent_image}</p>
                            <p>{property.verification_status}</p>
                        </div>
                        <div className="my-auto">
                            <Link to={`/details/${property._id}`}><button className="btn bg-[#0055ff] text-white">Details</button></Link>
                        </div>
                    </div>
                </div>)}
            </div>
        </>
    );
};

export default AllProperties;