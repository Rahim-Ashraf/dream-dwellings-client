import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../../hooks/useAxiosPublic"
import { Link } from "react-router-dom";
import { FaArrowTrendUp, FaLocationDot } from "react-icons/fa6";

const Advertisements = () => {
    const axiosPublic = useAxiosPublic();
    const { data: advertisements = [] } = useQuery({
        queryKey: ["advertisement"],
        queryFn: async () => {
            const res = await axiosPublic.get("/advertisements");
            const userRes = await axiosPublic.get("/fraud-users");
            const advertiseData = res.data;
            const userData = userRes.data;
            const fraudEmails = userData.map(user => user.email)
            const filterdProperties = advertiseData.filter(property => !fraudEmails.includes(property.agent_email));
            // console.log(filterdProperties)
            return filterdProperties;

        }
    })

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {/* advertisement cards */}
            {advertisements.map(advertisement => <div key={advertisement._id} className="bg-[#0066ff] bg-opacity-5 card card-compact shadow-lg shadow-teal-200">
                <figure><img src={advertisement.property_image} alt="" /></figure>
                <div className="flex justify-between gap-4 p-2">
                    <div>
                        <h2 className="card-title"><FaLocationDot className="text-gray-600" /> {advertisement.property_location}</h2>
                        <p className="text-xl font-semibold">${advertisement.price_range}</p>
                    </div>
                    <div className="my-auto">
                        <Link to={`/details/${advertisement.property_id}`}><button className="btn bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">View <FaArrowTrendUp /></button></Link>
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default Advertisements;