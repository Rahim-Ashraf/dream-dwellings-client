import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../../hooks/useAxiosPublic"
import { Link } from "react-router-dom";

const Advertisements = () => {
    const axiosPublic = useAxiosPublic()
    const { data: advertisements = [] } = useQuery({
        queryKey: ["advertisement"],
        queryFn: async () => {
            const res = await axiosPublic.get("/advertisements")
            return res.data
        }
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* advertisement cards */}
            {advertisements.map(advertisement => <div key={advertisement._id} className="card card-compact bg-base-100 shadow-xl">
                <figure><img src={advertisement.property_image} alt="" /></figure>
                <div className="flex justify-between gap-4 p-4">
                    <div>
                        <p>{advertisement.price_range}</p>
                        <p>{advertisement.property_location}</p>
                        <p>{advertisement.price_range}</p>
                    </div>
                    <div className="my-auto">
                        <Link to={`/advertisement-details/${advertisement._id}`}><button className="btn bg-[#0055ff] text-white">Details</button></Link>
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default Advertisements;