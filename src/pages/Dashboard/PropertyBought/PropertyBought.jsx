import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { FaLocationDot } from "react-icons/fa6";


const PropertyBought = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: propertyBoughts = [] } = useQuery({
        queryKey: ["propertyBought"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/property-bought?email=${user.email}`)
            return res.data
        }
    })

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* advertisement cards */}
            {propertyBoughts.map(propertyBought => <div key={propertyBought._id} className="card card-compact bg-base-100 shadow-lg shadow-teal-200">
                <figure className="max-h-60"><img src={propertyBought.property_image} alt="" /></figure>
                <div className="p-4">
                    <div>
                        <h2 className="card-title">{propertyBought.property_title}</h2>
                        <div className="flex justify-between">
                            <div className="flex gap-2 items-center text-lg font-bold">
                                <FaLocationDot />
                                <p>{propertyBought.property_location}</p>
                            </div>
                            <p className="font-bold">Status: <span className={propertyBought.verification_status === "pending" ? "text-amber-600" : propertyBought.verification_status === "rejected" ? "text-red-600" : "text-emerald-600"}>{propertyBought.verification_status}</span></p>
                        </div>
                        <p className="font-bold ml-1">Offered Amount: <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-[#0060f0]">${propertyBought.offered_amount}</span></p>
                        <div className="divider"></div>
                        <p className="font-bold">Agent: {propertyBought.agent_name}</p>
                    </div>
                    <div className="divider"></div>
                    <div className="my-auto">
                        {propertyBought.verification_status === "accepted" ? <Link to={`/payment/${propertyBought._id}`}><button className="btn w-full bg-gradient-to-br from-teal-500 to-[#0060f0] text-white">Pay</button></Link> : propertyBought.verification_status === "bought" ? <h2 className="font-semibold">TXID: {propertyBought.transaction_id}</h2> : ""}
                    </div>
                </div>
            </div>)}
        </div>
    );
};

export default PropertyBought;