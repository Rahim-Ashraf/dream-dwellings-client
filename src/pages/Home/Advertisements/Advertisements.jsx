import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../../hooks/useAxiosPublic"
import { Link } from "react-router-dom";
import { FaArrowTrendUp, FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion"
import PrimaryButton from "../../../shared/PrimaryButton/PrimaryButton";

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
            {advertisements.map(advertisement => <div key={advertisement._id} className="bg-[#0066ff] bg-opacity-10 p-4 shadow-lg shadow-teal-200 rounded-lg space-y-4">
                <figure><img src={advertisement.property_image} alt="" className="rounded-xl border" /></figure>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center text-xl">
                        <FaLocationDot className="text-gray-600" />
                        <h2>{advertisement.property_location}</h2>
                    </div>
                    <p className="font-semibold">${advertisement.price_range}</p>
                </div>
                <div className="my-auto">
                    <Link to={`/details/${advertisement.property_id}`}>
                        <PrimaryButton btnText={"View"} btnIcon={< FaArrowTrendUp />}></PrimaryButton>
                    </Link>
                </div>
            </div>)}
        </div>
    );
};

export default Advertisements;