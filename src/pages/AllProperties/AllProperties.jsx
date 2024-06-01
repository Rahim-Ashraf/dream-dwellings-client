import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { Link } from "react-router-dom";

const AllProperties = () => {
    const axiosSecure = useAxiosSecure()
    const { data: properties = [] } = useQuery({
        queryKey: ["properties"],
        queryFn: async () => {
            const res = await axiosSecure.get("/properties")
            return res.data
        }
    })
    console.log(properties)

    return (
        <>
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
                            <Link to={`/advertisement-details/${property._id}`}><button className="btn bg-[#0055ff] text-white">Details</button></Link>
                        </div>
                    </div>
                </div>)}
            </div>
        </>
    );
};

export default AllProperties;